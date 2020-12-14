"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectDifference = exports.importToCSV = exports.searchOnJson = void 0;
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const isObject_1 = __importDefault(require("lodash/isObject"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const find_1 = __importDefault(require("lodash/find"));
const searchOnJson = (key, value, jsonObject1, jsonObject2) => {
    const search = {
        [key]: value
    };
    const searchResult1 = find_1.default(jsonObject1, search);
    const searchResult2 = find_1.default(jsonObject2, search);
    const noResult = searchResult1.length < 1 || searchResult2.length < 1;
    if (noResult)
        return;
    const output = getObjectDifference(searchResult1, searchResult2);
    importToCSV(output);
};
exports.searchOnJson = searchOnJson;
const importToCSV = (data) => {
    const filename = path_1.default.join(__dirname, 'jsonCompareOutput.csv');
    let output = [];
    output = data;
    fs_1.default.writeFileSync(filename, output.join(os_1.default.EOL));
};
exports.importToCSV = importToCSV;
const getObjectDifference = (jsonObject1, jsonObject2) => {
    const output = [];
    Object.keys(jsonObject1).reduce((result, key) => {
        if (!jsonObject2.hasOwnProperty(key)) {
            output.push(`missing key "${key.toUpperCase()}"`);
            console.log('missing key', key);
        }
        else if (!isEqual_1.default(jsonObject1[key], jsonObject2[key])) {
            const isNestedObject = isObject_1.default(jsonObject1[key]);
            if (isNestedObject) {
                const nestedObject1 = jsonObject1[key];
                const nestedObject2 = jsonObject2[key];
                const nestedKeys1 = Object.keys(jsonObject1[key]);
                const nestedKeys2 = Object.keys(jsonObject2[key]);
                nestedKeys1.reduce((nestedResult, nestedKey) => {
                    if (nestedKeys2.hasOwnProperty(nestedKey)) {
                        output.push(`missing key "${nestedKey.toUpperCase()}"`);
                        console.log('nested missing key', nestedKey);
                    }
                    else if (!isEqual_1.default(nestedObject1[nestedKey], nestedObject2[nestedKey])) {
                        const isGrandChildNestedObject = isObject_1.default(nestedObject1[nestedKey]);
                        if (isGrandChildNestedObject) {
                            const grandchildNestedObject = nestedObject1[nestedKey];
                            const grandchildNestedObject2 = nestedObject2[nestedKey];
                            const grandChildNestedKeys1 = Object.keys(nestedObject1[nestedKey]);
                            grandChildNestedKeys1.reduce((grandchildNestedResult, grandchildNestedKey) => {
                                const isGrandGrandChildNestedObject = isObject_1.default(grandchildNestedObject[grandchildNestedKey]);
                                if (isGrandGrandChildNestedObject) {
                                    const grandGrandChildObject1 = grandchildNestedObject[grandchildNestedKey];
                                    const grandGrandChildObject2 = grandchildNestedObject2[grandchildNestedKey];
                                    const grandGrandChildKeys1 = Object.keys(grandchildNestedObject[grandchildNestedKey]);
                                    grandGrandChildKeys1.reduce((grandGrandchildNestedResult, grandGrandchildNestedKey) => {
                                        if (!isEqual_1.default(grandGrandChildObject1[grandGrandchildNestedKey], grandGrandChildObject2[grandGrandchildNestedKey])) {
                                            output.push(`${key.toUpperCase()} ->
                                        "${grandGrandchildNestedKey.toUpperCase()}" key value
                                        ${grandGrandChildObject1[grandGrandchildNestedKey]} !=
                                        ${grandGrandChildObject2[grandGrandchildNestedKey]}`);
                                            console.log(`${key.toUpperCase()} ->
                                        "${grandGrandchildNestedKey.toUpperCase()}" key value
                                        ${grandGrandChildObject1[grandGrandchildNestedKey]} !=
                                        ${grandGrandChildObject2[grandGrandchildNestedKey]}`);
                                        }
                                        return grandGrandchildNestedResult;
                                    });
                                }
                                return grandchildNestedResult;
                            });
                            return;
                        }
                        output.push(`"${nestedKey.toUpperCase()}" key value ${nestedObject1[nestedKey]} =! ${nestedObject2[nestedKey]}`);
                        console.log(`"${nestedKey.toUpperCase()}" key value ${nestedObject1[nestedKey]} =! ${nestedObject2[nestedKey]}`);
                    }
                    return nestedResult;
                });
                return;
            }
            output.push(`"${key.toUpperCase()}" key value ${jsonObject1[key]} != ${jsonObject2[key]}`);
            console.log(`"${key.toUpperCase()}" key value ${jsonObject1[key]} != ${jsonObject2[key]}`);
        }
        return result;
    });
    return output;
};
exports.getObjectDifference = getObjectDifference;
//# sourceMappingURL=index.js.map