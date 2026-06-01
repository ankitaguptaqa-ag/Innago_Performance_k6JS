class poPropertiesApiEndPoints {
    po = {
        properties: {
            propertyListing: {
                getPropertyLimit_get: {
                    url: '/api/Property/PropertyValidation/GetPropertyLimit',
                    name: 'property_listing_getPropertyLimit',
                    status: 200,
                    methodType: 'GET',
                },
                getPropertyUnitLimit_get: {
                    url: '/api/Property/PropertyUnitValidation/GetPropertyUnitLimit',
                    name: 'property_listing_getPropertyUnitLimit',
                    status: 200,
                    methodType: 'GET',
                },
                getPropertiesStatus_get: {
                    url: '/api/Home/DropDown/GetPropertyStatus',
                    name: 'property_listing_getPropertiesStatus',
                    status: 200,
                    methodType: 'GET',
                },
                getStateList_get: {
                    url: '/public/Home/DropDown/State',
                    name: 'property_listing_getStateList',
                    status: 200,
                    methodType: 'GET',
                },
                groupedPropertyByActiveInActiveUnits_get: {
                    url: '/api/Home/DropDown/GroupedPropertyByActiveInActiveUnitsByOrganizationId',
                    name: 'property_listing_getGroupedProperties',
                    status: 200,
                    methodType: 'GET',
                },
                getPropertiesList_post: {
                    url: '/propertyms/properties/list',
                    name: 'property_listing_getPropertiesList',
                    status: 200,
                    methodType: 'POST',
                },
                stats_post: {
                    url: '/propertyms/properties/stats',
                    name: 'property_listing_getStats',
                    status: 200,
                    methodType: 'POST',
                },
                syncDueAmount_post: {
                    url: '/propertyms/Lease/sync-dueamount',
                    name: 'property_listing_syncDueAmount',
                    status: 200,
                    methodType: 'POST',
                },
                getAllUnitList_post: {
                    url: '/api/Property/Unit',
                    name: 'property_listing_getAllUnitList',
                    status: 200,
                    methodType: 'POST',
                },
            },


            v2: {
                createNewProperty: {
                    getAllPropertyInfo_post: {
                        url: '/api/Property/PropertyList/GetAllPropertyInfo',
                        name: 'property_create_getAllPropertyInfo',
                        status: 200,
                        methodType: 'POST',
                    },
                    getLeaseTermPropertyFilterStatus_get: {
                        url: '/api/Home/DropDown/GetLeaseTermPropertyFilterStatus',
                        name: 'property_create_getLeaseTermFilterStatus',
                        status: 200,
                        methodType: 'GET',
                    },
                    getPropertyLimit_get: {
                        url: '/api/Property/PropertyValidation/GetPropertyLimit',
                        name: 'property_create_getPropertyLimit',
                        status: 200,
                        methodType: 'GET',
                    },
                    getPropertyUnitLimit_get: {
                        url: '/api/Property/PropertyUnitValidation/GetPropertyUnitLimit',
                        name: 'property_create_getPropertyUnitLimit',
                        status: 200,
                        methodType: 'GET',
                    },
                    getPropertyTagList_get: {
                        url: '/api/Property/Tag/List',
                        name: 'property_create_getPropertyTagList',
                        status: 200,
                        methodType: 'GET',
                    },
                    getStateList_get: {
                        url: '/public/Home/DropDown/State',
                        name: 'property_create_getStateList',
                        status: 200,
                        methodType: 'GET',
                    },
                    getNewPropertyModel_get: {
                        url: '/api/property/edit/GetProperty?propertyId=0&isForCreate=true',
                        name: 'property_create_getNewPropertyModel',
                        status: 200,
                        methodType: 'GET',
                    },
                    getBlackListedPhone_get: {
                        url: '/public/FraudDetection/DomainValidation/GetBlackListedPhone',
                        name: 'property_create_getBlackListedPhone',
                        status: 200,
                        methodType: 'GET',
                    },
                    getLateFees_post: {
                        url: '/api/PropertyOwner/PropertyOwnerSetting/GetLateFees',
                        name: 'property_create_getLateFees',
                        status: 200,
                        methodType: 'POST',
                    },
                    createNewProperty_post: {
                        url: '/api/property/edit/Post',
                        name: 'property_create_createNewProperty',
                        status: 200,
                        methodType: 'POST',
                    },
                    getBankAccountListForPropertyDetail_get: {
                        url: '/api/Home/DropDown/GetBankAccountListForPropertyDetail',
                        name: 'property_create_getBankAccountList',
                        status: 200,
                        methodType: 'GET',
                    },
                    getPropertySettings_get: {
                        url: '/api/property/edit/GetPropertySettings',
                        name: 'property_create_getPropertySettings',
                        status: 200,
                        methodType: 'GET',
                    },
                    savePropertySettings_post: {
                        url: '/api/property/edit/SavePropertySettings',
                        name: 'property_create_savePropertySettings',
                        status: 200,
                        methodType: 'POST',
                    },
                    getAllUnitList_post: {
                        url: '/api/Property/Unit',
                        name: 'property_create_getAllUnitList',
                        status: 200,
                        methodType: 'POST',
                    },
                    getPropertyShortViewModelForSummary_get: {
                        url: '/api/Property/Property/GetPropertyShortViewModelForSummary',
                        name: 'property_create_getPropertySummary',
                        status: 200,
                        methodType: 'GET',
                    },
                    getRenterInsuranceStatus_get: {
                        url: '/api/Property/LeaseRenterInsurance/GetRenterInsuranceStatus',
                        name: 'property_create_getRenterInsuranceStatus',
                        status: 200,
                        methodType: 'GET',
                    },
                    getRentDueOnTypes_get: {
                        url: '/api/Home/DropDown/GetRentDueOnTypes',
                        name: 'property_create_getRentDueOnTypes',
                        status: 200,
                        methodType: 'GET',
                    },
                    smartMoveUnitByPropertyId_get: {
                        url: '/api/Home/DropDown/SmartMoveUnitByPropertyId',
                        name: 'property_create_getSmartMoveUnit',
                        status: 200,
                        methodType: 'GET',
                    },
                    getListingByPropertyUnitId_get: {
                        url: '/api/Home/DropDown/GetListingByPropertyUnitId',
                        name: 'property_create_getListingByUnitId',
                        status: 200,
                        methodType: 'GET',
                    },
                    getTermForUnitByListingId_get: {
                        url: '/api/Property/PropertyLeaseGet/GetTermForUnitByListingId',
                        name: 'property_create_getTermForUnit',
                        status: 200,
                        methodType: 'GET',
                    },
                    validateProceedToLeaseTerm_post: {
                        url: '/api/propertyowner/AddTenant/ValidateProceedToLeaseTerm',
                        name: 'property_create_validateLeaseTerm',
                        status: 200,
                        methodType: 'POST',
                    },
                    saveLeaseTerm_post: {
                        url: '/api/Property/PropertyLeaseTerm/SaveUnitTerm',
                        name: 'property_create_saveLeaseTerm',
                        status: 200,
                        methodType: 'POST',
                    },
                    validateSmartMoveSettings_get: {
                        url: '/api/Property/Property/ValidateSmartMoveSettings',
                        name: 'property_create_validateSmartMoveSettings',
                        status: 200,
                        methodType: 'GET',
                    },
                    isTenantNameValidationEnabled_get: {
                        url: '/api/Tenant/TenantValidation/IsTenantNameValidationEnabled',
                        name: 'property_create_isTenantNameValidationEnabled',
                        status: 200,
                        methodType: 'GET',
                    },
                    getShortPropertyUnitModelByListingId_get: {
                        url: '/api/Property/LeaseTenant/GetShortPropertyUnitModelByListingId',
                        name: 'property_create_getShortPropertyUnitModel',
                        status: 200,
                        methodType: 'GET',
                    },
                    getBlackListedDomains_get: {
                        url: '/api/public/FraudDetection/DomainValidation/GetBlackListedDomains',
                        name: 'property_create_getBlackListedDomains',
                        status: 200,
                        methodType: 'GET',
                    },
                    addTenant_post: {
                        url: '/api/property/LeaseTenant/SaveForSingleUnit',
                        name: 'property_create_addTenant',
                        status: 200,
                        methodType: 'POST',
                    },
                    getRenterInsuranceViewModel_get: {
                        url: '/api/Property/LeaseRenterInsurance/GetRenterInsuranceViewModel',
                        name: 'property_create_getRenterInsuranceViewModel',
                        status: 200,
                        methodType: 'GET',
                    },
                    saveRenterInsuranceForLease_post: {
                        url: '/api/Property/LeaseRenterInsurance/SaveRenterInsuranceForLease',
                        name: 'property_create_saveRenterInsurance',
                        status: 200,
                        methodType: 'POST',
                    },
                    getLeaseToIssue_get: {
                        url: '/api/Property/Lease/GetLeaseToIssue',
                        name: 'property_create_getLeaseToIssue',
                        status: 200,
                        methodType: 'GET',
                    },
                    getLeaseTemplateShortList_get: {
                        url: '/Lease/Property/LeaseTemplate/ShortList',
                        name: 'property_create_getLeaseTemplateShortList',
                        status: 200,
                        methodType: 'GET',
                    },
                    issueLease_post: {
                        url: '/api/Property/Lease/IssueLease',
                        name: 'property_create_issueLease',
                        status: 200,
                        methodType: 'POST',
                    },
                },
            },
        },

        test: {},
    };
}


export default new poPropertiesApiEndPoints();
