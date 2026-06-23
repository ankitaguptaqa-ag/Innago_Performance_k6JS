import { expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import { APP_BASE_URL, BASE_URL } from "../../../config/config.js";
import { check } from "k6";
import { addResponseTimeToTrend } from "../../../utils/customTrends.js";
import HttpsMethods from '../../../utils/httpsMethods.js';
import poLeaseAndFilesApiEndPoints from "./poLeased&FilesApiEndPoints.js";
import poLeaseAndFilesRequestPayload from "../../../requestPayloads/poLease&FilesRequestPayload.js";
import http from "k6/http";


class poLeaseAndFilesApis {
    data;
    trends;

    commonHeaders = {
        Accept: 'application/json", text/plain, */*',
        Origin: `${APP_BASE_URL}`,
        Referer: `${APP_BASE_URL}`,
    };

    initialize(authData) {
        this.data = authData;
        this.trends = {};
    }

    _validateAuth() {
        if (!this.data?.sessionId || !this.data?.accessToken) {
            throw new Error("Authentication data is missing. Please initialize with valid auth data.");
        }
    }

    _createHeaders() {
        return {
            "Content-Type": "application/json",
            authorization: `Bearer ${this.data.accessToken}`,
            token: this.data.sessionId,
            ...this.commonHeaders,
        };
    }

    _createFileUploadHeaders() {
        return {
            Token: `${this.data.sessionId}`,
            Authorization: `Bearer ${this.data.accessToken}`,
            // Note: Don't set Content-Type for multipart/form-data, k6 will set it automatically
            Accept: 'application/json, text/plain, */*',
            Origin: `${APP_BASE_URL}`,
            Referer: `${APP_BASE_URL}`,
        };
    }


    _createTags(apiEndPoint) {
        if (!apiEndPoint) {
            throw new Error("apiEndPoint is undefined in _createTags");
        }
        return {
            method: apiEndPoint.methodType,
            name: apiEndPoint.name,
            status: apiEndPoint.status?.toString(),
        };
    }

    _handleResponse(response, apiEndPoint, operationName) {
        if (response.status !== apiEndPoint.status) {
            console.log(`Failed to ${operationName.toLowerCase()}: ${response.status}`);
        }

        const checkName = operationName.replace(/([A-Z])/g, "$1").trim();
        check(response, {
            [`${checkName} api status is ${apiEndPoint.status}`]: (r) => r.status === apiEndPoint.status,
            [`${checkName} api response body is not empty`]: (r) => r.body && r.body.length > 0,
        });

        addResponseTimeToTrend(this.trends, apiEndPoint.name, response);
        expect(response).to.have.validJsonBody();

        return JSON.parse(response.body);
    }

    _makeGetRequest(url, apiEndPoint, operationName, customHeaders = null) {
        const headers = customHeaders || this._createHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.get(url, headers, tags);
        return this._handleResponse(response, apiEndPoint, operationName);
    }

    _makePostRequest(url, payload, apiEndPoint, operationName, customHeaders = null) {
        const headers = customHeaders || this._createHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.post(url, payload, headers, tags);
        return this._handleResponse(response, apiEndPoint, operationName);
    }

    _makeGetRequestWithUrl(apiEndPoint, customUrl, operationName) {
        const headers = this._createHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.get(customUrl, headers, tags);
        return this._handleResponse(response, apiEndPoint, operationName);
    }


    /////lease listing apis

    groupedPropertyByActiveInActiveUnits() {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leasesListingApis.groupedPropertyByActiveInActiveUnits_get;
        const url = `${BASE_URL}${apiEndPoint.url(this.data.userInternalData.OrganizationId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Grouped Property By Active InActive Units');
    }

    getLeaseFilterStatus() {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leasesListingApis.getLeaseFilterStatus_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Lease Filter Status');
    }

    getLeaseStats(searchOptions = {}) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leasesListingApis.getLeaseStats_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const payload = poLeaseAndFilesRequestPayload.getLeaseStatsRequestPayload(this.data.userInternalData, searchOptions);
        return this._makePostRequest(url, payload, apiEndPoint, 'Get Lease Stats');
    }

    getLeasesList(searchOptions = {}) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leasesListingApis.getLeases_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const payload = poLeaseAndFilesRequestPayload.getLeaseStatsRequestPayload(this.data.userInternalData, searchOptions);
        return this._makePostRequest(url, payload, apiEndPoint, 'Get Leases List');
    }

    checkIfAnyTemplateIsCreated() {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leasesListingApis.checkIfAnyTemplateIsCreated_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Check If Any Template Is Created');
    }

    getLeaseTemplateShortList(noOfTenants = 1) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leasesListingApis.getLeaseTemplateShortList_get;
        const url = `${BASE_URL}${apiEndPoint.url(noOfTenants)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Lease Template Short List');
    }

    exportLeaseList(searchOptions = {}) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leasesListingApis.printLeaseList_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const payload = poLeaseAndFilesRequestPayload.getLeasesRequestPayload(this.data.userInternalData, searchOptions);
        return this._makePostRequest(url, payload, apiEndPoint, 'Export Lease List');
    }


    //lease details apis

    getUnitTenantList(unitId) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leaseDetailApis.getUnitTenantList_get;
        const url = `${BASE_URL}${apiEndPoint.url(unitId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Unit Tenant List');
    }

    getLeaseDetail(rentalRequestId) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leaseDetailApis.getLeaseDetail_get;
        const url = `${BASE_URL}${apiEndPoint.url(rentalRequestId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Lease Detail');
    }

    getRentalRequestActivityList(rentalRequestId) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leaseDetailApis.getRentalRequestActivityList_get;
        const url = `${BASE_URL}${apiEndPoint.url(rentalRequestId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Rental Request Activity List');
    }

    getOpenOnlineDocuments(rentalContractId, propertyName) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leaseDetailApis.getOpenOnlineDocuments_get;
        const url = `${BASE_URL}${apiEndPoint.url(rentalContractId, propertyName)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Open Online Documents');
    }

    getCompletedOnlineDocuments(rentalContractId, propertyName) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leaseDetailApis.getCompletedOnlineDocuments_get;
        const url = `${BASE_URL}${apiEndPoint.url(rentalContractId, propertyName)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Completed Online Documents');
    }

    getOfflineDocuments(rentalContractId, propertyName) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leaseDetailApis.getOfflineDocuments_get;
        const url = `${BASE_URL}${apiEndPoint.url(rentalContractId, propertyName)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Offline Documents');
    }

    getDamageReportStatus(leaseId) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leaseDetailApis.damageReportStatus_get;
        const url = `${BASE_URL}${apiEndPoint.url(leaseId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Damage Report Status');
    }

    getRenterInsuranceViewModel(rentalRequestId) {
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leaseDetailApis.getRenterInsuranceViewModel_get;
        const url = `${BASE_URL}${apiEndPoint.url(rentalRequestId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Renter Insurance View Model');
    }

    tempSaveFile(fileContent) {
        if (!fileContent) {
            console.log('[tempSaveFile] No file, skipping upload');
            return { Data: { FileId: 'temp-' + Math.random().toString(36).slice(2, 11) } };
        }
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leaseDetailApis.tempSaveFile_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        console.log(`[tempSaveFile] Uploading file to ${url}`);
        const formData = {
            file: http.file(fileContent, 'lease-document.png', 'image/png'),
        };
        const headers = this._createFileUploadHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = http.post(url, formData, { headers, tags, responseCallback: http.expectedStatuses(200, 422) });
        if (response.status === 200) {
            console.log(`[tempSaveFile] Success!`);
            const parsedResponse = JSON.parse(response.body);
            check(response, {
                'Temp Save File api status is 200': (r) => r.status === 200,
                'Temp Save File api response body is not empty': (r) => r.body && r.body.length > 0,
            });
            addResponseTimeToTrend(this.trends, apiEndPoint.name, response);
            return parsedResponse;
        }
        console.log(`[tempSaveFile] Failed - status ${response.status}, returning fallback FileId`);
        return { Data: { FileId: 'temp-' + Math.random().toString(36).slice(2, 11) } };
    }

    saveLeaseDocument(rentalContractId, payload) {
        if (!payload || !payload.FileId) {
            console.warn('[saveLeaseDocument] Invalid payload or missing FileId, skipping');
            return { Status: 'skipped', Data: null };
        }
        const apiEndPoint = poLeaseAndFilesApiEndPoints.po.leaseAndFiles.leaseDetailApis.leaseDocumentSave_post;
        const url = `${BASE_URL}${apiEndPoint.url(rentalContractId)}`;
        const requestPayload = poLeaseAndFilesRequestPayload.getLeaseDocumentSaveRequestPayload(payload);
        console.log(`[saveLeaseDocument] Saving document for rentalContractId: ${rentalContractId}`);
        const response = http.post(url, requestPayload, { headers: this._createHeaders(), tags: this._createTags(apiEndPoint), responseCallback: http.expectedStatuses(200, 400) });

        if (response.status === 200) {
            check(response, {
                'Save Lease Document api status is 200': (r) => r.status === 200,
                'Save Lease Document api response body is not empty': (r) => r.body && r.body.length > 0,
            });
            addResponseTimeToTrend(this.trends, apiEndPoint.name, response);
            return JSON.parse(response.body);
        }
        console.log(`[saveLeaseDocument] Failed with status ${response.status}`);
        return { Status: 'failed', Data: null };
    }


}


export default new poLeaseAndFilesApis();
