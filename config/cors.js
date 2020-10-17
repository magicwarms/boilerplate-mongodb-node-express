import cors from "cors";

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
};

const corsRequest = cors(corsOptions);
// const corsAllRequest = cors();

export { corsRequest };
