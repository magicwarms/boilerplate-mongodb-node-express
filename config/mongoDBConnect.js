import mongoose from "mongoose";

const currentTime = new Date(Date.now()).toTimeString();

function instanceEventListeners({ conn }) {
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
        const mongoInstance = await mongoose.connect(
            {
                mongouri: process.env.MONGODBURI,
            },
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                keepAlive: true,
                autoReconnect: true,
                reconnectTries: 3,
                reconnectInterval: 5000,
            }
        );
        isSuccess = true;
        instanceEventListeners({ conn: mongoInstance });
        return Promise.resolve(isSuccess);
    } catch (err) {
        console.error(err);
        return Promise.reject(new Error(err));
    }
}
