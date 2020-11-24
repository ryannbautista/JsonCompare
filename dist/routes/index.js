"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const difference_1 = __importDefault(require("lodash/difference"));
const differenceWith_1 = __importDefault(require("lodash/differenceWith"));
const router = express_1.Router();
exports.router = router;
const data = [
    {
        id: 2,
        firstname: "clarice",
        middlename: "domingo",
        lastname: "bautista"
    },
    {
        id: 1,
        firstname: "ryan",
        middlename: "villarin",
        lastname: "bautista"
    }
];
router.get("/", (req, res) => {
    res.send("Json Compare");
});
router.get("/api/select/:id", (req, res) => {
    // return res.status(400).send('Bad request')
    console.log('select ID');
    const id = req.params.id;
    const selected = data.find(item => item.id === parseInt(id));
    res.send(selected);
});
router.get("/api/compare", (req, res) => {
    res.send("compare json");
    const jsonString1 = '{"Name":"ABC","Work":"Programmer","State":"123"}';
    const jsonString3 = '{"Name":"ABC","Work":"Programmer","State":"123"}';
    // // const jsonString2 = '{"Name":"XYZ","Work":"Engineer","State":"456"}';
    const jsonObject1 = JSON.parse(jsonString1);
    const jsonObject3 = JSON.parse(jsonString3);
    // // const jsonObject2 = JSON.parse(jsonString2);
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
//# sourceMappingURL=index.js.map