"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleJsonData = exports.getObjectDifference = void 0;
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const isObject_1 = __importDefault(require("lodash/isObject"));
const getObjectDifference = (jsonObject1, jsonObject2) => {
    Object.keys(jsonObject1).reduce((result, key) => {
        if (!jsonObject2.hasOwnProperty(key)) {
            console.log('missing key', key);
            // }
        }
        else if (!isEqual_1.default(jsonObject1[key], jsonObject2[key])) {
            const isNestedObject = isObject_1.default(jsonObject1[key]);
            console.log('isNestedObject', isNestedObject);
            if (isNestedObject) {
                const nestedObject1 = Object.keys(jsonObject1[key]);
                const nestedObject2 = Object.keys(jsonObject2[key]);
                console.log(`nestedObject1 key ${key.toUpperCase()}`);
                nestedObject1.reduce((nestedResult, nestedKey) => {
                    console.log(`nested object key`, nestedKey);
                    if (!nestedObject2.hasOwnProperty(nestedKey)) {
                        console.log('nested missing key', nestedKey);
                    }
                    // } else if (!isEqual(nestedObject1[key], nestedObject2[key])) {
                    // }
                    return nestedResult;
                });
                return;
            }
            console.log('key value not equal', jsonObject1[key]);
            // console.log(`value not equal to field("${key.toUpperCase()}")`, jsonObject1[key], jsonObject2[key])
            // console.log(`value not equal to field(${key})`, jsonObject2[key])
            // let resultKeyIndex = difference.indexOf(key);
            // result.splice(resultKeyIndex, 1);
        }
        return result;
    });
};
exports.getObjectDifference = getObjectDifference;
const sampleJsonData = [
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
exports.sampleJsonData = sampleJsonData;
//# sourceMappingURL=index.js.map