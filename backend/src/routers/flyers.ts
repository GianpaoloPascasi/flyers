import express, { Request, Response } from "express";
import { AppResponse, FlyerResponseData, FlyersResponse } from "../models/Response";
import { AppDatabase } from "../db";
import { Pageable } from "../models/request";

class FlyersRouter {

    router = express.Router();
    db: AppDatabase;

    constructor(db: AppDatabase) {
        this.db = db;
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {
        this.router.get("", (req: Request, res: Response) => {
            const pageable = (req.query as any as Pageable);
            const start = Number(pageable.limit) * (Number(pageable.page) - 1);
            const end = Number(start) + Number(pageable.limit);
            Promise.all([
                this.db.getFlyers(false, start, end),
                this.db.getNumberOfFlyers()
            ]).then(results => {
                res.json(new FlyersResponse(200, "ok", new FlyerResponseData(results[0], results[1])));
            }).catch(e => {
                console.error(e);
                res.status(500)
                    .json(new AppResponse(500, "Errore inaspettato del server", {
                        errorCode: "#01"
                    }));
            });
        });
    }
}



export default FlyersRouter;