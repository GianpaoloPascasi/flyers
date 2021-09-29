import * as fs from "fs";
import { Flyer } from "./models/flyer";

const flyers: Array<Flyer> = [];

let chunked: string = "";

const flyersStream = fs.createReadStream(`${__dirname}/data/flyers_data.csv`);

flyersStream.setEncoding("utf-8");

flyersStream.on("data", (data: string) => {
    console.log("pushing", data);
    chunked += data;
});

flyersStream.on("end", () => {
    console.log(chunked);
});