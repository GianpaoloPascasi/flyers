import { Flyer } from "./flyer";

export class AppResponse {
    code: number;
    msg: string;
    data: any;

    constructor(code: number, msg: string, data: any) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}

export class FlyerResponseData {
    flyers: Array<Flyer>;
    numFlyers: number;
    
    constructor(flyers: Array<Flyer>, numFlyers: number){
        this.flyers = flyers;
        this.numFlyers = numFlyers;
    }
}

export class FlyersResponse extends AppResponse {
    data!: FlyerResponseData;

    constructor(code: number, msg: string, data: FlyerResponseData) {
        super(code, msg, data);
    }
}