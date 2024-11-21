import { log } from "./log.js";
function allowAllAnonymousAccess(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Expose-Headers', '*');
}
function accessControlConfig(httpContext) {
    //if (httpContext.req.headers['sec-fetch-mode'] == 'cors')
    allowAllAnonymousAccess(httpContext.res);
}
export function handleCORSPreflight(httpContext) {
    accessControlConfig(httpContext);
    return new Promise(resolve => {
        if (httpContext.req.method === 'OPTIONS') {
            console.log(BgRed + FgWhite, '[CORS preflight verifications]');
            httpContext.res.end();
            resolve(true);
        }
        resolve(false);
    });
}