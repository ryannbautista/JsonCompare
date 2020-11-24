import express from "express";
import dotenv from "dotenv";
import { router } from "./routes"

dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(router)

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`)
})