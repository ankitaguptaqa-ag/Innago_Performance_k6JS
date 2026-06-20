class PoIncomeApiEndPoints {
    po = {
        income: {
            default: {
                getPaymentTypes_get: {
                    url: '/api/Home/DropDown/GetPaymentTypes',
                    name: 'income_getPaymentTypes',
                    status: 200,
                    methodType: 'GET',
                },
                getCumulativeBankListByOrganizationId_get: {
                    url: (organizationId) =>
                        `/api/Home/DropDown/GetCumulativeBankListByOrganizationId?organizationId=${organizationId}&isActive=false`,
                    name: 'income_getCumulativeBankListByOrganizationId',
                    status: 200,
                    methodType: 'GET',
                },
                getGroupedPropertyByActiveInActiveUnitsByOrganizationId_get: {
                    url: (organizationId) =>
                        `/api/Home/DropDown/GroupedPropertyByActiveInActiveUnitsByOrganizationId?organizationId=${organizationId}&isDefaultMarketRentFeatureOn=false&searchText=`,
                    name: 'income_getGroupedPropertyByActiveInActiveUnitsByOrganizationId',
                    status: 200,
                    methodType: 'GET',
                },
                getDepositTypes_get: {
                    url: (isDefault = false) =>
                        `/api/Home/DropDown/GetDepositTypes?isDefault=${isDefault}&onlyDepositType=false&isHOATerm=false&isFromIncomeList=false`,
                    name: 'income_getDepositTypes',
                    status: 200,
                    methodType: 'GET',
                },
                getInvoiceStatus_get: {
                    url: '/api/Home/DropDown/InvoiceStatus',
                    name: 'income_getInvoiceStatus',
                    status: 200,
                    methodType: 'GET',
                },
                getIncomeInvoicesGroupByProperty_post: {
                    url: '/income/invoices/group-by-property',
                    name: 'income_getIncomeInvoicesGroupByProperty',
                    status: 200,
                    methodType: 'POST',
                },
                getIncomeInvoicesNotGroupIncome_post: {
                    url: '/income/invoices/not-group-income',
                    name: 'income_getIncomeInvoicesNotGroupIncome',
                    status: 200,
                    methodType: 'POST',
                },
                getOverdueInvoices_post: {
                    url: '/income/invoices/overdue-invoices',
                    name: 'income_getOverdueInvoices',
                    status: 200,
                    methodType: 'POST',
                },
                getIncomeInvoiceStatistics_post: {
                    url: '/income/invoices/statics',
                    name: 'income_getIncomeInvoiceStatistics',
                    status: 200,
                    methodType: 'POST',
                },
                exportInvoicesGroupByProperty_post: {
                    url: '/income/invoices/export-group-by-property',
                    name: 'income_exportInvoicesGroupByProperty',
                    status: 200,
                    methodType: 'POST',
                },
                getUnitsByPropertyId_post: {
                    url: `/api/Home/DropDown/v2/units`,
                    name: 'income_getUnitsByPropertyId',
                    status: 200,
                    methodType: 'POST',
                },
            },
            invoiceDetails: {
                getInvoiceDetails_get: {
                    url: (invoiceId) => `/api/Finance/Invoice_v1/GetInvoiceDetails?invoiceId=${invoiceId}`,
                    name: 'income_getInvoiceDetails',
                    status: 200,
                    methodType: 'GET',
                },
                getInvoiceNotesCount_get: {
                    url: (invoiceId) => `/api/Finance/Invoice_v1/GetInvoiceNotesCount?invoiceId=${invoiceId}`,
                    name: 'income_getInvoiceNotesCount',
                    status: 200,
                    methodType: 'GET',
                },
                getDepositTypesIncludingCredit_get: {
                    url: `/api/Home/DropDown/GetDepositTypesIncludingCredit`,
                    name: 'income_getDepositTypesIncludingCredit',
                    status: 200,
                    methodType: 'GET',
                },
                printInvoiceView_get: {
                    url: (invoiceId) => `/api/NewTenant/Invoice/PrintInvoiceView?invoiceId=${invoiceId}`,
                    name: 'income_printInvoiceView',
                    status: 200,
                    methodType: 'GET',
                },
                getTenantsWithEmailByInvoiceId_get: {
                    url: (invoiceId) => `/api/Home/DropDown/GetTenantsWithEmailByInvoiceId?invoiceId=${invoiceId}`,
                    name: 'income_getTenantsWithEmailByInvoiceId',
                    status: 200,
                    methodType: 'GET',
                },
                getPaymentReminderTemplate_get: {
                    url: (invoiceId) => `/api/Finance/Invoice_v1/GetPaymentReminderTemplate?invoiceId=${invoiceId}`,
                    name: 'income_getPaymentReminderTemplate',
                    status: 200,
                    methodType: 'GET',
                },
                sendReminder_post: {
                    url: '/api/Finance/Invoice_v1/SendReminder',
                    name: 'income_sendReminder',
                    status: 200,
                    methodType: 'POST',
                },
                getTenantsByInvoiceId_get: {
                    url: (invoiceId) => `/api/Home/DropDown/GetTenantsByInvoiceId?invoiceId=${invoiceId}`,
                    name: 'income_getTenantsByInvoiceId',
                    status: 200,
                    methodType: 'GET',
                },
                getPaymentMethodList_get: {
                    url: `/api/Home/DropDown/GetPaymentMethodList`,
                    name: 'income_getPaymentMethodList',
                    status: 200,
                    methodType: 'GET',
                },
                getRecordPaymentModel_get: {
                    url: (invoiceId, studentId) => `/api/Payment/RecordPayment/GetRecordPaymentModel?invoiceId=${invoiceId}&studentId=${studentId}`,
                    name: 'income_getRecordPaymentModel',
                    status: 200,
                    methodType: 'GET',
                },
                saveRecordPayment_post: {
                    url: `/api/Payment/RecordPayment/SaveRecordPayment`,
                    name: 'income_saveRecordPayment',
                    status: 200,
                    methodType: 'POST',
                },
                deleteInvoiceById_get: {
                    url: (invoiceId) => `/api/Finance/InvoiceDelete//DeleteInvoiceById?invoiceId=${invoiceId}`,
                    name: 'income_deleteInvoiceById',
                    status: 200,
                    methodType: 'GET',
                },
                updateInvoiceItem_post: {
                    url: `/api/Finance/ManualInvoiceCommand/UpdateInvoiceItem`,
                    name: 'income_updateInvoiceItem',
                    status: 200,
                    methodType: 'POST',
                },
                notes: {
                    getPrimaryNotes_post: {
                        url: `/api/PropertyOwner/Notes/GetPrimaryNotes`,
                        name: 'income_getPrimaryNotes',
                        status: 200,
                        methodType: 'POST',
                    },
                    getRelatedNotes_post: {
                        url: `/api/PropertyOwner/Notes/GetRelatedNotes`,
                        name: 'income_getRelatedNotes',
                        status: 200,
                        methodType: 'POST',
                    },
                    getFilterUserList_get: {
                        url: `/api/PropertyOwner/Notes/GetFilterUserList`,
                        name: 'income_getFilterUserList',
                        status: 200,
                        methodType: 'GET',
                    },
                    getNotesCategoryList_get: {
                        url: `/api/PropertyOwner/Notes/GetNotesCategoryList`,
                        name: 'income_getNotesCategoryList',
                        status: 200,
                        methodType: 'GET',
                    },
                    deleteNote_post: {
                        url: (noteId) => `/api/PropertyOwner/Notes/DeleteNote?noteId=${noteId}`,
                        name: 'income_deleteNote',
                        status: 200,
                        methodType: 'POST',
                    },
                    saveNotes_post: {
                        url: `/api/PropertyOwner/Notes/SaveNote`,
                        name: 'income_saveNotes',
                        status: 200,
                        methodType: 'POST',
                    }
                },
                attachments: {
                    getRelatedAttachments_post: {
                        url: `/api/PropertyOwner/AttachmentFiles/GetRelatedAttachments`,
                        name: 'income_getRelatedAttachments',
                        status: 200,
                        methodType: 'POST',
                    },
                    getPrimaryAttachments_post: {
                        url: `/api/PropertyOwner/AttachmentFiles/GetPrimaryAttachments`,
                        name: 'income_getPrimaryAttachments',
                        status: 200,
                        methodType: 'POST',
                    },
                    getAttachmentsCategoryList_get: {
                        url: `/api/PropertyOwner/AttachmentFiles/GetAttachmentsCategoryList`,
                        name: 'income_getAttachmentsCategoryList',
                        status: 200,
                        methodType: 'GET',
                    },
                },
            },
            newInvoice: {
                getInvoiceEditModel_get: {
                    url: (invoiceId = 0) => `/api/Finance/ManualInvoiceQuery/GetInvoiceEditModel?invoiceId=${invoiceId}`,
                    name: 'income_getInvoiceEditModel',
                    status: 200,
                    methodType: 'GET',
                },
                getPropertyByOrganizationId_get: {
                    url: (organizationId) => `/api/Home/DropDown/GetPropertyByOrganizationId?organizationId=${organizationId}`,
                    name: 'income_getPropertyByOrganizationId',
                    status: 200,
                    methodType: 'GET',
                },
                getRentDueOnTypes_get: {
                    url: `/api/Home/DropDown/GetRentDueOnTypes`,
                    name: 'income_getRentDueOnTypes',
                    status: 200,
                    methodType: 'GET',
                },
                getUnitByPropertyId_get: {
                    url: (propertyId) => `/api/Home/DropDown/GetUnitByPropertyId?propertyId=${propertyId}`,
                    name: 'income_getUnitByPropertyId',
                    status: 200,
                    methodType: 'GET',
                },
                getListingByPropertyUnitIdForInvoice_get: {
                    url: (propertyUnitId) => `/api/Home/DropDown/GetListingByPropertyUnitIdForInvoice?propertyUnitId=${propertyUnitId}`,
                    name: 'income_getListingByPropertyUnitIdForInvoice',
                    status: 200,
                    methodType: 'GET',
                },
                getTenantsByListingId_get: {
                    url: (listingId) => `/api/Home/DropDown/GetTenantsByListingId?listingId=${listingId}`,
                    name: 'income_getTenantsByListingId',
                    status: 200,
                    methodType: 'GET',
                },
                saveManualInvoice_post: {
                    url: `/api/Finance/ManualInvoiceCommand/SaveManualInvoice`,
                    name: 'income_saveManualInvoice',
                    status: 200,
                    methodType: 'POST',
                },
            },
        },
    };
}


export default new PoIncomeApiEndPoints();
