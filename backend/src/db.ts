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
                // if (chunked[chunked.length - 1] !== EOL) {
                //     return;
                // }
                // let tempChunked = "";

                

                // chunked = tempChunked;
            })
            .on("end", () => {
                chunked.split("\r\n").forEach(row => {
                    const values = row.split(",");

                    if (firstTime) {
                        numCols = values.length;
                        firstTime = false;
                        return;
                    }

                    // if (values.length < numCols) {
                    //     tempChunked += row;
                    //     return;
                    // }

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

                this.doneLoadingCsv = true;
            });
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
