"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const common_1 = require("../common");
const sampleData_1 = require("../common/sampleData");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const router = express_1.Router();
exports.router = router;
router.get("/", (req, res) => {
    res.send("Json Compare");
});
router.get("/api/compare/local", (req, res) => {
    try {
        common_1.getObjectDifference(sampleData_1.sampleAPIResult1, sampleData_1.sampleAPIResult2);
        res.status(200).send("Compare local data success");
    }
    catch (err) {
        res.status(500).send('Error compare local data');
    }
});
router.get("/api/compare/search", (req, res) => {
    var _a, _b, _c, _d;
    try {
        const key = String((_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : '');
        const value = String((_d = (_c = req.query) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '');
        if (isEmpty_1.default(key) || isEmpty_1.default(value)) {
            res.status(500).send("Required key and value");
            return;
        }
        common_1.searchOnJson(key, value, sampleData_1.fundMasterData, sampleData_1.fundMasterData2);
        res.status(200).send("Search success");
    }
    catch (err) {
        res.status(500).send('Error search');
    }
});
router.get("/api/compare/endpoint", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const url1 = String((_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.url1) !== null && _b !== void 0 ? _b : '');
    const url2 = String((_d = (_c = req.query) === null || _c === void 0 ? void 0 : _c.url2) !== null && _d !== void 0 ? _d : '');
    if (isEmpty_1.default(url1) || isEmpty_1.default(url2)) {
        res.status(500).send("Required url1 and url2");
        return;
    }
    // 'https://pws-dev.apps.sea.preview.pcf.manulife.com/api/v3/funds/MAAA?locale=en_SG&product-line=mf'
    // 'https://pws-uat.apps.eas.pcf.manulife.com/api/v3/funds/MAAA?locale=en_SG&product-line=mf'
    yield axios_1.default.all([
        axios_1.default.get(url1),
        axios_1.default.get(url2)
    ])
        .then(axios_1.default.spread((apiRequest1, apiRequest2) => {
        const output = common_1.getObjectDifference(apiRequest1.data, apiRequest2.data);
        common_1.importToCSV(output);
        res.status(200).send("Request API compare success");
    }))
        .catch(err => {
        res.status(500).send("Request API error");
    });
}));
router.get("/api/compare/:id", (req, res) => {
    const id = req.params.id;
    const selected = sampleData_1.sampleJsonData.find(item => item.id === parseInt(id));
    res.send(selected);
});
//# sourceMappingURL=index.js.map