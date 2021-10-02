import express from "express";
import { CONFIG } from "./config";
import { AppDatabase } from "./db";
import FlyersRouter from "./routers/flyers";

const dbInstance = new AppDatabase();
const app = express();
const config = CONFIG[process.env.NODE_ENV ? process.env.NODE_ENV : "development"];

app.use("/api/flyers", new FlyersRouter(dbInstance).getRouter());
app.use("", express.static(`${__dirname}/../static`));

app.listen(config.port, config.host, () => {
    console.log(`Flyers app up and running on ${config.host}:${config.port}`);
});
