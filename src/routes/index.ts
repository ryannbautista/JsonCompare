import { Router } from "express";
import axios from "axios"
import {
    getObjectDifference,
    importToCSV,
    searchOnJson
} from "../common"
import {
    sampleJsonData,
    sampleAPIResult1,
    sampleAPIResult2,
    fundMasterData,
    fundMasterData2
} from "../common/sampleData"
import isEmpty from 'lodash/isEmpty'

const router = Router()

router.get("/", (req, res) => {
    res.send("Json Compare")
})

router.get("/api/compare/local", (req, res) => {
    try {
        getObjectDifference(sampleAPIResult1, sampleAPIResult2)
        res.status(200).send("Compare local data success")
    } catch(err) {
        res.status(500).send('Error compare local data')
    }
})

router.get("/api/compare/search", async (req, res) => {
    try {
        const key = String(req.query?.key ?? '')
        const value = String(req.query?.value ?? '')
        const url1 = String(req.query?.url1 ?? '')
        const url2 = String(req.query?.url2 ?? '')

        if (isEmpty(key) || isEmpty(value)) {
            res.status(500).send("Required key and value")
            return
        }
        if (isEmpty(url1) || isEmpty(url2)) {
            res.status(500).send("Required url1 and url2")
            return
        }

        await axios.all([
            axios.get(url1),
            axios.get(url2)
        ])
        .then(axios.spread((apiRequest1, apiRequest2) => {
            searchOnJson(key, value, apiRequest1, apiRequest2)
            res.status(200).send("Search success")
        }))
        .catch(err => {
            res.status(500).send("Request API error")
        });
    } catch(err) {
        res.status(500).send('Error search')
    }
})

router.get("/api/compare/endpoint", async (req, res) => {
    const url1 = String(req.query?.url1 ?? '')
    const url2 = String(req.query?.url2 ?? '')

    if (isEmpty(url1) || isEmpty(url2)) {
        res.status(500).send("Required url1 and url2")
        return
    }
    // 'https://pws-dev.apps.sea.preview.pcf.manulife.com/api/v3/funds/MAAA?locale=en_SG&product-line=mf'
    // 'https://pws-uat.apps.eas.pcf.manulife.com/api/v3/funds/MAAA?locale=en_SG&product-line=mf'
    await axios.all([
        axios.get(url1),
        axios.get(url2)
    ])
    .then(axios.spread((apiRequest1, apiRequest2) => {
        const output = getObjectDifference(apiRequest1.data, apiRequest2.data)
        importToCSV(output)
        res.status(200).send("Request API compare success")
    }))
    .catch(err => {
        res.status(500).send("Request API error")
    });
})

router.get("/api/compare/:id", (req, res) => {
    const id = req.params.id
    const selected = sampleJsonData.find(item => item.id === parseInt(id))
    res.send(selected)
})


export { router }