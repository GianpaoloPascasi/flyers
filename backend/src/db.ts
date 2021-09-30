import * as fs from "fs";
import { EOL } from "os";
import { Flyer } from "./models/flyer";
import { hasEnoughElements } from "./utils/utils";

export class AppDatabase {

    private flyers: Array<Flyer> = [];
    private doneLoadingCsv = false;

    constructor() {

        let firstTime = true;
        let numCols = 0;
        let chunked: string = "";

        fs.createReadStream(`${__dirname}/../data/flyers_data.csv`, { highWaterMark: 1024 })
            .setEncoding("utf-8")
            .on("data", (data: string) => {

                chunked += data;
                let tempChunked = "";

                chunked.split(EOL).forEach(row => {
                    const values = row.split(",");

                    if (firstTime) {
                        numCols = values.length;
                        firstTime = false;
                        return;
                    }

                    if (values.length < numCols) {
                        tempChunked += row;
                        return;
                    }

                    this.flyers.push({
                        id: Number(values[0]),
                        title: values[1],
                        startDate: values[2],
                        endDate: values[3],
                        isPublished: values[4] === "1",
                        retailer: values[5],
                        category: values[6],
                    })
                });

                chunked = tempChunked;
            })
            .on("end", () => {
                this.doneLoadingCsv = true;
            });
    }

    public async getFlyers(full = true, start: number, end: number) {
        if (this.doneLoadingCsv) {
            return full ? this.flyers : this.flyers.slice(start, end);
        }
        if (hasEnoughElements(this.flyers.length, start, end)) {
            return [];
        }
        return this.onFinishGetFlyers(full, start, end);
    }

    private onFinishGetFlyers(full: boolean, start: number, end: number) {
        if (full) {
            return this.flyers;
        }
        return this.flyers.slice(start, end);
    }
}
