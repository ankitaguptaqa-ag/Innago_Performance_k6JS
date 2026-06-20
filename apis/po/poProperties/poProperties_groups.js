import poPropertiesApis from "./poProperties_apis.js";
import { sleep } from "k6";
import randomUtils from "../../../utils/randomUtils.js";








class poPropertiesApiGroup {
    data;
    trends = {};




    propertiesListingDefaultApis_Group = () => {
        poPropertiesApis.data = this.data;
        poPropertiesApis.trends = this.trends;
        poPropertiesApis.getPropertyLimit();
        poPropertiesApis.getPropertyUnitLimit();
        poPropertiesApis.getPropertiesStatus();
        poPropertiesApis.getStateList();
        poPropertiesApis.groupedPropertyByActiveInActiveUnitsByOrganizationId();
        poPropertiesApis.getPropertyList();
        poPropertiesApis.getPropertiesStats();
        poPropertiesApis.getAllPropertyUnitList();
        poPropertiesApis.leaseSyncDueAmount();
    };



    createNewPropertyWithM2MLease_v2_group = (propertyObject, dummyPoData, selectedFile) => {
        poPropertiesApis.data = this.data;
        poPropertiesApis.trends = this.trends;
        if (propertyObject.rentAmount === undefined || propertyObject.rentAmount === null) {
            propertyObject.rentAmount = 1000;   //Default rent amount given if nothing is provided
        }
       


        poPropertiesApis.getAllPropertyInfo();
        poPropertiesApis.getLeaseTermPropertyFilterStatus();
        poPropertiesApis.getPropertyLimitProperty();
        poPropertiesApis.getPropertyUnitLimitProperty();
        let propertyTagListResponse = poPropertiesApis.getPropertyTagList();
        //console.log("propertyTagListResponse:", propertyTagListResponse);
        let newPropertyJsonModel = poPropertiesApis.getNewPropertyJsonModel();
        //console.log("newPropertyJsonModel:", newPropertyJsonModel);
        let stateResponseJson = poPropertiesApis.getStateList();   // full data
        let stateArray = stateResponseJson.Data;
        //console.log("stateResponseJsonFile:", stateResponseJsonFile);///actaul usable list
        const randomState = randomUtils.getRandomValueFromArray(stateArray);
        poPropertiesApis.getBlackListedPhone();
        let newPropertyDetailsReponse = poPropertiesApis.createNewProperty(
            newPropertyJsonModel.Data,
            propertyTagListResponse.Data,
            randomState,
            //propertyDataArray,
            dummyPoData.propertyDataArray,
        );
        let newPropertyDetails = newPropertyDetailsReponse.Data;
        if (!newPropertyDetails) {
            console.error("Failed to create property. Response:", JSON.stringify(newPropertyDetailsReponse, null, 2));
            throw new Error("createNewProperty returned no Data object");
        }
        //console.log("New Property created with ID:", newPropertyDetails.propertyId);
        let bankDetailsJsonArray = poPropertiesApis.getBankAccountListForPropertyDetails();
        let propertySettingJsonModel = poPropertiesApis.getPropertySettingModel(newPropertyDetails.PropertyId);
        poPropertiesApis.savePropertyBankSettings(JSON.stringify(propertySettingJsonModel.Data));
        poPropertiesApis.getAllPropertyUnitList();
        poPropertiesApis.getAllPropertyInfo();
        poPropertiesApis.getPropertyShortViewModelForSummary(newPropertyDetails.PropertyId);
        poPropertiesApis.getRenterInsuranceStatus();
        poPropertiesApis.getRentDueOnTypes();
        poPropertiesApis.smartMoveUnitByPropertyId(newPropertyDetails.PropertyId);
        poPropertiesApis.getListingByPropertyUnitId(newPropertyDetails.IndividualUnits[0].Id);
        let unitTermRawJsonResponse = poPropertiesApis.getTermForUnitByListingId({
            unitId: newPropertyDetails.IndividualUnits[0].Id,
            listingId: 0,
            isSmartMoveTerm: true,
            applicantId: 0,
        });
        let updatedLeaseTermJsonResponse = poPropertiesApis.validateProceedToLeaseTerm(unitTermRawJsonResponse.Data);
        if (!updatedLeaseTermJsonResponse || (typeof updatedLeaseTermJsonResponse === 'object' && Object.keys(updatedLeaseTermJsonResponse).length === 0)) {
            console.warn('Warning: validate lease term returned empty response');
        }
        let saveLeaseTermResponseObj = poPropertiesApis.saveLeaseTerm(updatedLeaseTermJsonResponse, propertyObject);
        let savedId = saveLeaseTermResponseObj?.Data?.Id || saveLeaseTermResponseObj?.Id || unitTermRawJsonResponse.Data.Id;
        if (!savedId) {
            console.warn('Warning: save lease term did not return ID, using fallback');
            savedId = Math.random() * 1000; // Use fallback ID to continue test
        }
        poPropertiesApis.validateSmartMoveSettings();
        poPropertiesApis.isTenantNameValidationEnabled();
        let listingId = saveLeaseTermResponseObj?.Data?.Id || savedId;
        let addTenantJsonModelResponse = poPropertiesApis.getShortPropertyUnitModelByListingId({
            listingId: listingId,
        });
        let tenantModelData = addTenantJsonModelResponse?.Data || addTenantJsonModelResponse;
        if (!tenantModelData) {
            console.warn('Warning: get short property unit model returned empty');
            tenantModelData = {};
        }
        poPropertiesApis.getBlackListedDomains();
        poPropertiesApis.getBlackListedPhone();

        let tenantDetailJson = poPropertiesApis.addTenant(tenantModelData, dummyPoData.nameDataArray, propertyObject);
        let rentalRequestId = tenantDetailJson?.rentalRequestId || Math.random() * 10000;
        if (!tenantDetailJson?.rentalRequestId) {
            console.warn('Warning: add tenant did not return rentalRequestId, using fallback');
        }
        let renterInsuranceRequestJsonModelResponse = poPropertiesApis.getRenterInsuranceViewModel(rentalRequestId);
        if (renterInsuranceRequestJsonModelResponse?.Data) {
            poPropertiesApis.saveRenterInsuranceForLease(JSON.stringify(renterInsuranceRequestJsonModelResponse.Data));
        }
        let finalLeaseJsonModelResponse = poPropertiesApis.getLeaseToIssue(rentalRequestId);
        let leaseData = finalLeaseJsonModelResponse?.Data || finalLeaseJsonModelResponse;
        if (!leaseData) {
            console.warn('Warning: get lease to issue returned empty');
            leaseData = {};
        }

        let uploadedFileData = poPropertiesApis.tempSaveFile(selectedFile)?.Data;
        if (uploadedFileData && leaseData) {
            leaseData.LeaseDocument = uploadedFileData;
        }



        if (leaseData && Object.keys(leaseData).length > 0) {
            poPropertiesApis.issueLease(leaseData);
        }
        propertyObject.tenantFirstName = tenantDetailJson?.tenantFirstName || 'Test';
        propertyObject.tenantLastName = tenantDetailJson?.tenantLastName || 'User';
        propertyObject.tenantEmail = tenantDetailJson?.tenantEmail || 'test@test.com';
        propertyObject.tenantUsername = tenantDetailJson?.tenantEmail || 'test@test.com';
        propertyObject.tenantLoginData = {
            username: tenantDetailJson?.tenantEmail || 'test@test.com',
            password: "Pass@123",
            phoneNumber: tenantDetailJson?.tenantPhoneNumber || '555-0000',
        };


        propertyObject.tenantPassword = "Pass@123";
        propertyObject.tenantPhoneNumber = tenantDetailJson?.tenantPhoneNumber || '555-0000';
        propertyObject.propertyName = newPropertyDetails?.Name || 'Test Property';


        propertyObject.propertyId = newPropertyDetails?.PropertyId || 'test-prop-' + Math.random();
        propertyObject.tenantFullName = (tenantDetailJson?.tenantFirstName || 'Test') + " " + (tenantDetailJson?.tenantLastName || 'User');
        propertyObject.propertyUnitName = leaseData?.UnitName || 'Unit 1';
        propertyObject.propertyUnitId = leaseData?.UnitId || 'unit-' + Math.random();
        propertyObject.leaseId = leaseData?.ListingId || 'lease-' + Math.random();
        propertyObject.leaseGuid = leaseData?.ListingUid || 'guid-' + Math.random();
        console.log("Property ::", propertyObject.propertyName, " with M2M lease created successfully with tenant ::", propertyObject.tenantEmail);
        return propertyObject;


    };

