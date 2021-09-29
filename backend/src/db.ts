import * as fs from "fs";
import { EOL } from "os";
import { Flyer } from "./models/flyer";

const flyers: Array<Flyer> = [];
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

            if(firstTime){
                numCols = values.length;
                firstTime = false;
                return;
            }
            
            if (values.length < numCols) {
                tempChunked += row;
                return;
            }

            flyers.push({
                id: Number(values[0]),
                title: values[1],
                startDate:  values[2],
                endDate:  values[3],
                isPublished:  Boolean(values[4]),
                retailer:  values[5],
                category:  values[6],
            })
        });

        chunked = tempChunked;
    })
    .on("end", () => {
        console.log(flyers);
        console.log(chunked);
    });

export const getFlyers = async () => {
    return flyers;
}