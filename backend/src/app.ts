import express from "express";
import { AppDatabase } from "./db";
import FlyersRouter from "./routers/flyers";

const dbInstance = new AppDatabase();
const app = express();

app.use("/api/flyers", new FlyersRouter(dbInstance).getRouter());

app.listen(8080, "localhost", () => {
    console.log("Flyers app up and running");
});
