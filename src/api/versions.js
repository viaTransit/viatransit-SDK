//Imports
const axios = require('axios');

/**
 * viaTransit versions
 * @module viatransit
 */

/**
 * Check data update availability
 * @async
 * @exports viatransit.API.isDataRequiringUpdate
 * @param apiUrl
 * @param dataKey
 * @param actualVersionDate
 * @return {Promise<boolean>}
 */
async function isDataRequiringUpdate(/*String*/apiUrl, /*String*/dataKey, /*Date*/actualVersionDate)
{
    const url = apiUrl + '/versions?key=' + dataKey + "&date=" + actualVersionDate.toISOString();

    return axios.get(url, {timeout: 15000}).then(res => {
        return res.data.needsUpdate;
    });
}

/**
 * Get data version date
 * @async
 * @exports viatransit.API.getDataVersionDate
 * @param apiUrl
 * @param dataKey
 * @return {Promise<Date|null>}
 */
async function getDataVersionDate(/*String*/apiUrl, /*String*/dataKey)
{
    const url = apiUrl + '/versions?key=' + dataKey;

    return axios.get(url, {timeout: 15000}).then(res => {
        if (!res.data.updateDate)
            return null;
        return new Date(res.data.updateDate);
    });
}

/**
 * Get all versions
 * @async
 * @exports viatransit.API.getAllVersions
 * @param apiUrl
 * @return {Promise<Object|null>}
 */
async function getAllVersions(/*String*/apiUrl)
{
    const url = apiUrl + '/versions';

    return axios.get(url, {timeout: 15000}).then(res => {
        return res.data;
    });
}

module.exports = { isDataRequiringUpdate, getDataVersionDate, getAllVersions };