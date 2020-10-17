import "dotenv/config";
import cluster from "cluster";
import os from "os";
import startServer from "./start-server";
import { connectMongoDb } from "./config/mongoDBConnect";

const currentTime = new Date(Date.now()).toTimeString();

const numCPUS = os.cpus().length;
const port = parseInt(process.env.PORT);

function startServerCluster() {
    console.info("Production/Staging server mode started!");
    // Aktifkan jika mode production
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUS; i += 1) {
            cluster.fork();
        }
    } else {
        startServer({ port: port })
            .then()
            .catch((err) => console.error(err));
    }
}

function startServerDevelopment() {
    console.info("Development server mode started!");
    // activate if development mode
    startServer({ port: port })
        .then()
        .catch((err) => console.error(err));
}

// first running db connection first
connectMongoDb()
    .then((isMongoDBConnect) => {
        if (isMongoDBConnect) {
            console.info(`Our MongoDB looks fine and running at ${currentTime}`);
            if (process.env.APP_ENV === "development") {
                startServerDevelopment();
            } else {
                startServerCluster();
            }
        } else {
            console.error(`Unable to connect to the MongoDB at ${currentTime}`);
        }
    })
    .catch((error) => {
        console.error(error);
        console.info(`Something went wrong with MongoDB at ${currentTime}`);
    });
