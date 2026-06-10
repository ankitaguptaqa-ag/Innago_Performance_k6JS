import { expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import { APP_BASE_URL, BASE_URL } from "../../../config/config.js";
import { check } from "k6";
import { addResponseTimeToTrend } from "../../../utils/customTrends.js";
import HttpsMethods from '../../../utils/httpsMethods.js';
import poPropertiesApiEndPoints from "./poPropertiesApiEndPoints.js";
import poPropertiesRequestPayload from "../../../requestPayloads/poPropertiesRequestPayload.js";
import dateUtils from "../../../utils/dateUtils.js";


class poPropertiesApis {
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

    /**
     * Makes a standardized GET request with custom URL (for query parameters)
     * @private
     * @param {Object} apiEndPoint - API endpoint configuration
     * @param {string} customUrl - Custom URL with query parameters
     * @param {string} operationName - Description of the operation
     * @returns {Object} Parsed JSON response
     */
    _makeGetRequestWithUrl(apiEndPoint, customUrl, operationName) {
        const headers = this._createHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.get(customUrl, headers, tags);
        return this._handleResponse(response, apiEndPoint, operationName);
    }








    /////apis

    getPropertyLimit() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.propertyListing.getPropertyLimit_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Property Limit');
    }


    getPropertyUnitLimit() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.propertyListing.getPropertyUnitLimit_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Property Unit Limit');
    }


    getPropertiesStatus() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.propertyListing.getPropertiesStatus_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Properties status');
    }


    getStateList() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.propertyListing.getStateList_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get state List');
    }

    groupedPropertyByActiveInActiveUnitsByOrganizationId() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.propertyListing.groupedPropertyByActiveInActiveUnits_get;
        const url = `${BASE_URL}${apiEndPoint.url}?organizationId=${this.data.userInternalData.OrganizationId}&isDefaultMarketRentFeatureOn=false`;
        return this._makeGetRequest(url, apiEndPoint, 'Grouped Property By Active InActive Units');
    }

    getPropertyList(options) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.propertyListing.getPropertiesList_post;
        const payload = poPropertiesRequestPayload.getPropertiesListRequestPayload(options);
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, payload, apiEndPoint, 'Get Property List');
    }


    getPropertiesStats() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.propertyListing.stats_post;
        const payload = poPropertiesRequestPayload.getPropertiesListRequestPayload();
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, payload, apiEndPoint, 'Get Properties Stats');
    }


    getAllPropertyUnitList() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.propertyListing.getAllUnitList_post;
        const payload = poPropertiesRequestPayload.getPropertyUnitRequestPayload({ OrganizationId: this.data.userInternalData.OrganizationId });
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, payload, apiEndPoint, 'Get all unit List');
    }


    leaseSyncDueAmount() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.propertyListing.syncDueAmount_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const payload = '';
        return this._makePostRequest(url, payload, apiEndPoint, 'Sync Due Amount');
    }
    getAllPropertyInfo() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getAllPropertyInfo_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const payload = poPropertiesRequestPayload.getAllPropertyInfoRequestPayload();
        return this._makePostRequest(url, payload, apiEndPoint, 'Get All Property Info');
    }


    getLeaseTermPropertyFilterStatus() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getLeaseTermPropertyFilterStatus_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Lease Term Property Filter Status');
    }


    getPropertyLimitProperty() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getPropertyLimit_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Property Limit');
    }


    getPropertyUnitLimitProperty() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getPropertyUnitLimit_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Property Unit Limit');
    }


    getPropertyTagList() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getPropertyTagList_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Property Tag List');
    }


    getStateList() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getStateList_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get State List');
    }


    getNewPropertyJsonModel() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getNewPropertyModel_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get New Property JSON Model');
    }

    getBlackListedPhone() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getBlackListedPhone_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get BlackListed Phone');
    }


    getLateFees() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getLateFees_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const payload = JSON.stringify({
            OrganizationId: this.data.userInternalData.OrganizationId,
        });
        return this._makePostRequest(url, payload, apiEndPoint, 'Get Late Fees');
    }


    getBankAccountListForPropertyDetails() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getBankAccountListForPropertyDetail_get;
        const url = `${BASE_URL}${apiEndPoint.url}?personId=${this.data.userInternalData.UserId}&bankAccountVerifier=2`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Bank Account List for Property Details');
    }


    getPropertySettingModel(propertyId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getPropertySettings_get;
        const url = `${BASE_URL}${apiEndPoint.url}?propertyId=${propertyId}&isForCreate=true`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Property Setting Model');
    }


    savePropertyBankSettings(payload) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.savePropertySettings_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, payload, apiEndPoint, 'Save Property Bank Settings');
    }

    getAllPropertyUnitList() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getAllUnitList_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const payload = poPropertiesRequestPayload.getPropertyUnitRequestPayload({ OrganizationId: this.data.userInternalData.OrganizationId });
        return this._makePostRequest(url, payload, apiEndPoint, 'Get All Property Unit List');
    }


    // getAllPropertyInfo() {
    //     const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getAllPropertyInfo_post;
    //     const url = `${BASE_URL}${apiEndPoint.url}`;
    //     const payload = poPropertiesRequestPayload.getAllPropertyInfoRequestPayload();
    //     return this._makePostRequest(url, payload, apiEndPoint, "Get All Property Info");
    // }


    getPropertyShortViewModelForSummary(propertyId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getPropertyShortViewModelForSummary_get;
        const url =
            `${BASE_URL}${apiEndPoint.url}` +
            `?propertyId=${propertyId}&listingId=0&rentalRequestId=0&isSmartMoveListing=undefined&isForCreate=undefined`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Property Short View Model For Summary');
    }


    getRenterInsuranceStatus() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getRenterInsuranceStatus_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Renter Insurance Status');
    }


    getRentDueOnTypes() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getRentDueOnTypes_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Rent Due On Types');
    }


    smartMoveUnitByPropertyId(propertyId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.smartMoveUnitByPropertyId_get;
        const url = `${BASE_URL}${apiEndPoint.url}?propertyId=${propertyId}&IsSmartMoveActive=true`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Smart Move Unit By Property Id');
    }



    getListingByPropertyUnitId(propertyUnitId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getListingByPropertyUnitId_get;
        const url =
            `${BASE_URL}${apiEndPoint.url}` + `?propertyUnitId=${propertyUnitId}&IsSmartMoveUnit=false&applicantId=0&listingId=0&isRenew=false`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Listing By Property Unit Id');
    }


    getTermForUnitByListingId({ unitId, listingId, isSmartMoveTerm, applicantId }) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getTermForUnitByListingId_get;
        const url =
            `${BASE_URL}${apiEndPoint.url}` +
            `?unitId=${unitId}&listingId=${listingId}&isSmartMoveTerm=${isSmartMoveTerm}&applicantId=${applicantId}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Term For Unit By Listing Id');
    }


    validateProceedToLeaseTerm(payload) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.validateProceedToLeaseTerm_post;
        let updatedLeaseObject = poPropertiesRequestPayload.updateJsonForValidateTermRequest_m2m(payload);
        const headers = this._createHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.post(`${BASE_URL}${apiEndPoint.url}`, updatedLeaseObject, headers, tags);
        if (response.status !== apiEndPoint.status) {
            console.log(`Failed to validate proceed to lease term: ${response.status}`);
        }
        check(response, {
            'Validate Proceed To Lease Term api status is 200': (r) => r.status === apiEndPoint.status,
            'Validate Proceed To Lease Term api response body is not empty': (r) => r.body && r.body.length > 0,
        });
        addResponseTimeToTrend(this.trends, apiEndPoint.name, response);
        expect(response).to.have.validJsonBody();


        return updatedLeaseObject;
    }


    saveLeaseTerm(payload, propertyObj) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.saveLeaseTerm_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        let leaseTermObject = poPropertiesRequestPayload.updateSaveLeaseTermRequestJson(payload, propertyObj);
        return this._makePostRequest(url, leaseTermObject, apiEndPoint, 'Save Lease Term');
    }


    validateSmartMoveSettings() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.validateSmartMoveSettings_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Validate Smart Move Settings');
    }


    isTenantNameValidationEnabled() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.isTenantNameValidationEnabled_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Is Tenant Name Validation Enabled');
    }


    getShortPropertyUnitModelByListingId({ listingId, isSmartMoveListing = true, applicantId = 0 }) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getShortPropertyUnitModelByListingId_get;
        const url = `${BASE_URL}${apiEndPoint.url}` + `?listingId=${listingId}&isSmartMoveListing=${isSmartMoveListing}&applicantId=${applicantId}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get Short Property Unit Model By Listing Id');
    }


    getBlackListedDomains() {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getBlackListedDomains_get;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequest(url, apiEndPoint, 'Get BlackListed Domains');
    }

    addTenant(payload, tenantRandomData, propertyObject) {
        let tenantDataJson = {
            tenantFirstName: '',
            tenantLastName: '',
            tenantEmail: '',
            rentalRequestId: '',
            tenantPhoneNumber: '',
        };
        let inputJson = poPropertiesRequestPayload.addTenantDetailRequestJson(payload, tenantRandomData, propertyObject);
        let parsedInputJson = JSON.parse(inputJson);
        //parsedInputJson = JSON.parse(inputJson); // we are parsing the json here because we need to update some of the values in the json before sending the request
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.addTenant_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        const headers = this._createHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.post(url, inputJson, headers, tags);


        // console.log(`Response for addTenant: ${response.body}`);
        if (response.status !== apiEndPoint.status) {
            console.log(`Failed to add tenant: ${response.status}`);
        }
        check(response, {
            'Add Tenant api status is 200': (r) => r.status === apiEndPoint.status,
            'Add Tenant api response body is not empty': (r) => r.body && r.body.length > 0,
        });
        addResponseTimeToTrend(this.trends, apiEndPoint.name, response);
        expect(response).to.have.validJsonBody();
        const body = JSON.parse(response.body);
        // console.log('Add Tenant Response Json :: ', body);
        expect(body.ModelValidation.IsValid).to.equal(true);
        expect(body.Message.Message).to.equal('Request succeeded successfully.');
        expect(body.Message.MessageType).to.equal(1);
        expect(body).to.have.property('Data');
        expect(body.Data).to.be.a('number');
        tenantDataJson.rentalRequestId = body.Data;
        tenantDataJson.tenantFirstName = parsedInputJson.TenantList[0].FirstName;
        tenantDataJson.tenantLastName = parsedInputJson.TenantList[0].LastName;
        tenantDataJson.tenantEmail = parsedInputJson.TenantList[0].Email;
        tenantDataJson.tenantPhoneNumber = parsedInputJson.TenantList[0].Phone.AreaCode + parsedInputJson.TenantList[0].Phone.Number;
        return tenantDataJson;
    }


    getRenterInsuranceViewModel(rentalRequestId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getRenterInsuranceViewModel_get;
        const url = `${BASE_URL}${apiEndPoint.url}?rentalRequestId=${rentalRequestId}`;
        return this._makeGetRequest(url,apiEndPoint, 'Get Renter Insurance View Model');
    }


    saveRenterInsuranceForLease(payload) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.saveRenterInsuranceForLease_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, payload, apiEndPoint, 'Save Renter Insurance For Lease');
    }


    getLeaseToIssue(rentalRequestId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.getLeaseToIssue_get;
        const url = `${BASE_URL}${apiEndPoint.url}` + `?rentalRequestId=${rentalRequestId}`;
        return this._makeGetRequest(url,apiEndPoint, 'Get Lease To Issue');
    }


    issueLease(payload) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.issueLease_post;
        payload.LeaseSigningTypeId = 69;
        const headers = this._createHeaders();
        const tags = this._createTags(apiEndPoint);


        const response = HttpsMethods.post(`${BASE_URL}${apiEndPoint.url}`, JSON.stringify(payload), headers, tags);


        if (response.status !== apiEndPoint.status) {
            console.log(`Failed to issue lease: ${response.status}`);
        }
        check(response, {
            'Issue Lease api status is 200': (r) => r.status === apiEndPoint.status,
            'Issue Lease api response body is not empty': (r) => r.body && r.body.length > 0,
        });
        addResponseTimeToTrend(this.trends, apiEndPoint.name, response);
        expect(response).to.have.validJsonBody();
        return JSON.parse(response.body);
    }



    createNewProperty(newPropertyJsonModel, propertyTagListResponseArray = [], stateJson, propertyDataArray) {
        const apiEndPoint = poPropertiesApiEndPoints.po.properties.v2.createNewProperty.createNewProperty_post;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        let requestpayload = poPropertiesRequestPayload.createNewPropertyDetailSchema(
            newPropertyJsonModel,
            propertyTagListResponseArray,
            stateJson,
            this.data.userInternalData,
            propertyDataArray,
        );
        return this._makePostRequest(url, requestpayload, apiEndPoint, 'Create New Property');
    }







    //property details endpoints
    getUnitDetailLease(unitId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getUnitDetail_lease_get;
        const url = `${BASE_URL}${apiEndPoint.url(unitId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Unit Detail Lease');
    }


    getUnitDetailPendingLease(unitId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getUnitDetail_pendingLease_get;
        const url = `${BASE_URL}${apiEndPoint.url(unitId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Unit Detail Pending Lease');
    }


    getUnitDetailSummary(unitId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getUnitDetail_summary_get;
        const url = `${BASE_URL}${apiEndPoint.url(unitId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Unit Detail Summary');
    }


    getMaintenanceDetailBasedOnPropertyIdAndUnitId(propertyObject) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getMaintenanceDetailBasedOnPropertyIdAndUnitId_get;
        const url = `${BASE_URL}${apiEndPoint.url(propertyObject.propertyId, propertyObject.propertyUnitId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Maintenance Detail Based On Property Id And Unit Id');
    }


    getUnitDetailUnitList(propertyId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getUnitDetail_unitList_get;
        const url = `${BASE_URL}${apiEndPoint.url(propertyId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Unit Detail Unit List');
    }


    getRentCollected(leaseGuid) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getRentCollected_get;
        const url = `${BASE_URL}${apiEndPoint.url(leaseGuid)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Rent Collected');
    }


    getOverdueAmount(leaseGuid) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getOverdueAmount_get;
        const url = `${BASE_URL}${apiEndPoint.url(leaseGuid)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Overdue Amount');
    }


    getPropertyUnitStatics(propertyObject) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.propertyunitStatics_post;
        let payload = {
            LeaseUid: propertyObject.leaseGuid,
            DateFrom: dateUtils.getFirstDateOfCurrentMonth_yyyy_mm_dd(),
            DateTo: dateUtils.getLastDateOfCurrentMonth_yyyy_mm_dd(),
        };
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makePostRequest(url, JSON.stringify(payload), apiEndPoint, 'Get Property Unit Statics');
    }


    getUnitDetailTenantList(leaseId) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getUnitDetail_tenantList_get;
        const url = `${BASE_URL}${apiEndPoint.url(leaseId)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Unit Detail Tenant List');
    }


    getMakeSuggestions() {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getMakeSuggestions;
        const url = `${BASE_URL}${apiEndPoint.url}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Make Suggestions');
    }


    getDamageReportStatus(leaseGuid) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getDamageReportStatus_get;
        const url = `${BASE_URL}${apiEndPoint.url(leaseGuid)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Damage Report Status');
    }


    getInvoiceDetail(propertyObject) {
        const endPoint = poPropertiesApiEndPoints.po.propertyDetails.getInvoiceDetail_get;
        const url = `${BASE_URL}${endPoint.url(propertyObject.propertyId, propertyObject.leaseGuid)}`;
        return this._makeGetRequestWithUrl(endPoint, url, 'Get Invoice Detail');
    }


    getUnitTenantListByLeaseId(leaseGuid) {
        const apiEndPoint = poPropertiesApiEndPoints.po.propertyDetails.getUnitTenantListByLeaseId_get;
        const url = `${BASE_URL}${apiEndPoint.url(leaseGuid)}`;
        return this._makeGetRequestWithUrl(apiEndPoint, url, 'Get Unit Tenant List By Lease Id');
    }


    deleteProperty(propertyId) {
        const endPoint = poPropertiesApiEndPoints.po.propertyDetails.queueForPropertyDeleteById;
        const headers = this._createHeaders();
        const tags = this._createTags(endPoint);
        const response = HttpsMethods.post(`${BASE_URL}${endPoint.url}?propertyId=${propertyId}`, JSON.stringify({}), headers, tags);
        if (response.status !== endPoint.status) {
            console.log(`Failed to delete property: ${response.status} --> ${response.body}`);
        }
        check(response, {
            'Delete Property api status is 200': (r) => r.status === 200,
            'Delete Property api response body is not empty': (r) => r.body && r.body.length > 0,
        });
        addResponseTimeToTrend(this.trends, endPoint.name, response);
        expect(response).to.have.validJsonBody();
        return JSON.parse(response.body);
    }


    archiveProperty(payload) {
        const endPoint = poPropertiesApiEndPoints.po.propertyDetails.archiveProperty_post;
        const url = `${BASE_URL}${endPoint.url}`;
        return this._makePostRequest(url, payload, endPoint, 'Archive Property');
    }


    confirmDeleteOrArchive(propertyId, propertyUnitId = 0, listingUid = null) {
        const endPoint = poPropertiesApiEndPoints.po.propertyDetails.confirmDeleteOrArchive;
        const url = `${BASE_URL}${endPoint.url}?propertyId=${propertyId}&propertyUnitId=${propertyUnitId}&listingUid=${listingUid}`;
        return this._makeGetRequestWithUrl(endPoint, url, 'Confirm Delete Or Archive');
    }



}


export default new poPropertiesApis();
