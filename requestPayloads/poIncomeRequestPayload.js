import dateUtils from "../utils/dateUtils.js";
import randomUtils from "../utils/randomUtils.js";


class PoIncomeRequestPayload {
    
    getRequestPayloadForIncomeInvoicesGroupByProperty(propertyOwnerId) {
        return JSON.stringify({
            PropertyOwnerId: propertyOwnerId,
            PropertyId: 0,
            UnitId: 0,
            PropertyUnitIds: [],
            TenantName: "",
            TenantNames: [],
            PaymentMethodList: [
                { Text: "Cash", Value: "46", Selected: false },
                { Text: "Check", Value: "44", Selected: false },
                { Text: "Credit Card", Value: "43", Selected: false },
                { Text: "ECheck", Value: "45", Selected: false },
                { Text: "Money Order", Value: "167", Selected: false },
            ],
            PaymentMethodIds: [],
            InvoiceStatusIds: [],
            InvoiceStatusList: [
                { Text: "Fully Paid", Value: "6", Selected: false },
                { Text: "Open", Value: "5", Selected: false },
                { Text: "Overdue", Value: "3", Selected: false },
                { Text: "Partially Paid", Value: "4", Selected: false },
                { Text: "Processing", Value: "2", Selected: false },
            ],
            BankAccountDetails: null,
            InvoiceTypeId: 0,
            DateType: 2,
            DateFrom: dateUtils.getFirstDateOfCurrentMonth_yyyy_mm_dd(),
            DateTo: dateUtils.getLastDateOfCurrentMonth_yyyy_mm_dd(),
            IsSentOn: false,
            IsDueOn: true,
            IsPaidOn: false,
            IsDisbursedOn: false,
            SortingColumn: 4,
            SortingOrder: 0,
            PageNumber: 1,
            PageSize: 25,
            ListingId: 0,
            IsStatistics: false,
            RetainedInvoiceId: 0,
            InvoiceListSortingColumn: 4,
            SelectedTenantPropertyId: 0,
            isFilterApplied: false,
            isClearStatus: false,
            IsAllTimeInvoice: false,
            IsFromIncomems: true,
            TenantUid: "",
            TenantUids: [],
            PropertyIds: [],
            FilterPropertyIds: [],
            FilterUnitIds: [],
            IsSubUser: false,
            InvoiceTypeName: "",
            InvoiceTypeNames: [],
            SearchText: "",
        });
    }

    getRequestPayloadForIncomeInvoiceStatistics(propertyOwnerId) {
        return JSON.stringify({
            PropertyOwnerId: propertyOwnerId,
            PropertyId: 0,
            UnitId: 0,
            PropertyUnitIds: [],
            TenantName: "",
            TenantNames: [],
            PaymentMethodList: [
                { Text: "Cash", Value: "46", Selected: false },
                { Text: "Check", Value: "44", Selected: false },
                { Text: "Credit Card", Value: "43", Selected: false },
                { Text: "ECheck", Value: "45", Selected: false },
                { Text: "Money Order", Value: "167", Selected: false },
            ],
            PaymentMethodIds: [],
            InvoiceStatusIds: [],
            InvoiceStatusList: [
                { Text: "Fully Paid", Value: "6", Selected: false },
                { Text: "Open", Value: "5", Selected: false },
                { Text: "Overdue", Value: "3", Selected: false },
                { Text: "Partially Paid", Value: "4", Selected: false },
                { Text: "Processing", Value: "2", Selected: false },
            ],
            BankAccountDetails: null,
            InvoiceTypeId: 0,
            DateType: 2,
            DateFrom: dateUtils.getFirstDateOfCurrentMonth_yyyy_mm_dd(),
            DateTo: dateUtils.getLastDateOfCurrentMonth_yyyy_mm_dd(),
            IsSentOn: false,
            IsDueOn: true,
            IsPaidOn: false,
            IsDisbursedOn: false,
            SortingColumn: 4,
            SortingOrder: 0,
            PageNumber: 1,
            PageSize: 25,
            ListingId: 0,
            IsStatistics: false,
            RetainedInvoiceId: 0,
            InvoiceListSortingColumn: 4,
            SelectedTenantPropertyId: 0,
            isFilterApplied: false,
            isClearStatus: false,
            IsAllTimeInvoice: false,
            IsFromIncomems: true,
            TenantUid: "",
            TenantUids: [],
            PropertyIds: [],
            FilterPropertyIds: [],
            FilterUnitIds: [],
            IsSubUser: false,
            InvoiceTypeName: "",
            InvoiceTypeNames: [],
            SearchText: "",
        });
    }

    getRequestPayloadForOverdueInvoice(propertyOwnerId) {
        return JSON.stringify({
            PropertyOwnerId: propertyOwnerId,
            PropertyIds: [],
            IncomeMsData: true,
            IsSubUser: false,
        });
    }

    getRequestPayloadForPrimaryNotes(organizationRoleUserId, invoiceId, leaseId, primaryNoteTypeId = 257) {
        return JSON.stringify({
            OrganizationRoleUserId: organizationRoleUserId,
            PrimaryNoteTypeId: primaryNoteTypeId,
            LeaseId: leaseId,
            InvoiceId: invoiceId,
            StartDate: null,
            EndDate: null,
            PageNumber: 1,
            PageSize: 5,
        });
    }

    getRequestPayloadForRelatedNotes(organizationRoleUserId, invoiceId, leaseId, primaryNoteTypeId = 257) {
        return JSON.stringify({
            OrganizationRoleUserId: organizationRoleUserId,
            PrimaryNoteTypeId: primaryNoteTypeId,
            LeaseId: leaseId,
            InvoiceId: invoiceId,
            StartDate: null,
            EndDate: null,
            PageNumber: 1,
            PageSize: 5,
        });
    }

    getRequestPayloadForSaveNote(userObject, invoiceId, leaseId) {
        return JSON.stringify({
            NoteText: randomUtils.randomAlphabetsWithoutSpace(6),
            PostedById: userObject.OrganizationRoleUserId || 0,
            NotesTypeId: 257,
            InvoiceId: invoiceId || '',
            LeaseId: leaseId || '',
        });
    }

    getRequestPayloadForPrimaryAttachments(userObject, invoiceId, leaseId, primaryAttachmentTypeId) {
        return JSON.stringify({
            StartDate: null,
            EndDate: null,
            PageNumber: 1,
            PageSize: 5,
            InvoiceId: invoiceId || '',
            LeaseId: leaseId || '',
            PrimaryAttachmentTypeId: primaryAttachmentTypeId || 342,
            OrganizationRoleUserId: userObject.OrganizationRoleUserId || 0,
        });
    }

   

    getRequestPayloadForRelatedAttachments(userObject, invoiceId, leaseId, primaryAttachmentTypeId) {
        return JSON.stringify({
            StartDate: null,
            EndDate: null,
            PageNumber: 1,
            PageSize: 5,
            InvoiceId: invoiceId || '',
            LeaseId: leaseId || '',
            PrimaryAttachmentTypeId: primaryAttachmentTypeId || 342,
            OrganizationRoleUserId: userObject.OrganizationRoleUserId || 0,
        });
    }

    
}


export default new PoIncomeRequestPayload();
