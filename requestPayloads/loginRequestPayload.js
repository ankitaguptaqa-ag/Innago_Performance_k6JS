const OSTYPE = __ENV.OSTYPE || 'Linux';
const OSVERSION = __ENV.OSVERSION || 'unknown';


export const getAuth0TokenPayload = (authObject) => {                      
    return JSON.parse(
        //“Convert this JSON string into a JavaScript object and send it back.”
        `{"username":"${authObject.username}","password":"${authObject.password}","grant_type":"${authObject.grant_type}","audience":"${authObject.audience}","scope":"${authObject.scope}","client_id":"${authObject.client_id}","client_secret":"${authObject.client_secret}","realm":"${authObject.realm}"}`,
    );
};


export const getIdentityConnectTokenPayload = (username, password) => {
    return JSON.parse(
        `{"username":"${username}","password":"${password}","client_id":"client","grant_type":"password","client_secret":"29617D0F-A16C-4EB4-AB90-780D72CAC131","OsName":"${OSTYPE}","osVersion":"${OSVERSION}","SessionId":"","isNewPoRequest":"false","AcceptedTermsOfUse":""}`,
    );
};









