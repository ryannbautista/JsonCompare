import isEqual from "lodash/isEqual"
import isEmpty from "lodash/isEmpty"
import isObject from "lodash/isObject"

const getObjectDifference = (jsonObject1: any, jsonObject2: any) => {
    Object.keys(jsonObject1).reduce((result, key) => {
        if (!jsonObject2.hasOwnProperty(key)) {
            console.log('missing key', key)
        } else if (!isEqual(jsonObject1[key], jsonObject2[key])) {
            const isNestedObject = isObject(jsonObject1[key])
            console.log('isNestedObject', isNestedObject)
            if (isNestedObject) {
                const nestedObject1 = jsonObject1[key]
                const nestedObject2 = jsonObject2[key]

                const nestedKey1 = Object.keys(jsonObject1[key])
                const nestedKey2 = Object.keys(jsonObject2[key])

                console.log(`nestedKey1 key ${key.toUpperCase()}`)

                nestedKey1.reduce((nestedResult, nestedKey) => {
                    if (!nestedKey2.hasOwnProperty(nestedKey)) {
                        console.log('nested missing key', nestedKey)
                    } else if (!isEqual(nestedObject1[nestedKey], nestedObject2[nestedKey])) {
                        console.log(`nested value not equal to field("${nestedKey.toUpperCase()}")`, nestedObject1[nestedKey], nestedObject2[nestedKey])
                    }
                    return nestedResult
                })
                return
            }
            console.log('key value not equal', jsonObject1[key])
            // console.log(`value not equal to field("${key.toUpperCase()}")`, jsonObject1[key], jsonObject2[key])
            // console.log(`value not equal to field(${key})`, jsonObject2[key])
            // let resultKeyIndex = difference.indexOf(key);
            // result.splice(resultKeyIndex, 1);
        }
        return result;
    })
}

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
]

const sampleAPIResult1 = {
    "assetClassId": "401861621",
    "assetClassName": "Fixed income",
    "calendarYearReturns": {
        "asOfDate": "2020-10-31",
        "periods": [
            {
                "asOfDate": "2020-10-31",
                "period": "2015",
                "value": -0.0245697896749704
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2016",
                "value": -0.0199255121041791
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2017",
                "value": -0.0242779783394064
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2018",
                "value": -0.0541739894551774
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2019",
                "value": 0.0170785525155326
            }
        ]
    },
    "classId": "MAAA",
    "country": "SG",
    "cumulativeReturns": {
        "asOfDate": "2020-10-31",
        "periods": [
            {
                "period": "y1",
                "value": -0.005173841059603
            },
            {
                "period": "y3",
                "value": 0.053242769500492
            },
            {
                "period": "y5",
                "value": 0.122082166199999
            },
            {
                "period": "ytd",
                "value": -0.009274525968673
            },
            {
                "period": "si",
                "value": 0.201750000000115
            }
        ]
    },
    "currency": "SGD",
    "displayName": "Manulife Funds - Manulife Asia Pacific Investment Grade Bond Fund Class A - SGD (Accumulation)",
    "divFrequencyName": "Accumulation",
    "documents": {
        "latest": [
            {
                "aemKey": "prospectus",
                "key": "PR",
                "name": "Prospectus",
                "title": "Prospectus",
                "type": "PR",
                "url": "http://www.manulifeinvestment.com.my/Home1"
            },
            {
                "aemKey": "factsheet",
                "key": "MR",
                "name": "Factsheet (English)",
                "title": "Factsheet (English)",
                "type": "MR",
                "url": "http://www.manulifeinvestment.com.my/Home2"
            },
            {
                "aemKey": "factsheet-sc",
                "key": "MRZ",
                "name": "Factsheet (Chinese)",
                "title": "Factsheet (Chinese)",
                "type": "MRZ",
                "url": "http://www.manulifeinvestment.com.my/Home3"
            },
            {
                "aemKey": "product-highlights-sheet",
                "key": "KFS",
                "name": "Product highlights sheet",
                "title": "Product highlights sheet",
                "type": "PHS",
                "url": "http://www.manulifeinvestment.com.my/Home4"
            },
            {
                "aemKey": "annual-report",
                "key": "AR",
                "name": "Annual report",
                "title": "Annual report",
                "type": "AR",
                "url": "http://www.manulifeinvestment.com.my/Home5"
            },
            {
                "aemKey": "semi-annual-report",
                "key": "SAR",
                "name": "Semi-annual report",
                "title": "Semi-annual report",
                "type": "SAR",
                "url": "http://www.manulifeinvestment.com.my/Home6"
            }
        ]
    },
    "fundId": "MAPB",
    "fundName": "Manulife Asia Pacific Investment Grade Bond Fund",
    "fundObjective": "The Fund aims to maximise total returns from a combination of capital appreciation and income generation through investing primarily in a diversified portfolio of investment grade debt securities issued by governments, agencies, supranationals and corporate issuers in the Asia Pacific region. The Fund may from time to time also invest up to 10% of its assets in debt securities issued in the United States (\"U.S.\") and European regions if the Manager is of the view that such securities will achieve the aim of maximising the total investment returns of the Fund. The type of debt securities that the Fund intends to invest in would include, but is not limited to government bonds, corporate bonds, financial bonds, and the issuers or guarantors of the bonds shall have a minimum credit rating of BBB- and above by Standard & Poor's (or other equivalent ratings). ",
    "fundUmbrellaCode": "MF",
    "fundUmbrellaName": "Manulife Funds",
    "isin": "SG9999011134",
    "launchDate": "1970-01-01T00:00:00.000Z",
    "locale": "en_SG",
    "managementFee": "0",
    "nav": {
        "asOfDate": "2020-11-19",
        "asOfDateVal": "2020-11-19T00:00:00.000Z",
        "changePercent": 0,
        "changePrice": 0,
        "createdBy": "ApiPriceSgWam.updatePws",
        "currency": "SGD",
        "globalFundCode": "SSGMAM_MAAA",
        "price": 1.275,
        "productLine": "MF",
        "shareClassId": "MAAA"
    },
    "platformId": "108837061",
    "platformName": "Manulife Funds",
    "productLine": "MF"
}

