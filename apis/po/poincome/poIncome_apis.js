import poIncomeApiEndPoints from "./poIncomeApiEndPoints.js";
import HttpsMethods from "../../../utils/httpsMethods.js";
import { addResponseTimeToTrend } from "../../../utils/customTrends.js";
import { check, fail } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { APP_BASE_URL,BASE_URL } from "../../../config/config.js";
import poIncomeRequestPayload from "../../../requestPayloads/poIncomeRequestPayload.js";



class poIncomeApis {
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

        // Safely parse the body. Some endpoints legitimately return null or a
        // non-JSON/empty body, so don't hard-fail the whole iteration on it.
        let parsedBody = null;
        try {
            parsedBody = response.body ? JSON.parse(response.body) : null;
        } catch (e) {
            console.warn(`${operationName}: response body is not valid JSON (status ${response.status})`);
            return null;
        }

        if (parsedBody === null) {
            console.warn(`${operationName}: response body is null (status ${response.status})`);
        }

        return parsedBody;
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

    //income apis
    getInvoiceStatus() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.default.getInvoiceStatus_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, "getInvoiceStatus");
    }

    getPaymentTypes() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.default.getPaymentTypes_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, "getPaymentTypes");
    }

    getCumulativeBankListByOrganizationId() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.default.getCumulativeBankListByOrganizationId_get;
        const url = `${BASE_URL}${apiEndPoint.url(this.data.userInternalData.OrganizationId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getCumulativeBankListByOrganizationId');
    }


    /**
     * Retrieves grouped properties by active/inactive units for the organization
     * @returns {Object} Grouped property data response
     */
    getGroupedPropertyByActiveInActiveUnitsByOrganizationId() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.default.getGroupedPropertyByActiveInActiveUnitsByOrganizationId_get;
        const url = `${BASE_URL}${apiEndPoint.url(this.data.userInternalData.OrganizationId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getGroupedPropertyByActiveInActiveUnitsByOrganizationId');
    }


    /**
     * Retrieves available deposit types
     * @param {boolean} isDefault - Whether to get default deposit types
     * @returns {Object} Deposit types list response
     */
    getDepositTypes(isDefault = false) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.default.getDepositTypes_get;
        const url = `${BASE_URL}${apiEndPoint.url(isDefault)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getDepositTypes');
    }

    getIncomeInvoicesGroupByProperty() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.default.getIncomeInvoicesGroupByProperty_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const requestpayload = poIncomeRequestPayload.getRequestPayloadForIncomeInvoicesGroupByProperty(this.data.userInternalData.OrganizationRoleUserId);
        return this._makePostRequest(url, requestpayload, apiEndPoint, 'getIncomeInvoicesGroupByProperty');
        
    }

    getOverdueInvoices() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.default.getOverdueInvoices_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const requestpayload = poIncomeRequestPayload.getRequestPayloadForOverdueInvoice(this.data.userInternalData.OrganizationRoleUserId);
        return this._makePostRequest(url, requestpayload, apiEndPoint, 'getOverdueInvoices');
    }

    getIncomeInvoiceStatistics() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.default.getIncomeInvoiceStatistics_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const requestpayload = poIncomeRequestPayload.getRequestPayloadForIncomeInvoiceStatistics(this.data.userInternalData.OrganizationRoleUserId);
        return this._makePostRequest(url, requestpayload, apiEndPoint, 'getIncomeInvoiceStatistics');
    }  
    
    getIncomeInvoiceNotGroupIncome(filterReqPayload) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.default.getIncomeInvoicesNotGroupIncome_post
        const url = `${BASE_URL}${apiEndPoint.url}`;
        let requestpayload;
        if(Object.keys(filterReqPayload).length === 0){
            requestpayload = poIncomeRequestPayload.getRequestPayloadForIncomeInvoicesGroupByProperty(this.data.userInternalData.OrganizationRoleUserId);
        }else{
            requestpayload = JSON.stringify(filterReqPayload);
        }
        return this._makePostRequest(url, requestpayload, apiEndPoint, 'getIncomeInvoiceNotGroupIncome');
    }

    exportInvoiceGroupProperty() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.default.exportInvoicesGroupByProperty_post
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const requestpayload = poIncomeRequestPayload.getRequestPayloadForIncomeInvoicesGroupByProperty(this.data.userInternalData.OrganizationRoleUserId);
        return this._makePostRequest(url, requestpayload, apiEndPoint, 'exportInvoiceGroupProperty');
    }

  



// ==================== INVOICE DETAILS API METHODS ====================


    /**
     * Retrieves detailed invoice information by ID
     * @param {string} invoiceId - Invoice ID
     * @returns {Object} Invoice details response
     */
    getInvoiceDetails(invoiceId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.getInvoiceDetails_get;
        const url = `${BASE_URL}${apiEndPoint.url(invoiceId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getInvoiceDetails');
    }


    /**
     * Retrieves count of notes for an invoice
     * @param {string} invoiceId - Invoice ID
     * @returns {Object} Invoice notes count response
     */
    getInvoiceNotesCount(invoiceId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.getInvoiceNotesCount_get;
        const url = `${BASE_URL}${apiEndPoint.url(invoiceId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getInvoiceNotesCount');
    }


    /**
     * Retrieves deposit types including credit options
     * @returns {Object} Deposit types including credit response
     */
    getDepositTypesIncludingCredit() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.getDepositTypesIncludingCredit_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'getDepositTypesIncludingCredit');
    }


    /**
     * Generates printable invoice view
     * @param {string} invoiceId - Invoice ID
     * @returns {string} Invoice print view content
     */
    printInvoiceView(invoiceId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.printInvoiceView_get;
        const url = `${BASE_URL}${apiEndPoint.url(invoiceId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'printInvoiceView');
    }


    /**
     * Retrieves tenants with email addresses for an invoice
     * @param {string} invoiceId - Invoice ID
     * @returns {Object} Tenants with email by invoice ID response
     */
    getTenantsWithEmailByInvoiceId(invoiceId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.getTenantsWithEmailByInvoiceId_get;
        const url = `${BASE_URL}${apiEndPoint.url(invoiceId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getTenantsWithEmailByInvoiceId');
    }


    /**
     * Retrieves payment reminder template for an invoice
     * @param {string} invoiceId - Invoice ID
     * @returns {Object} Payment reminder template response
     */
    getPaymentReminderTemplate(invoiceId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.getPaymentReminderTemplate_get;
        const url = `${BASE_URL}${apiEndPoint.url(invoiceId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getPaymentReminderTemplate');
    }


    /**
     * Sends payment reminder to tenants
     * @param {Object} reminderData - Reminder data to send
     * @returns {Object|null} Send reminder response
     */
    sendReminder(reminderData) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.sendReminder_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, reminderData, apiEndPoint, 'sendReminder');
    }


    /**
     * Retrieves tenants associated with an invoice
     * @param {string} invoiceId - Invoice ID
     * @returns {Object} Tenants by invoice ID response
     */
    getTenantsByInvoiceId(invoiceId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.getTenantsByInvoiceId_get;
        const url = `${BASE_URL}${apiEndPoint.url(invoiceId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getTenantsByInvoiceId');
    }


    /**
     * Retrieves available payment methods
     * @returns {Object} Payment method list response
     */
    getPaymentMethodList() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.getPaymentMethodList_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'getPaymentMethodList');
    }


    /**
     * Retrieves record payment model for an invoice and student
     * @param {string} invoiceId - Invoice ID
     * @param {string} studentId - Student ID
     * @returns {Object} Record payment model response
     */
    getRecordPaymentModel(invoiceId, studentId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.getRecordPaymentModel_get;
        const url = `${BASE_URL}${apiEndPoint.url(invoiceId, studentId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getRecordPaymentModel');
    }


    /**
     * Saves recorded payment information
     * @param {Object} paymentData - Payment data to record
     * @returns {Object|null} Save record payment response
     */
    saveRecordPayment(paymentData) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.saveRecordPayment_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, paymentData, apiEndPoint, 'saveRecordPayment');
    }


    /**
     * Deletes an invoice by ID
     * @param {string} invoiceId - Invoice ID to delete
     * @returns {Object|null} Delete invoice response
     */
    deleteInvoiceById(invoiceId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.deleteInvoiceById_get;
        const url = `${BASE_URL}${apiEndPoint.url(invoiceId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'deleteInvoiceById');
    }


    /**
     * Updates an invoice item
     * @param {Object} reqPayload - Request payload for invoice item update
     * @returns {Object|null} Update invoice item response
     */
    updateInvoiceItem(reqPayload) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.updateInvoiceItem_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, reqPayload, apiEndPoint, 'updateInvoiceItem');
    }

    

    // ==================== NEW INVOICE API METHODS ====================


    /**
     * Retrieves invoice edit model for creating or editing invoices
     * @param {number} invoiceId - Invoice ID (default: 0 for new invoice)
     * @returns {Object} Invoice edit model response
     */
    getInvoiceEditModel(invoiceId = 0) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.newInvoice.getInvoiceEditModel_get;
        const url = `${BASE_URL}${apiEndPoint.url(invoiceId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getInvoiceEditModel');
    }


    /**
     * Retrieves properties by organization ID for invoice creation
     * @returns {Object} Property by organization ID response
     */
    getPropertyByOrganizationId() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.newInvoice.getPropertyByOrganizationId_get;
        const url = `${BASE_URL}${apiEndPoint.url(this.data.userInternalData.OrganizationId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getPropertyByOrganizationId');
    }


    /**
     * Retrieves rent due on types for invoice configuration
     * @returns {Object} Rent due on types response
     */
    getRentDueOnTypes() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.newInvoice.getRentDueOnTypes_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'getRentDueOnTypes');
    }


    /**
     * Retrieves units for a specific property
     * @param {string} propertyId - Property ID
     * @returns {Object} Unit by property ID response
     */
    getUnitByPropertyId(propertyId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.newInvoice.getUnitByPropertyId_get;
        const url = `${BASE_URL}${apiEndPoint.url(propertyId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getUnitByPropertyId');
    }


    /**
     * Retrieves listing information by property unit ID for invoice creation
     * @param {string} propertyUnitId - Property unit ID
     * @returns {Object} Listing by property unit ID for invoice response
     */
    getListingByPropertyUnitIdForInvoice(propertyUnitId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.newInvoice.getListingByPropertyUnitIdForInvoice_get;
        const url = `${BASE_URL}${apiEndPoint.url(propertyUnitId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getListingByPropertyUnitIdForInvoice');
    }


    /**
     * Retrieves tenants associated with a specific listing
     * @param {string} listingId - Listing ID
     * @returns {Object} Tenants by listing ID response
     */
    getTenantsByListingId(listingId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.newInvoice.getTenantsByListingId_get;
        const url = `${BASE_URL}${apiEndPoint.url(listingId)}`;
        return this._makeGetRequest(url, apiEndPoint, 'getTenantsByListingId');
    }


    /**
     * Saves a new manual invoice
     * @param {Object} newInvoiceReqPayload - New invoice request payload
     * @returns {Object|null} Save manual invoice response
     */
    saveManualInvoice(newInvoiceReqPayload) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.newInvoice.saveManualInvoice_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        // The caller passes the invoice model object; serialize it so it's sent as JSON
        // (http.post would otherwise form-urlencode a plain object and the server 400s).
        const payload = typeof newInvoiceReqPayload === 'string' ? newInvoiceReqPayload : JSON.stringify(newInvoiceReqPayload);
        return this._makePostRequest(url, payload, apiEndPoint, 'saveManualInvoice');
    }


    // ==================== NOTES API METHODS ====================

    /**
     * Retrieves primary notes for an invoice and lease
     * @param {string} invoiceId - Invoice ID
     * @param {string} leaseId - Lease ID
     * @param {number} primaryNoteTypeId - Primary note type ID (default: 257)
     * @returns {Object} Primary notes response
     */
    getPrimaryNotes(invoiceId, leaseId, primaryNoteTypeId = 257) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.notes.getPrimaryNotes_post;
        const requestPayload = poIncomeRequestPayload.getRequestPayloadForPrimaryNotes(
            this.data.userInternalData.OrganizationRoleUserId,
            invoiceId,
            leaseId,
            primaryNoteTypeId,
        );
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, requestPayload, apiEndPoint, 'getPrimaryNotes');
    }

    /**
     * Retrieves related notes for an invoice and lease
     * @param {string} invoiceId - Invoice ID
     * @param {string} leaseId - Lease ID
     * @param {number} primaryNoteTypeId - Primary note type ID (default: 257)
     * @returns {Object} Related notes response
     */
    getRelatedNotes(invoiceId, leaseId, primaryNoteTypeId = 257) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.notes.getRelatedNotes_post;
        const requestPayload = poIncomeRequestPayload.getRequestPayloadForRelatedNotes(
            this.data.userInternalData.OrganizationRoleUserId,
            invoiceId,
            leaseId,
            primaryNoteTypeId,
        );
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, requestPayload, apiEndPoint, 'getRelatedNotes');
    }

    /**
     * Retrieves filter user list for notes
     * @returns {Object} Filter user list response
     */
    getFilterUserList() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.notes.getFilterUserList_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'getFilterUserList');
    }


    /**
     * Retrieves notes category list
     * @returns {Object} Notes category list response
     */
    getNotesCategoryList() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.notes.getNotesCategoryList_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'getNotesCategoryList');
    }


    /**
     * Deletes a note by ID
     * @param {string} noteId - Note ID to delete
     * @returns {Object|null} Delete operation response
     */
    deleteNote(noteId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.notes.deleteNote_post;
        const url = `${BASE_URL}${apiEndPoint.url(noteId)}`;
        return this._makePostRequest(url, null, apiEndPoint, 'deleteNote');
    }


    /**
     * Saves a new note for an invoice and lease
     * @param {string} invoiceId - Invoice ID
     * @param {string} leaseId - Lease ID
     * @returns {Object} Save note response
     */
    saveNote(invoiceId, leaseId) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.notes.saveNotes_post;
        const requestPayload = poIncomeRequestPayload.getRequestPayloadForSaveNote(this.data.userInternalData, invoiceId, leaseId);
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, requestPayload, apiEndPoint, 'saveNote');
    }

    // ==================== ATTACHMENTS API METHODS ====================


    /**
     * Retrieves primary attachments for an invoice and lease
     * @param {string} invoiceId - Invoice ID
     * @param {string} leaseId - Lease ID
     * @param {number} primaryAttachmentTypeId - Primary attachment type ID (default: 342)
     * @returns {Object} Primary attachments response
     */
    getPrimaryAttachments(invoiceId, leaseId, primaryAttachmentTypeId = 342) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.attachments.getPrimaryAttachments_post;
        const requestPayload = poIncomeRequestPayload.getRequestPayloadForPrimaryAttachments(
            this.data.userInternalData,
            invoiceId,
            leaseId,
            primaryAttachmentTypeId,
        );
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, requestPayload, apiEndPoint, 'getPrimaryAttachments');
    }

    /**
     * Retrieves related attachments for an invoice and lease
     * @param {string} invoiceId - Invoice ID
     * @param {string} leaseId - Lease ID
     * @param {number} primaryAttachmentTypeId - Primary attachment type ID (default: 342)
     * @returns {Object} Related attachments response
     */
    getRelatedAttachments(invoiceId, leaseId, primaryAttachmentTypeId = 342) {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.attachments.getRelatedAttachments_post;
        const requestPayload = poIncomeRequestPayload.getRequestPayloadForRelatedAttachments(
            this.data.userInternalData,
            invoiceId,
            leaseId,
            primaryAttachmentTypeId,
        );
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, requestPayload, apiEndPoint, 'getRelatedAttachments');
    }

    /**
     * Retrieves attachments category list
     * @returns {Object} Attachments category list response
     */
    getAttachmentsCategoryList() {
        const apiEndPoint = poIncomeApiEndPoints.po.income.invoiceDetails.attachments.getAttachmentsCategoryList_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'getAttachmentsCategoryList');
    }






































}


export default new poIncomeApis();

