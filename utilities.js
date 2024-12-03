/////////////////////////////////////////////////////////////////////
// Thid module exports small general usefull functions for :
// - path parsing
// - querystring manipulations
// - time conversion
/////////////////////////////////////////////////////////////////////
// Author : Nicolas Chourot
// Lionel-Groulx College
/////////////////////////////////////////////////////////////////////

import queryStringParser from 'query-string';

export function capitalizeFirstLetter(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}
export const nowInSeconds = () => {
    const now = Local_to_UTC(new Date());
    return Math.round(now/*.getTime()*/ / 1000);
}
export const UTC_To_Local = (UTC_numeric_date) => {
    let UTC_Offset = new Date().getTimezoneOffset() / 60;
    let UTC_Date = new Date(UTC_numeric_date);
    UTC_Date.setHours(UTC_Date.getHours() - UTC_Offset);
    let Local_numeric_date = UTC_Date.getTime();
    return Local_numeric_date;
}

export const Local_to_UTC = (Local_numeric_date) => {
    let UTC_Offset = new Date().getTimezoneOffset() / 60;
    let Local_Date = new Date(Local_numeric_date);
    Local_Date.setHours(Local_Date.getHours() + UTC_Offset);
    let UTC_numeric_date = Local_Date.getTime();
    return UTC_numeric_date;
}
export const deleteByIndex = (array, indexToDelete) => {
    for (let i = indexToDelete.length - 1; i >= 0; i--) {
        array.splice(indexToDelete[i], 1);
    }
}
export function removeQueryString(url) {
    let queryStringMarkerPos = url.indexOf('?');
    if (queryStringMarkerPos > -1)
        url = url.substr(0, queryStringMarkerPos);
    return url;
}
export function getQueryString(url) {
    if (url.indexOf('?') > -1)
        return url.substring(url.indexOf('?'), url.length);
    return undefined;
}
export function secondsToDateString(dateInSeconds, localizationId = 'fr-FR') {
    const hoursOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateInSeconds * 1000).toLocaleDateString(localizationId, hoursOptions);
}
export function makeVerifyCode(nbDigits) {
    let code = 0;
    for (let i = 0; i < nbDigits; i++) {
        let digit = Math.trunc(Math.random() * 10);
        code = code * 10 + digit;
    }
    return code;
}
export function tryParseInt(str) {
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                return parseInt(str);
            }
        }
    }
    return NaN;
}
export function tryParseFloat(str) {
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                return parseFloat(str);
            }
        }
    }
    return NaN;
}
/////////////////////////////////////////////////////////////////////
// this function decompose url path
// either
// MVC pattern /controller/action/id?querystring
// or
// API pattern /api/model/id?querystring
/////////////////////////////////////////////////////////////////////
export const decomposePath = (url) => {
    let isAPI = false;
    let model = undefined;
    let controllerName = undefined;
    let action = undefined;
    let id = '';
    let params = null;

    let queryString = getQueryString(url);
    if (queryString != undefined)
        params = queryStringParser.parse(queryString);
    else
        queryString = '';
    let path = removeQueryString(url).toLowerCase();

    if (path.indexOf('/api') > -1) {
        isAPI = true;
        path = path.replace('/api', '')
    }

    let urlParts = path.split("/");

    if (urlParts[1] != undefined) {
        model = capitalizeFirstLetter(urlParts[1]);
        controllerName = model + 'Controller';
    }

    if (!isAPI) {
        if (urlParts[2] != undefined && urlParts[2] != '')
            action = urlParts[2];
        else
            action = 'index';

        if (urlParts[3] != undefined) {
            id = urlParts[3]; //parseInt(urlParts[3]); //not compatible with secured Id
        }
    } else {
        if (urlParts[2] != undefined) {
            id = urlParts[2]; //parseInt(urlParts[2]); //not compatible with secured Id
        }
    }
    return { isAPI, model, controllerName, action, id, queryString, params };
}
