import express from "express";
import { AppDatabase } from "./db";
import FlyersRouter from "./routers/flyers";
import cors from "cors";

const dbInstance = new AppDatabase();
const app = express();

app.use(cors({
    origin: "*"
}));
app.use("/api/flyers", new FlyersRouter(dbInstance).getRouter());
app.use("", express.static(`${__dirname}/../static`));

app.listen(8080, "localhost", () => {
    console.log("Flyers app up and running");
});
