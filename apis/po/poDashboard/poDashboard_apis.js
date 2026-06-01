import { expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import { APP_BASE_URL, BASE_URL } from "../../../config/config.js";
import { check } from "k6";
import { addResponseTimeToTrend } from "../../../utils/customTrends.js";
import HttpsMethods from '../../../utils/httpsMethods.js';
import poDashboardApiEndPoints from "./poDashboardApiEndPoints.js";
import poDashboardPayload from "../../../requestPayloads/poDashboardRequestPayload.js";





/**
 * /**
 * Property Owner Dashboard APIs Class
 * Provides methods to interact with property owner dashboard-related API endpoints
 * Includes property management, maintenance, financial, and utility functions
 */


class poDashboardApis {
    data;
    trends;

    commonHeaders = {
        Accept: 'application/json", text/plain, */*',
        Origin: `${APP_BASE_URL}`,  //used for frntend calls 
        Referer: `${APP_BASE_URL}`,
    };


    /**
     * Initialize the API instance with authentication data
     * @param {Object} authData - Authentication data containing accessToken and sessionId
     */


    initialize(authData) {
        this.data = authData;
        this.trends = {};
    }


    /**
     * Validates that required authentication data is present
     * @throws {Error} If authentication data is missing
     * The _ means:_validate : underscore is used as This is internal / private — don’t use it outside this class”

     * indicates that a method or property is intended to be private or internal to the class.
     * It's used here to follow best practices for encapsulation, making the codebase clearer and less error-prone,
     */


    _validateAuth() {
        if (!this.data?.sessionId || !this.data?.accessToken) {
            throw new Error("Authentication data is missing. Please initialize with valid auth data.");
        }
    }


    /**
     * Creates standardized headers for API requests
     * @returns {Object} Headers object with authentication and common headers
     * The ... in your code is called the Spread Operator in JavaScript.
     * It is used to expand or copy values from an array or object into another array/object.


     */
    _createHeaders() {
        return {
            "Content-Type": "application/json",
            authorization: `Bearer ${this.data.accessToken}`,
            token: this.data.sessionId,
            ...this.commonHeaders,
        };
    }


    /**
     * Creates standardized tags for API requests
     * @param {Object} apiEndPoint - API endpoint configuration
     * @returns {Object} Tags object for request tracking
     */
  


    _createTags(apiEndPoint) {
        if (!apiEndPoint) {
            throw new Error("apiEndPoint is undefined in _credateHeaders");
        }


        return {
            method: apiEndPoint.methodType,
            name: apiEndPoint.name,
            status: apiEndPoint.status?.toString(),
        };
    }


    /**
     * Handles common API response validation and processing
     * @param {Object} response - HTTP response object
     * @param {Object} apiEndPoint - API endpoint configuration
     * @param {string} operationName - Name of the operation for error messages
     * @returns {Object} Parsed JSON response
     */


    _handleResponse(response, apiEndPoint, operationName) {
        if (response.status !== apiEndPoint.status) {
            console.log(`Failed to ${operationName.toLowerCase()}: ${response.status}`);
        }


        const checkName = operationName.replace(/([A-Z])/g, "$1").trim();
        check(response, {
            [`${checkName} api status is ${apiEndPoint.status}`]: (r) => r.status === apiEndPoint.status,
            //Validates that the HTTP response status code matches the expected status.
            //The arrow function (r) => r.status === apiEndPoint.status returns true if status matches.
            [`${checkName} api response body is not empty`]: (r) => r.body && r.body.length > 0,
        });


        addResponseTimeToTrend(this.trends, apiEndPoint.name, response); // name will give you the exact name of the api
        expect(response).to.have.validJsonBody(); // Validates that the response body is valid JSON. This is important for APIs that return JSON data, ensuring that the response can be parsed correctly.


        return JSON.parse(response.body);
    }


 


    /**
     * Makes a GET request with standardized handling
     * @param {string} url - Request URL
     * @param {Object} apiEndPoint - API endpoint configuration
     * @param {string} operationName - Name of the operation
     * @param {Object} customHeaders - Optional custom headers to override defaults
     * @returns {Object} Parsed JSON response
     */


    _makeGetRequest(url, apiEndPoint, operationName, customHeaders = null) {
        const headers = customHeaders || this._createHeaders(apiEndPoint);
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.get(url, headers, tags);
        return this._handleResponse(response, apiEndPoint, operationName);
    }



    /**
     * Makes a POST request with standardized handling
     * @param {string} url - Request URL
     * @param {string} payload - Request payload
     * @param {Object} apiEndPoint - API endpoint configuration
     * @param {string} operationName - Name of the operation
     * @param {Object} customHeaders - Optional custom headers to override defaults
     * @returns {Object} Parsed JSON response
     */


    _makePostRequest(url, payload, apiEndPoint, operationName, customHeaders = null) {
        const headers = customHeaders || this._createHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.post(url, payload, headers, tags);
        return this._handleResponse(response, apiEndPoint, operationName);
    }


    //////////////////////////////////////////////////////////////////


    // ===============================================
    // DASHBOARD CONFIGURATION & SETTINGS APIs
    // ===============================================


    /**
     * gets property owner unsigned lease list model
     * @returns {Object} unsigned lease list response
     */


    getPropertyOwnerUnsignedLeaseListModel() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.getPropertyOwnerUnsignedLeaseListModel_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, "getPropertyOwnerUnsignedLeaseListModel");
    }


    /**
     * gets property owner listing statistics on dashboard
     * @returns {Object} listing statistics response
     */


    getPropertyOwnerListingStatsModel() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.getPropertyOwnerListingStatsModel_get;
        const url = `${BASE_URL}${apiEndPoint.url}?month=5`;
        return this._makeGetRequest(url, apiEndPoint, "getPropertyOwnerListingStatsModel");
    }


    getApplicationListByPropertyOwnerId() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.getApplicationListByPropertyOwnerId_post;
        const payload = poDashboardPayload.getApplicationListByPropertyOwnerIdPayload();
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, payload, apiEndPoint, "getApplicationListByPropertyOwnerId");
    }


    /**
     * Gets show by months data
     * @returns {Object} Show by months response
     */
    getShowByMonths() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.getShowByMonths_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, "GetShowByMonths");
    }


    /**
     * Gets property owner status
     * @returns {Object} Property owner status response
     */
    getPropertyOwnerStatus() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.getPropertyOwnerStatus_get;
        const url = `${BASE_URL}${apiEndPoint.url}/${this.data.userInternalData.OrganizationRoleUserId}`;
        return this._makeGetRequest(url, apiEndPoint, "GetPropertyOwnerStatus");
    }


    // ===============================================
    // MAINTENANCE & PROPERTY MANAGEMENT APIs
    // ===============================================


    /**
     * Gets maintenance details on dashboard
     * @returns {Object} Maintenance details response
     */


    getMaintenanceDetailOnDashboard() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.getMaintenanceDetailOnDashboard_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, "getMaintenanceDetailOnDashboard");
    }


    // ===============================================
    // FINANCIAL & BANKING APIs
    // ===============================================


    /**
     * Gets unverified bank account information
     * @returns {Object} Unverified bank account response
     */


    getUnverifiedBankAccount() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.unverifiedBankAccount_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, "unverifiedBankAccount");
    }


    getPendingBank() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.getPendingBank_get;
        const url = `${BASE_URL}${apiEndPoint.url}?organizationId=${this.data.userInternalData.OrganizationId}`; /// userinternaldata is some hat holds user-related info used internally randomly used
        return this._makeGetRequest(url, apiEndPoint, "GetPendingBank");
    }


    /**
     * Gets outstanding invoices
     * @returns {Object} Outstanding invoices response
     */
    getOutstandingInvoices() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.outstandingInvoices_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, "GetOutstandingInvoices");
    }


    /**
     * Gets invoice statistics
     * @returns {Object} Invoice stats response
     */
    getInvoiceStats() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.getInvoiceStats_post;
        const payload = poDashboardPayload.getRequestJsonForInvoiceStats();
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, payload, apiEndPoint, "GetInvoiceStats");
    }


    // ===============================================
    // MARKETING & COMMUNICATION APIs
    // ===============================================


    /**
     * Gets advertisements
     * @returns {Object} Advertisements response
     */
    getAdvertisements() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.getAdvertisements_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, "GetAdvertisements");
    }


    getDashboardReferralModel() {
        const apiEndPoint = poDashboardApiEndPoints.po.dashboard.dashboardReferralModel_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, "GetDashboardReferralModel");
    }
}








export default new poDashboardApis();  

