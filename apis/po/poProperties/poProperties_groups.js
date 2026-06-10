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



    createNewPropertyWithM2MLease_v2_group = (propertyObject, dummyPoData) => {
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
        // const lateFees = poPropertiesApis.getLateFees();   // not able to solve this issue over thus
        // //const lateFees = await poPropertiesApis.getLateFees();


        // console.log("Late Fees Status:", lateFees.status);
        // console.log("Late Fees Body:", lateFees.body);
       
        //const propertyDataArray = dummyPoData?.propertyDataArray;
        // if (!Array.isArray(propertyDataArray) || propertyDataArray.length === 0) {
        //     throw new Error("dummyPoData.propertyDataArray is required and must be a non-empty array");
        // }
        //console.log("propertyTagListResponse:", propertyTagListResponse);


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
        let saveLeaseTermResponseObj = poPropertiesApis.saveLeaseTerm(updatedLeaseTermJsonResponse, propertyObject);
        poPropertiesApis.validateSmartMoveSettings();
        poPropertiesApis.isTenantNameValidationEnabled();
        let addTenantJsonModelResponse = poPropertiesApis.getShortPropertyUnitModelByListingId({
            listingId: saveLeaseTermResponseObj.Data.Id,
        });
        poPropertiesApis.getBlackListedDomains();
        poPropertiesApis.getBlackListedPhone();


        let tenantDetailJson = poPropertiesApis.addTenant(addTenantJsonModelResponse.Data, dummyPoData.nameDataArray, propertyObject);
        let renterInsuranceRequestJsonModelResponse = poPropertiesApis.getRenterInsuranceViewModel(tenantDetailJson.rentalRequestId);
        poPropertiesApis.saveRenterInsuranceForLease(JSON.stringify(renterInsuranceRequestJsonModelResponse.Data));
        let finalLeaseJsonModelResponse = poPropertiesApis.getLeaseToIssue(tenantDetailJson.rentalRequestId);


        poPropertiesApis.issueLease(finalLeaseJsonModelResponse.Data);
        propertyObject.tenantFirstName = tenantDetailJson.tenantFirstName;
        propertyObject.tenantLastName = tenantDetailJson.tenantLastName;
        propertyObject.tenantEmail = tenantDetailJson.tenantEmail;
        propertyObject.tenantUsername = tenantDetailJson.tenantEmail;
        propertyObject.tenantLoginData = {
            username: tenantDetailJson.tenantEmail,
            password: "Pass@123",
            phoneNumber: tenantDetailJson.tenantPhoneNumber,
        };


        propertyObject.tenantPassword = "Pass@123";
        propertyObject.tenantPhoneNumber = tenantDetailJson.tenantPhoneNumber;
        propertyObject.propertyName = newPropertyDetails.Name;


        propertyObject.propertyId = newPropertyDetails.PropertyId;
        propertyObject.tenantFullName = tenantDetailJson.tenantFirstName + " " + tenantDetailJson.tenantLastName;
        propertyObject.propertyUnitName = finalLeaseJsonModelResponse.Data.UnitName;
        propertyObject.propertyUnitId = finalLeaseJsonModelResponse.Data.UnitId;
        propertyObject.leaseId = finalLeaseJsonModelResponse.Data.ListingId;
        propertyObject.leaseGuid = finalLeaseJsonModelResponse.Data.ListingUid;
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