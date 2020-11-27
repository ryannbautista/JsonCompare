import isEqual from "lodash/isEqual"
import isObject from "lodash/isObject"
import fs from "fs"
import path from "path"
import os from "os"


const importToCSV = (data:[]) => {
    const filename = path.join(__dirname, 'jsonCompareOutput.csv');
    let output: any = [];
    output = data
    fs.writeFileSync(filename, output.join(os.EOL));
}


const getObjectDifference = (jsonObject1: any, jsonObject2: any) => {
    const output: any = [];
    Object.keys(jsonObject1).reduce((result, key) => {

        if (!jsonObject2.hasOwnProperty(key)) {
            output.push(`missing key "${key.toUpperCase()}"`)
            console.log('missing key', key)
        } else if (!isEqual(jsonObject1[key], jsonObject2[key])) {
            const isNestedObject = isObject(jsonObject1[key])

            if (isNestedObject) {
                const nestedObject1 = jsonObject1[key]
                const nestedObject2 = jsonObject2[key]

                const nestedKeys1 = Object.keys(jsonObject1[key])
                const nestedKeys2 = Object.keys(jsonObject2[key])


                nestedKeys1.reduce((nestedResult, nestedKey) => {
                    if (nestedKeys2.hasOwnProperty(nestedKey)) {
                        output.push(`missing key "${nestedKey.toUpperCase()}"`)
                        console.log('nested missing key', nestedKey)

                    } else if (!isEqual(nestedObject1[nestedKey], nestedObject2[nestedKey])) {
                        const isGrandChildNestedObject = isObject(nestedObject1[nestedKey])
                        if (isGrandChildNestedObject) {
                            const grandchildNestedObject = nestedObject1[nestedKey]
                            const grandchildNestedObject2 = nestedObject2[nestedKey]
                            const grandChildNestedKeys1 = Object.keys(nestedObject1[nestedKey])

                            grandChildNestedKeys1.reduce((grandchildNestedResult, grandchildNestedKey) => {

                            const isGrandGrandChildNestedObject =
                                isObject(grandchildNestedObject[grandchildNestedKey])
                            if (isGrandGrandChildNestedObject) {
                                const grandGrandChildObject1 = grandchildNestedObject[grandchildNestedKey]
                                const grandGrandChildObject2 = grandchildNestedObject2[grandchildNestedKey]
                                const grandGrandChildKeys1 =
                                    Object.keys(grandchildNestedObject[grandchildNestedKey])

                                grandGrandChildKeys1.reduce((grandGrandchildNestedResult, grandGrandchildNestedKey) => {
                                    if (!isEqual(grandGrandChildObject1[grandGrandchildNestedKey],
                                        grandGrandChildObject2[grandGrandchildNestedKey])) {
                                        output.push(`${key.toUpperCase()} ->
                                        "${grandGrandchildNestedKey.toUpperCase()}" key value
                                        ${grandGrandChildObject1[grandGrandchildNestedKey]} !=
                                        ${grandGrandChildObject2[grandGrandchildNestedKey]}`)
                                        console.log(`${key.toUpperCase()} ->
                                        "${grandGrandchildNestedKey.toUpperCase()}" key value
                                        ${grandGrandChildObject1[grandGrandchildNestedKey]} !=
                                        ${grandGrandChildObject2[grandGrandchildNestedKey]}`)
                                    }
                                    return grandGrandchildNestedResult
                                })
                            }

                            return grandchildNestedResult
                            })
                            return
                        }
                        output.push(`"${nestedKey.toUpperCase()}" key value
                            ${nestedObject1[nestedKey]} =! ${nestedObject2[nestedKey]}`)
                        console.log(`"${nestedKey.toUpperCase()}" key value
                            ${nestedObject1[nestedKey]} =! ${nestedObject2[nestedKey]}`)

                    }
                    return nestedResult
                })
                return
            }
            output.push(`"${key.toUpperCase()}" key value ${jsonObject1[key]} != ${jsonObject2[key]}`)
            console.log(`"${key.toUpperCase()}" key value not equal`, jsonObject1[key])
        }
        return result;
    })
    return output
}

export { importToCSV, getObjectDifference }