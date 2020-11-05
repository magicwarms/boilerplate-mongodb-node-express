import mongoose from "mongoose";

const currentTime = new Date(Date.now()).toTimeString();

function instanceEventListeners() {
    const conn = mongoose.connection;
    conn.on("connected", () => {
        console.info(`Database - Connection status: connected on ${currentTime}`);
    });
    conn.on("disconnected", () => {
        console.info(`Database - Connection status: disconnected on ${currentTime}`);
    });
    conn.on("reconnected", () => {
        console.info(`Database - Connection status: reconnected on ${currentTime}`);
    });
    conn.on("close", () => {
        console.info(`Database - Connection status: close on ${currentTime}`);
    });
}

export async function connectMongoDb() {
    let isSuccess = false;
    try {
        await mongoose.connect(process.env.MONGODBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
            useCreateIndex: true,
            // autoReconnect: true,
            // reconnectTries: 3,
            // reconnectInterval: 5000,
            poolSize: 10,
            socketTimeoutMS: 30000,
        });
        isSuccess = true;
        instanceEventListeners();
        return Promise.resolve(isSuccess);
    } catch (err) {
        console.error(err);
        return Promise.reject(new Error(err));
    }
}
