import * as fs from "fs";
import { EOL } from "os";
import { Flyer } from "./models/flyer";
import { hasEnoughElements } from "./utils/utils";

export class AppDatabase {

    private flyers: Array<Flyer> = [];
    private doneLoadingCsv = false;
    private firstTime = true;
    private numCols = 0;
    private chunked: string = "";

    constructor() {
        fs.createReadStream(`${__dirname}/../data/flyers_data.csv`, { highWaterMark: 10 })
            .setEncoding("utf-8")
            .on("data", (data: string) => {
                this.handleReading(data);
            })
            .on("end", () => {
                this.handleReading("", true); //se sono rimasti dei dati appesi finisco di parsarli
                this.doneLoadingCsv = true;
            });
    }

    private handleReading(data: string, EOF = false) {
        this.chunked += data;
        if (this.chunked.substr(this.chunked.length - EOL.length, EOL.length) !== EOL && EOF === false) {
            return;
        }
        let tempChunked = "";

        this.chunked.split("\r\n").forEach(row => {
            const values = row.split(",");

            if (this.firstTime) {
                this.numCols = values.length;
                this.firstTime = false;
                return;
            }

            if (values.length < this.numCols) {
                tempChunked += row;
                return;
            }

            this.flyers.push({
                id: Number(values[0]),
                title: values[1],
                start_date: values[2],
                end_date: values[3],
                is_published: Number(values[4]),
                retailer: values[5],
                category: values[6],
            })
        });

        this.chunked = tempChunked;
    }

    public async getFlyers(full = true, start?: number, end?: number) {
        if (this.doneLoadingCsv) {
            return full ? this.flyers : this.flyers.slice(start, end);
        }
        if (hasEnoughElements(this.flyers.length, start!, end!)) {
            return [];
        }
        return this.onFinishGetFlyers(full, start!, end!);
    }

    public async getNumberOfFlyers() {
        return this.flyers.length;
    }

    private onFinishGetFlyers(full: boolean, start: number, end: number) {
        if (full) {
            return this.flyers;
        }
        return this.flyers.slice(start, end);
    }
}
