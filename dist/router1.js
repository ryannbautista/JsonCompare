"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router1 = express_1.default.Router();
router1.get("/", (req, res) => {
    res.send("Hello World");
});
module.exports = router1;
//# sourceMappingURL=router1.js.map