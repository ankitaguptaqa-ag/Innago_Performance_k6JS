
import { expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import { check, fail } from "k6";
import { sleep } from "k6";
import apiEndPoints from "../../config/apiEndPoints.js";
import { BASE_URL, ENV } from "../../config/config.js";
import { APP_BASE_URL, AUTH0_BASE_URL, AUTH0_REALM, RO_CLIENT_ID, RO_CLIENT_SECRET } from "../../config/config.js";
//import HttpsMethods from "../../utils/httpsMethods.js";
import { getAuth0TokenPayload } from "../../requestPayloads/loginRequestPayload.js";
import { getIdentityConnectTokenPayload } from "../../requestPayloads/loginRequestPayload.js";
import { addResponseTimeToTrend } from "../../utils/customTrends.js";
import HttpsMethods from "../../utils/httpsMethods.js";
//import trends from "../../utils/customTrends.js";




class LoginApis {
    accessToken = null;
    sessionId = "";
    identityId = null;
    isRequiresTwoFactor = null;
    trends = {};

     getTokenViaAuthZero(userData) {
        console.log(`Logging with user via Auth0 :: ${userData.username}`);
        const endpoint = apiEndPoints.auth0.oAuthToken;
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const tags = {
            method: endpoint.methodType,
            name: endpoint.name,
            status: endpoint.status.toString(),
        };
        let authObject = {
            username: userData.username,
            password: userData.password,
            grant_type: "http://auth0.com/oauth/grant-type/password-realm",
            audience: APP_BASE_URL,
            scope: "openid profile email offline_access", // not able to undestand the use of scope in this context, need to research more
            client_id: RO_CLIENT_ID,
            client_secret: RO_CLIENT_SECRET,
            realm: AUTH0_REALM,
        };
        const response = HttpsMethods.post(`${AUTH0_BASE_URL}${endpoint.url}`, getAuth0TokenPayload(authObject), headers, tags);
        if (response.status !== endpoint.status) {
            fail(`Failed to get token via Auth0 : ${response.status} for user :: ${userData.username} --> ${response.body}`);
        }
        check(response, {
            "Connect Token api status is 200": (r) => r.status === endpoint.status,
            "Connect Token api response body is not empty ": (r) => r.body && r.body.length > 0, //make sur body exist & it should contains some data
        });
        addResponseTimeToTrend(this.trends, endpoint.name, response);
        expect(response).to.have.validJsonBody();
        const body = JSON.parse(response.body);
        this.accessToken = body.access_token;
        this.id_token = body.id_token;
        console.log(`Successfully got token via Auth0 for user :: ${userData.username}`);


        return {
            accessToken: this.accessToken,
            id_token: this.id_token,
        };
    }


    identityConnectToken(userData) {
        console.log(`Getting connect token for user :: ${userData.username}`);
        const endpoint = apiEndPoints.login.connect_token;
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Accept: "application/json, text/plain, */*",
            Origin: APP_BASE_URL,
            Referer: APP_BASE_URL,
        };
        const tags = {
            method: endpoint.methodType,
            name: endpoint.name,
            status: endpoint.status.toString(),
        };
        const response = HttpsMethods.post(
            `${APP_BASE_URL}${endpoint.url}`,
            getIdentityConnectTokenPayload(userData.username, userData.password),
            headers,
            tags,
        );


        if (response.status !== endpoint.status) {
            fail(`Failed to get identity connect token: ${response.status} for user :: ${userData.username}`);
        }


        check(response, {
            "Connect Token api status is 200": (r) => r.status === endpoint.status,
            "Connect Token api response body is not empty": (r) => r.body && r.body.length > 0,
        });


        addResponseTimeToTrend(this.trends, endpoint.name, response);
        expect(response).to.have.validJsonBody();
        const body = JSON.parse(response.body);
        this.accessToken = body.access_token;
        this.sessionId = body.sessionId;
        this.identityId = body.identityId;
        this.isRequiresTwoFactor = body.requiresTwoFactor;
        // if (body.isRequiresTwoFactor === true) {
        //  this.identityConnectTokenWith2faOtp(userData);
        // }


        return {
            accessToken: this.accessToken,
            sessionId: this.sessionId,
            identityId: this.identityId,
            //isRequiresTwoFactor: this.isRequiresTwoFactor,
        };
    }

    userLoginIdentity() {
        const endPoint = apiEndPoints.login.user_identity;
        const headers = {
            Authorization: `Bearer ${this.accessToken}`,
            Token: `${this.sessionId}`,
            Referer: APP_BASE_URL,
            Origin: APP_BASE_URL,
            Accept: "application/json, text/plain, */*",
        };
        const tags = {
            method: endPoint.methodType,
            name: endPoint.name,
            status: endPoint.status.toString(),
        };
        const response = HttpsMethods.get(`${BASE_URL}${endPoint.url}`, headers, tags);


        if (response.status !== endPoint.status) {
            console.log(`Failed to get user login identity: ${JSON.stringify(response)}`);
        }
        check(response, {
            "User login identity api status is 200": (r) => r.status === endPoint.status,
            "User login identity api response body is not empty": (r) => r.body && r.body.length > 0,
        });
        addResponseTimeToTrend(this.trends, endPoint.name, response);
        expect(response).to.have.validJsonBody();
        return response;
    }


    loginIntoGivenUser(user) {
        let connectTokenResponse;
        this.sessionId = user.token || null;
        if (ENV === "dev" || ENV === "qa" || ENV === "pre") {
            connectTokenResponse = this.getTokenViaAuthZero(user);
        } else {
            connectTokenResponse = this.identityConnectToken(user);
        }


        let userInternalDataResponse = this.userLoginIdentity();
        // if (ENV !== 'dev' || ENV !== 'qa') {
        //  this.optOutOf2fa();
        // }
        if (userInternalDataResponse.status !== 200) {
            throw new Error(`userLoginIdentity failed with status ${userInternalDataResponse.status} - server may be temporarily unavailable`);
        }
        let userInternalData = JSON.parse(userInternalDataResponse.body).Data;


        return {
            userInternalData: userInternalData,
            accessToken: connectTokenResponse.accessToken,
            sessionId: user.token || null,
            identityId: connectTokenResponse.identityId || null,
            isRequiresTwoFactor: connectTokenResponse.isRequiresTwoFactor || false,
        };
    }
}
export default new LoginApis();





    





    