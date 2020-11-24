import { Router } from "express";
import isEqual from "lodash/isEqual"
import difference from "lodash/difference"
import differenceWith from "lodash/differenceWith"
import axios from "axios"
import { sampleJsonData, getObjectDifference } from "../common"

const router = Router()

router.get("/", (req, res) => {
    res.send("Json Compare")
})

router.get("/api/compare/new", (req, res) => {
    res.send("compare json")
    const jsonString1 = '{"Name":"ABC","Work":"Programmer","State":"123","city":"qc"}';
    const jsonString3 = '{"Name":"ABC","Work":"Programmer","tate":"124","city":"cq"}';
    // // const jsonString2 = '{"Name":"XYZ","Work":"Engineer","State":"456"}';

    const jsonObject1 = JSON.parse(jsonString1);
    const jsonObject3 = JSON.parse(jsonString3);
    // // const jsonObject2 = JSON.parse(jsonString2);

    Object.keys(jsonObject1).reduce((result, key) => {
        if (!jsonObject3.hasOwnProperty(key)) {
            console.log('missing key', key)
        // }
        } else if (!isEqual(jsonObject1[key], jsonObject3[key])) {
            console.log(`value not equal ${key}`, jsonObject1[key])
            console.log(`value not equal ${key}`, jsonObject3[key])
            // const resultKeyIndex = result.indexOf(key);
            // result.splice(resultKeyIndex, 1);
        }
        return result;
    })

    console.log('isEqual', isEqual(jsonObject1, jsonObject3))

    const keysObject1 = Object.keys(jsonObject1);
    const keysObject2 = Object.keys(jsonObject3);
    console.log('key difference', difference(keysObject1, keysObject2))
    console.log('key differenceWith', differenceWith(jsonObject1, jsonObject3, isEqual))

    const valuesObject1 = Object.values(jsonObject1);
    const valuesObject2 = Object.values(jsonObject3);
    console.log('value difference', difference(valuesObject1, valuesObject2))
    console.log('value differenceWith', differenceWith(valuesObject1, valuesObject2, isEqual))

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

})

router.get("/api/compare/api", async (req, res) => {
    await axios.all([
        axios.get('https://pws-dev.apps.sea.preview.pcf.manulife.com/api/v3/funds/MAAA?locale=en_SG&product-line=mf'),
        axios.get('https://pws-uat.apps.eas.pcf.manulife.com/api/v3/funds/MAAA?locale=en_SG&product-line=mf')
      ])
      .then(axios.spread((apiRequest1, apiRequest2) => {
        // console.log('apiRequest1: ', apiRequest1.data);
        // console.log('apiRequest2: ', apiRequest2.data);
        getObjectDifference(apiRequest1.data, apiRequest2.data)
        res.status(200).send("Request API success")
      }))
      .catch(err => {
        // console.log('error', err)
        res.status(400).send("Request API error")
      });
})

router.get("/api/compare/:id", (req, res) => {
    const id = req.params.id
    const selected = sampleJsonData.find(item => item.id === parseInt(id))
    res.send(selected)
})


export { router }