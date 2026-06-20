class PoLeaseAndFilesApiEndPoints {
    po = {
        leaseAndFiles: {
            leasesListingApis: {
                printLeaseList_post: {
                    url: '/api/Property/LeaseList/PrintLeaseList',
                    name: 'lease_listing_printLeaseList',
                    status: 200,
                    methodType: 'POST',
                },
                groupedPropertyByActiveInActiveUnits_get: {
                    url: (organizationId) =>
                        `/api/Home/DropDown/GroupedPropertyByActiveInActiveUnitsByOrganizationId?organizationId=${organizationId}&isDefaultMarketRentFeatureOn=false&searchText=`,
                    name: 'lease_listing_groupedPropertyByActiveInActiveUnits',
                    status: 200,
                    methodType: 'GET',
                },
                getLeaseFilterStatus_get: {
                    url: '/api/Home/DropDown/GetLeaseFilterStatus',
                    name: 'lease_listing_getLeaseFilterStatus',
                    status: 200,
                    methodType: 'GET',
                },
                getLeases_post: {
                    url: '/api/Property/LeaseList/GetLeases',
                    name: 'lease_listing_getLeases',
                    status: 200,
                    methodType: 'POST',
                },
                getLeaseStats_post: {
                    url: '/api/Property/LeaseList/GetLeaseStats',
                    name: 'lease_listing_getLeaseStats',
                    status: 200,
                    methodType: 'POST',
                },
                checkIfAnyTemplateIsCreated_get: {
                    url: '/Lease/Property/LeaseTemplate/CheckIfAnyTemplateIsCreated',
                    name: 'lease_listing_checkIfAnyTemplateIsCreated',
                    status: 200,
                    methodType: 'GET',
                },
                getLeaseTemplateShortList_get: {
                    url: (noOfTenants) =>
                        `/Lease/Property/LeaseTemplate/ShortList?noOfTenants=${noOfTenants}`,
                    name: 'lease_listing_getLeaseTemplateShortList',
                    status: 200,
                    methodType: 'GET',
                },
            },



            leaseDetailApis: {
                getUnitTenantList_get: {
                    url: (unitId) =>
                        `/api/property/UnitDetail/${unitId}/tenantlist`, 
                    name: 'lease_detail_getUnitTenantList',
                    status: 200,
                    methodType: 'GET',
                },
                getLeaseDetail_get: {
                    url: (rentalRequestId) =>
                        `/api/Property/LeaseDetail/GetLeaseDetail?rentalRequestId=${rentalRequestId}`,
                    name: 'lease_detail_getLeaseDetail',
                    status: 200,
                    methodType: 'GET',
                },
                getRentalRequestActivityList_get: {
                    url: (rentalRequestId) =>
                        `/api/Property/LeaseDocument/GetRentalRequestActivityList?rentalRequestId=${rentalRequestId}`,
                    name: 'lease_detail_getRentalRequestActivityList',
                    status: 200,
                    methodType: 'GET',
                },
                getOpenOnlineDocuments_get: {
                    url: (rentalContractId, propertyName) =>
                        `/api/Property/LeaseDocument/GetOpenOnlineDocuments?rentalContractId=${rentalContractId}&propertyName=${propertyName}`,
                    name: 'lease_detail_getOpenOnlineDocuments',
                    status: 200,
                    methodType: 'GET',
                },
                getCompletedOnlineDocuments_get: {
                    url: (rentalContractId, propertyName) =>
                        `/api/Property/LeaseDocument/GetCompletedOnlineDocuments?rentalContractId=${rentalContractId}&propertyName=${propertyName}`,
                    name: 'lease_detail_getCompletedOnlineDocuments',
                    status: 200,
                    methodType: 'GET',
                },
                getOfflineDocuments_get: {
                    url: (rentalContractId, propertyName) =>
                        `/api/Property/LeaseDocument/GetOfflineDocuments?rentalContractId=${rentalContractId}&propertyName=${propertyName}`,
                    name: 'lease_detail_getOfflineDocuments',
                    status: 200,
                    methodType: 'GET',
                },
                damageReportStatus_get: {
                    url: (leaseId) =>
                        `/lease/v1/damagereport/status?leaseId=${leaseId}`,
                    name: 'lease_detail_damageReportStatus',
                    status: 200,
                    methodType: 'GET',
                },
                getRenterInsuranceViewModel_get: {
                    url: (rentalRequestId) =>
                        `/api/Property/LeaseRenterInsurance/GetRenterInsuranceViewModel?rentalRequestId=${rentalRequestId}`,
                    name: 'lease_detail_getRenterInsuranceViewModel',
                    status: 200,
                    methodType: 'GET',
                },
                tempSaveFile_post: {
                    url: '/public/File/Upload/TempSaveFile',
                    name: 'lease_detail_tempSaveFile',
                    status: 200,
                    methodType: 'POST',
                },
                leaseDocumentSave_post: {
                    url: (rentalContractId) =>
                        `/api/Property/LeaseDocument/Save?rentalContractId=${rentalContractId}`,
                    name: 'lease_detail_leaseDocumentSave',
                    status: 200,
                    methodType: 'POST',
                },
            },


        },
    };
}


export default new PoLeaseAndFilesApiEndPoints();
