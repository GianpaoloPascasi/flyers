import { AppDatabase } from "./db";

const db = new AppDatabase();

setTimeout(() => {
    db.getFlyers(false, 0, 100).then(flyers => {
        console.log(flyers);
    });
}, 3000);
