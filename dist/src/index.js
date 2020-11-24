"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("../routes");
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT;
// const router = express.Router()
// router.get("/", (req, res) => {
//     res.send("Hello World")
// })
app.use('/api/', routes_1.router);
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at localhost:${port}`);
});
//# sourceMappingURL=index.js.map