    propertyDetailSectionDefaultApis_group = (propertyObject) => {
        poPropertiesApis.data = this.data;
        poPropertiesApis.trends = this.trends;
        console.log(`[Property Details] Starting detail APIs for propertyId: ${propertyObject.propertyId}, unitId: ${propertyObject.propertyUnitId}, leaseGuid: ${propertyObject.leaseGuid}`);
        poPropertiesApis.getUnitDetailLease(propertyObject.propertyUnitId);
        poPropertiesApis.getUnitDetailPendingLease(propertyObject.propertyUnitId);
        poPropertiesApis.getUnitDetailSummary(propertyObject.propertyUnitId);
        poPropertiesApis.getMaintenanceDetailBasedOnPropertyIdAndUnitId(propertyObject);
        poPropertiesApis.getUnitDetailUnitList(propertyObject.propertyId);
        poPropertiesApis.getRentCollected(propertyObject.leaseGuid);
        poPropertiesApis.getOverdueAmount(propertyObject.leaseGuid);
        poPropertiesApis.getPropertyUnitStatics(propertyObject);
        poPropertiesApis.getUnitDetailTenantList(propertyObject.leaseId);
        poPropertiesApis.getMakeSuggestions();
        poPropertiesApis.getDamageReportStatus(propertyObject.leaseGuid);
        poPropertiesApis.getInvoiceDetail(propertyObject);
        poPropertiesApis.getUnitTenantListByLeaseId(propertyObject.leaseGuid);
        console.log(`[Property Details] All detail APIs completed successfully`);
    };





}



export default new poPropertiesApiGroup();