const sampleAPIResult2 = {
    "assetClassId": "401861621",
    "assetClassName": "Fixed income",
    "calendarYearReturns": {
        "asOfDate": "2020-10-31",
        "periods": [
            {
                "asOfDate": "2020-10-31",
                "period": "2015",
                "value": -0.0245697896749704
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2016",
                "value": -0.0199255121041791
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2017",
                "value": -0.0242779783394064
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2018",
                "value": -0.0541739894551774
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2019",
                "value": 0.0170785525155326
            }
        ]
    },
    "classId": "MAAA",
    "country": "SG",
    "cumulativeReturns": {
        "asOfDate": "2020-10-31",
        "periods": [
            {
                "period": "y1",
                "value": -0.005173841059603
            },
            {
                "period": "y3",
                "value": 0.053242769500492
            },
            {
                "period": "y5",
                "value": 0.122082166199999
            },
            {
                "period": "ytd",
                "value": -0.009274525968673
            },
            {
                "period": "si",
                "value": 0.201750000000115
            }
        ]
    },
    "currency": "SGD",
    "displayName": "Manulife Funds - Manulife Asia Pacific Investment Grade Bond Fund Class A - SGD (Accumulation)",
    "divFrequencyName": "Accumulation",
    "documents": {
        "latest": [
            {
                "aemKey": "prospectus",
                "key": "PR",
                "name": "Prospectus",
                "title": "Prospectus",
                "type": "PR",
                "url": "http://www.manulifeinvestment.com.my/Home1"
            },
            {
                "aemKey": "factsheet",
                "key": "MR",
                "name": "Factsheet (English)",
                "title": "Factsheet (English)",
                "type": "MR",
                "url": "http://www.manulifeinvestment.com.my/Home2"
            },
            {
                "aemKey": "factsheet-sc",
                "key": "MRZ",
                "name": "Factsheet (Chinese)",
                "title": "Factsheet (Chinese)",
                "type": "MRZ",
                "url": "http://www.manulifeinvestment.com.my/Home3"
            },
            {
                "aemKey": "product-highlights-sheet",
                "key": "KFS",
                "name": "Product highlights sheet",
                "title": "Product highlights sheet",
                "type": "PHS",
                "url": "http://www.manulifeinvestment.com.my/Home4"
            },
            {
                "aemKey": "annual-report",
                "key": "AR",
                "name": "Annual report",
                "title": "Annual report",
                "type": "AR",
                "url": "http://www.manulifeinvestment.com.my/Home5"
            },
            {
                "aemKey": "semi-annual-report",
                "key": "SAR",
                "name": "Semi-annual report",
                "title": "Semi-annual report",
                "type": "SAR",
                "url": "http://www.manulifeinvestment.com.my/Home6"
            }
        ]
    },
    "fundId": "MAPB",
    "fundName": "Manulife Asia Pacific Investment Grade Bond Fund",
    "fundObjective": "The Fund aims to maximise total returns from a combination of capital appreciation and income generation through investing primarily in a diversified portfolio of investment grade debt securities issued by governments, agencies, supranationals and corporate issuers in the Asia Pacific region. The Fund may from time to time also invest up to 10% of its assets in debt securities issued in the United States (\"U.S.\") and European regions if the Manager is of the view that such securities will achieve the aim of maximising the total investment returns of the Fund. The type of debt securities that the Fund intends to invest in would include, but is not limited to government bonds, corporate bonds, financial bonds, and the issuers or guarantors of the bonds shall have a minimum credit rating of BBB- and above by Standard & Poor's (or other equivalent ratings). ",
    "fundUmbrellaCode": "MF",
    "fundUmbrellaName": "Manulife Funds",
    "isin": "SG9999011134",
    "launchDate": "1970-01-01T00:00:00.000Z",
    "locale": "en_SG",
    "managementFee": "0",
    "nav": {
        "asOfDate": "2020-11-19",
        "asOfDateVal": "2020-11-19T00:00:00.000Z",
        "changePercent": 0,
        "changePrice": 0,
        "createdBy": "ApiPriceSgWam.updatePws",
        "currency": "SGD",
        "globalFundCode": "SSGMAM_MAAA",
        "price": 1.275,
        "productLine": "MF",
        "shareClassId": "MAAA"
    },
    "platformId": "108837061",
    "platformName": "Manulife Funds",
    "productLine": "MF"
}

