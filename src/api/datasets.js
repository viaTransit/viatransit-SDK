//Imports
const axios = require('axios');

//Models
const Datasets = require('../models/Datasets');

/**
 * viaTransit Datasets
 * @module viatransit
 */

/**
 *
 * @param apiUrl
 * @param token
 * @param kind
 * @param datasetsId
 * @returns {Promise<*>}
 */
async function getDatasets(/*String*/apiUrl, /*String*/token, /*String*/kind, /*String*/datasetsId)
{
    let url = apiUrl + "/mapbox/datasets/" + kind;
    
    if (datasetsId !== null)
        url = url + '?id=' + datasetsId;
 
    return await axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
        .then((res) => {
            return res.data;
        }).catch((e) => {
                return e.response.data;
            }
        );
}

/**
 *
 * @param apiUrl
 * @param token
 * @param kind
 * @param datasetsArray
 * @returns {Promise<*>}
 */
async function postDatasets(/*String*/apiUrl, /*String*/token, /*String*/kind, /*Array*/datasetsArray)
{
    let url = apiUrl + "/mapbox/datasets/" + kind;
 
    return await axios.post(url, { datasetsArray }, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
    .then((res) => {
        return res.data;
    }).catch((e) => {
            return e.response.data;
        }
    );
}

/**
 *
 * @param apiUrl
 * @param token
 * @param kind
 * @param datasetsArray
 * @returns {Promise<*>}
 */
async function updateDatasets(/*String*/apiUrl, /*String*/token, /*String*/kind, /*Array*/datasetsArray)
{
    let url = apiUrl + "/mapbox/datasets/" + kind;
 
    return await axios.put(url, { datasetsArray }, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
    .then((res) => {
        return res.data;
    }).catch((e) => {
            return e.response.data;
        }
    );
}

/**
 *
 * @param apiUrl
 * @param token
 * @param kind
 * @param datasetsId
 * @returns {Promise<*>}
 */
async function deleteDatasets(/*String*/apiUrl, /*String*/token, /*String*/kind, /*String*/datasetsId)
{
    let url = apiUrl + "/mapbox/datasets/" + kind + "?id=" + datasetsId;
 
    return await axios.delete(url, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
        .then((res) => {
            return res.data;
        }).catch((e) => {
                return e.response.data;
            }
        );
}

module.exports = { getDatasets, postDatasets, updateDatasets, deleteDatasets };