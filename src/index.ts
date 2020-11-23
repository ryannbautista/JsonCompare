import express from "express";
const app = express();
const port = 8080;

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello World")
})

app.use('/api/', router)

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at localhost:${port}`)
})