"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 8080;
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Hello World");
});
app.use('/api/', router);
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at localhost:${port}`);
});
//# sourceMappingURL=index.js.map