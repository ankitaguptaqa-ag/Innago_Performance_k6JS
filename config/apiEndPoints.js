class ApiEndpoints {
    auth0 = {
        oAuthToken: {
            url: "/oauth/token",
            name: "oAuthToken",
            status: 200,
            methodType: "POST",
        },
    };
    login = {
        connect_token: {
            url: "/identity/connect/token",
            name: "connectToken",
            status: 200,
            methodType: "POST",
        },

        user_identity: {
            url: "/api/users/identity",
            name: "UserIdentity",
            status: 200,
            methodType: "GET",
        },
    };
    poDashboard = {
        getMaintenanceDetailOnDashboard: {
            url: "/maintenancems/v1/maintenance/request/detail/dashboard",
            name: "dashboard_getMaintenanceDetail",
            status: 200,
            methodType: "GET",
        },
        getPropertyOwnerUnsignedLeaseListModel: {
            url: "/api/PropertyOwner/Dashboard/GetPropertyOwnerUnsignedLeaseListModel",
            name: "dashboard_getUnsignedLeaseListModel",
            status: 200,
            methodType: "GET",
        },
        getPropertyOwnerListingStatsModel: {
            url: "/api/PropertyOwner/Dashboard/GetPropertyOwnerListingStatsModel",
            name: "dashboard_getListingStatsModel",
            status: 200,
            methodType: "GET",
        },
        getApplicationListByPropertyOwnerId: {
            url: "/api/PropertyOwner/Dashboard/GetApplicationListByPropertyOwnerId",
            name: "dashboard_getApplicationList",
            status: 200,
            methodType: "POST",
        },
        unverifiedBankAccount: {
            url: "/api/bank/microDeposit-verification/unverified-bankacccount",
            name: "dashboard_getUnverifiedBankAccount",
            status: 200,
            methodType: "GET",
        },
        getAdvertisements: {
            url: "/api/property-owner/advertisements",
            name: "dashboard_getAdvertisements",
            status: 200,
            methodType: "GET",
        },
        dashboardReferralModel: {
            url: "/api/PropertyOwner/Dashboard/GetDashboardReferralModel",
            name: "dashboard_getReferralModel",
            status: 200,
            methodType: "GET",
        },
        outstandingInvoices: {
            url: "/api/property-owner/dashboard/outstanding-invoice?allTime=false",
            name: "dashboard_getOutstandingInvoices",
            status: 200,
            methodType: "GET",
        },
        getShowByMonths: {
            url: "/api/Home/DropDown/GetShowByMonths",
            name: "dashboard_getShowByMonths",
            status: 200,
            methodType: "GET",
        },
        getPendingBank: {
            url: "/api/bank/getpendingbank",
            name: "dashboard_getPendingBank",
            status: 200,
            methodType: "GET",
        },
        getPropertyOwnerStatus: {
            url: "/api/PropertyOwner/PropertyOwner/status",
            name: "dashboard_getPropertyOwnerStatus",
            status: 200,
            methodType: "GET",
        },
        getInvoiceStats: {
            url: "/api/property-owner/dashboard/invoice-stats",
            name: "dashboard_getInvoiceStats",
            status: 200,
            methodType: "POST",
        },
    };
    poPropertyListing = {
        getPropertyLimit: { url: '/api/Property/PropertyValidation/GetPropertyLimit', name: 'property_listing_getPropertyLimit', status: 200, methodType: 'GET' },
        getPropertyUnitLimit: { url: '/api/Property/PropertyUnitValidation/GetPropertyUnitLimit', name: 'property_listing_getPropertyUnitLimit', status: 200, methodType: 'GET' },
        getPropertiesStatus: { url: '/api/Home/DropDown/GetPropertyStatus', name: 'property_listing_getPropertiesStatus', status: 200, methodType: 'GET' },
        getStateList: { url: '/public/Home/DropDown/State', name: 'property_listing_getStateList', status: 200, methodType: 'GET' },
        getGroupedProperties: { url: '/api/Home/DropDown/GroupedPropertyByActiveInActiveUnitsByOrganizationId', name: 'property_listing_getGroupedProperties', status: 200, methodType: 'GET' },
        getPropertiesList: { url: '/propertyms/properties/list', name: 'property_listing_getPropertiesList', status: 200, methodType: 'POST' },
        getStats: { url: '/propertyms/properties/stats', name: 'property_listing_getStats', status: 200, methodType: 'POST' },
        syncDueAmount: { url: '/propertyms/Lease/sync-dueamount', name: 'property_listing_syncDueAmount', status: 200, methodType: 'POST' },
        getAllUnitList: { url: '/api/Property/Unit', name: 'property_listing_getAllUnitList', status: 200, methodType: 'POST' },
    };
    poPropertyCreate = {
        getAllPropertyInfo: { url: '/api/Property/PropertyList/GetAllPropertyInfo', name: 'property_create_getAllPropertyInfo', status: 200, methodType: 'POST' },
        getLeaseTermFilterStatus: { url: '/api/Home/DropDown/GetLeaseTermPropertyFilterStatus', name: 'property_create_getLeaseTermFilterStatus', status: 200, methodType: 'GET' },
        getPropertyLimit: { url: '/api/Property/PropertyValidation/GetPropertyLimit', name: 'property_create_getPropertyLimit', status: 200, methodType: 'GET' },
        getPropertyUnitLimit: { url: '/api/Property/PropertyUnitValidation/GetPropertyUnitLimit', name: 'property_create_getPropertyUnitLimit', status: 200, methodType: 'GET' },
        getPropertyTagList: { url: '/api/Property/Tag/List', name: 'property_create_getPropertyTagList', status: 200, methodType: 'GET' },
        getStateList: { url: '/public/Home/DropDown/State', name: 'property_create_getStateList', status: 200, methodType: 'GET' },
        getNewPropertyModel: { url: '/api/property/edit/GetProperty?propertyId=0&isForCreate=true', name: 'property_create_getNewPropertyModel', status: 200, methodType: 'GET' },
        getBlackListedPhone: { url: '/public/FraudDetection/DomainValidation/GetBlackListedPhone', name: 'property_create_getBlackListedPhone', status: 200, methodType: 'GET' },
        getLateFees: { url: '/api/PropertyOwner/PropertyOwnerSetting/GetLateFees', name: 'property_create_getLateFees', status: 200, methodType: 'POST' },
        createNewProperty: { url: '/api/property/edit/Post', name: 'property_create_createNewProperty', status: 200, methodType: 'POST' },
        getBankAccountList: { url: '/api/Home/DropDown/GetBankAccountListForPropertyDetail', name: 'property_create_getBankAccountList', status: 200, methodType: 'GET' },
        getPropertySettings: { url: '/api/property/edit/GetPropertySettings', name: 'property_create_getPropertySettings', status: 200, methodType: 'GET' },
        savePropertySettings: { url: '/api/property/edit/SavePropertySettings', name: 'property_create_savePropertySettings', status: 200, methodType: 'POST' },
        getAllUnitList: { url: '/api/Property/Unit', name: 'property_create_getAllUnitList', status: 200, methodType: 'POST' },
        getPropertySummary: { url: '/api/Property/Property/GetPropertyShortViewModelForSummary', name: 'property_create_getPropertySummary', status: 200, methodType: 'GET' },
        getRenterInsuranceStatus: { url: '/api/Property/LeaseRenterInsurance/GetRenterInsuranceStatus', name: 'property_create_getRenterInsuranceStatus', status: 200, methodType: 'GET' },
        getRentDueOnTypes: { url: '/api/Home/DropDown/GetRentDueOnTypes', name: 'property_create_getRentDueOnTypes', status: 200, methodType: 'GET' },
        getSmartMoveUnit: { url: '/api/Home/DropDown/SmartMoveUnitByPropertyId', name: 'property_create_getSmartMoveUnit', status: 200, methodType: 'GET' },
        getListingByUnitId: { url: '/api/Home/DropDown/GetListingByPropertyUnitId', name: 'property_create_getListingByUnitId', status: 200, methodType: 'GET' },
        getTermForUnit: { url: '/api/Property/PropertyLeaseGet/GetTermForUnitByListingId', name: 'property_create_getTermForUnit', status: 200, methodType: 'GET' },
        validateLeaseTerm: { url: '/api/propertyowner/AddTenant/ValidateProceedToLeaseTerm', name: 'property_create_validateLeaseTerm', status: 200, methodType: 'POST' },
        saveLeaseTerm: { url: '/api/Property/PropertyLeaseTerm/SaveUnitTerm', name: 'property_create_saveLeaseTerm', status: 200, methodType: 'POST' },
        validateSmartMoveSettings: { url: '/api/Property/Property/ValidateSmartMoveSettings', name: 'property_create_validateSmartMoveSettings', status: 200, methodType: 'GET' },
        isTenantNameValidationEnabled: { url: '/api/Tenant/TenantValidation/IsTenantNameValidationEnabled', name: 'property_create_isTenantNameValidationEnabled', status: 200, methodType: 'GET' },
        getShortPropertyUnitModel: { url: '/api/Property/LeaseTenant/GetShortPropertyUnitModelByListingId', name: 'property_create_getShortPropertyUnitModel', status: 200, methodType: 'GET' },
        getBlackListedDomains: { url: '/api/public/FraudDetection/DomainValidation/GetBlackListedDomains', name: 'property_create_getBlackListedDomains', status: 200, methodType: 'GET' },
        addTenant: { url: '/api/property/LeaseTenant/SaveForSingleUnit', name: 'property_create_addTenant', status: 200, methodType: 'POST' },
        getRenterInsuranceViewModel: { url: '/api/Property/LeaseRenterInsurance/GetRenterInsuranceViewModel', name: 'property_create_getRenterInsuranceViewModel', status: 200, methodType: 'GET' },
        saveRenterInsurance: { url: '/api/Property/LeaseRenterInsurance/SaveRenterInsuranceForLease', name: 'property_create_saveRenterInsurance', status: 200, methodType: 'POST' },
        getLeaseToIssue: { url: '/api/Property/Lease/GetLeaseToIssue', name: 'property_create_getLeaseToIssue', status: 200, methodType: 'GET' },
        getLeaseTemplateShortList: { url: '/Lease/Property/LeaseTemplate/ShortList', name: 'property_create_getLeaseTemplateShortList', status: 200, methodType: 'GET' },
        issueLease: { url: '/api/Property/Lease/IssueLease', name: 'property_create_issueLease', status: 200, methodType: 'POST' },
    };
}


export default new ApiEndpoints();

