

// Always QA environment
export const ENV = "qa";

// for backened calls
const getBaseUrl = () => {
    return `https://api-qa-my.innago.com`;
};




const getAppBaseUrl = () => {
    const env = "qa";
    return `https://${env}-my.innago.com/`;
};


const getAuth0BaseUrl = (env) => {
    if (env === 'qa') {
        return `https://identify-qa.innago.com`;
    }
   
};
 


const getROClientId = (env) => {
    if (env === 'qa') {
        return __ENV.QA_RO_CLIENT_ID || '1LIuI9QgeLJ03cEVqHdtdS6d2eFniaW2';
    }
};






const getROClientSecret = (env) => {
    if (env === 'qa') {
        return __ENV.QA_RO_CLIENT_SECRET || 'iBNBWcLK6tamspP-dW7INV1jzlTRinQU3aIuiVAya7tCncHKWvKOFr2hyW131oIT';
    }


};


const getAuth0Realm = (env) => {
    if (env === 'qa') {
        return 'Username-Password-Authentication';
    }
   
};






export const BASE_URL = getBaseUrl();
export const AUTH0_BASE_URL = getAuth0BaseUrl(ENV);
export const APP_BASE_URL = getAppBaseUrl(ENV);
export const RO_CLIENT_ID = getROClientId(ENV);
export const RO_CLIENT_SECRET = getROClientSecret(ENV);
export const AUTH0_REALM = getAuth0Realm(ENV);




export const commonHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Origin: getAppBaseUrl(ENV),
    Referer: getAppBaseUrl(ENV),
    authorization: `Bearer ${__ENV.TOKEN}`,
};








