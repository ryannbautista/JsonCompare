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
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const difference_1 = __importDefault(require("lodash/difference"));
const differenceWith_1 = __importDefault(require("lodash/differenceWith"));
const axios_1 = __importDefault(require("axios"));
const common_1 = require("../common");
const router = express_1.Router();
exports.router = router;
router.get("/", (req, res) => {
    res.send("Json Compare");
});
router.get("/api/compare/new", (req, res) => {
    res.send("compare json");
    const jsonString1 = '{"Name":"ABC","Work":"Programmer","State":"123","city":"qc"}';
    const jsonString3 = '{"Name":"ABC","Work":"Programmer","tate":"124","city":"cq"}';
    // // const jsonString2 = '{"Name":"XYZ","Work":"Engineer","State":"456"}';
    const jsonObject1 = JSON.parse(jsonString1);
    const jsonObject3 = JSON.parse(jsonString3);
    // // const jsonObject2 = JSON.parse(jsonString2);
    Object.keys(jsonObject1).reduce((result, key) => {
        if (!jsonObject3.hasOwnProperty(key)) {
            // result.push(key);
            // console.log('result', result)
            console.log('missing key', key);
            // }
        }
        else if (!isEqual_1.default(jsonObject1[key], jsonObject3[key])) {
            console.log(`value not equal ${key}`, jsonObject1[key]);
            console.log(`value not equal ${key}`, jsonObject3[key]);
            // const resultKeyIndex = result.indexOf(key);
            // result.splice(resultKeyIndex, 1);
        }
        return result;
    });
    console.log('isEqual', isEqual_1.default(jsonObject1, jsonObject3));
    const keysObject1 = Object.keys(jsonObject1);
    const keysObject2 = Object.keys(jsonObject3);
    console.log('key difference', difference_1.default(keysObject1, keysObject2));
    console.log('key differenceWith', differenceWith_1.default(jsonObject1, jsonObject3, isEqual_1.default));
    const valuesObject1 = Object.values(jsonObject1);
    const valuesObject2 = Object.values(jsonObject3);
    console.log('value difference', difference_1.default(valuesObject1, valuesObject2));
    console.log('value differenceWith', differenceWith_1.default(valuesObject1, valuesObject2, isEqual_1.default));
    // const values = Object.values(jsonObject1);
    // console.log('keys: ', keys)
    // console.log('values: ', values)
    // for (const row of keys) {
    //     console.log('row: ', row)
    // }
    // res.send(keys)
    // for (let i = 0; i < keys.length; i++) {
    //   const key = keys[i];
    //   if (jsonObject1[key] !== jsonObject2[key]) {
    //     console.log(key + " value changed from '" + jsonObject1[key] + "' to '" + jsonObject2[key] + "'");
    //   }
    // }
});
router.get("/api/compare/request", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // return res.status(400).send('Bad request')
    // const result = await axios.get('https://pws-uat.apps.eas.pcf.manulife.com/api/v3/funds/PIAH1U?locale=zh_Hant_HK&product-line=mf,mgf');
    // if(result.status === 200){
    //     const resultData = result.data
    //     console.log(resultData)
    //     res.send(JSON.stringify(resultData))
    // }
    yield axios_1.default.all([
        axios_1.default.get('https://pws-dev.apps.sea.preview.pcf.manulife.com/api/v3/funds/MAAA?locale=en_SG&product-line=mf'),
        axios_1.default.get('https://pws-uat.apps.eas.pcf.manulife.com/api/v3/funds/MAAA?locale=en_SG&product-line=mf')
    ])
        .then(axios_1.default.spread((apiRequest1, apiRequest2) => {
        // console.log('apiRequest1: ', apiRequest1.data);
        // console.log('apiRequest2: ', apiRequest2.data);
        common_1.getObjectDifference(apiRequest1.data, apiRequest2.data);
        res.status(200).send("Request API success");
    }))
        .catch(err => {
        // console.log('error', err)
        res.status(400).send(err);
    });
}));
router.get("/api/compare/:id", (req, res) => {
    // return res.status(400).send('Bad request')
    console.log('select ID');
    const id = req.params.id;
    const selected = common_1.sampleJsonData.find(item => item.id === parseInt(id));
    res.send(selected);
});
//# sourceMappingURL=index.js.map