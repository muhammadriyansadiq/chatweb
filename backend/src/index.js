import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./database/Db.js";
import mongoose from "mongoose";
dotenv.config({
    path: "./.env"
});
mongoose.set('debug', true);

connectDB().then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Server listening at port ${port}`);
    });
}).catch((error) => console.log(error));