const sampleAPIResult3 = {
    "assetClassId": "401861621",
    "assetClassName": "Fixed income",
    "calendarYearReturns": {
        "asOfDate": "2020-10-31",
        "periods": [
            {
                "asOfDate": "2020-10-31",
                "period": "2015",
                "value": -2.45697896749704
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2016",
                "value": -1.99255121041791
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2017",
                "value": -2.42779783394064
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2018",
                "value": -5.41739894551774
            },
            {
                "asOfDate": "2020-10-31",
                "period": "2019",
                "value": 1.70785525155326
            }
        ]
    },
    "classId": "MAAA",
    "country": "SG",
    "cumulativeReturns": {
        "asOfDate": "2020-10-31",
        "periods": [
            {
                "period": "y1",
                "value": -0.5173841059602999
            },
            {
                "period": "y3",
                "value": 5.3242769500491995
            },
            {
                "period": "y5",
                "value": 12.208216619999899
            },
            {
                "period": "ytd",
                "value": -0.9274525968673
            },
            {
                "period": "si",
                "value": 20.1750000000115
            }
        ]
    },
    "currency": "SGD",
    "displayName": "Manulife Asia Pacific Investment Grade Bond Fund Class A - SGD (Accumulation)",
    "divFrequencyName": "Accumulation",
    "documents": {
        "latest": [
            {
                "key": "PR",
                "name": "Prospectus",
                "title": "Prospectus",
                "type": "PR",
                "url": "http://www.manulifeinvestment.com.my/Home1"
            },
            {
                "key": "MR",
                "name": "Factsheet (English)",
                "title": "Factsheet (English)",
                "type": "MR",
                "url": "http://www.manulifeinvestment.com.my/Home2"
            },
            {
                "key": "MRZ",
                "name": "Factsheet (Chinese)",
                "title": "Factsheet (Chinese)",
                "type": "MRZ",
                "url": "http://www.manulifeinvestment.com.my/Home3"
            },
            {
                "key": "KFS",
                "name": "Product highlights sheet",
                "title": "Product highlights sheet",
                "type": "PHS",
                "url": "http://www.manulifeinvestment.com.my/Home4"
            },
            {
                "key": "AR",
                "name": "Annual report",
                "title": "Annual report",
                "type": "AR",
                "url": "http://www.manulifeinvestment.com.my/Home5"
            },
            {
                "key": "SAR",
                "name": "Semi-annual report",
                "title": "Semi-annual report",
                "type": "SAR",
                "url": "http://www.manulifeinvestment.com.my/Home6"
            }
        ]
    },
    "fundId": "MAPB",
    "fundName": "Manulife Asia Pacific Investment Grade Bond Fund",
    "fundObjective": "The Fund aims to maximise total returns from a combination of capital appreciation and income generation through investing primarily in a diversified portfolio of investment grade debt securities issued by governments, agencies, supranationals and corporate issuers in the Asia Pacific region. The Fund may from time to time also invest up to 10% of its assets in debt securities issued in the United States (\"U.S.\") and European regions if the Manager is of the view that such securities will achieve the aim of maximising the total investment returns of the Fund. The type of debt securities that the Fund intends to invest in would include, but is not limited to government bonds, corporate bonds, financial bonds, and the issuers or guarantors of the bonds shall have a minimum credit rating of BBB- and above by Standard & Poor's (or other equivalent ratings). ",
    "fundUmbrellaCode": "MF",
    "fundUmbrellaName": "Manulife Funds",
    "isin": "SG9999011134",
    "launchDate": "1970-01-01T00:00:00.000Z",
    "locale": "en_SG",
    "managementFee": "0",
    "nav": {
        "asOfDate": "2020-11-19",
        "asOfDateVal": "2020-11-19T00:00:00.000Z",
        "changePercent": 0,
        "changePrice": 0,
        "createdBy": "ApiPriceSgWam.updatePwsWithHistorical",
        "currency": "SGD",
        "globalFundCode": "SSGMAM_MAAA",
        "price": 1.275,
        "productLine": "MF",
        "shareClassId": "MAAA"
    },
    "platformId": "108837061",
    "platformName": "Manulife Funds",
    "productLine": "MF"
}

export { getObjectDifference, sampleJsonData, sampleAPIResult1, sampleAPIResult2 }