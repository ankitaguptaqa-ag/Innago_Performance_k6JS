class PropertiesDataObject {
    blankProperty() {
        return {
            tenantFirstName: '',
            tenantLastName: '',
            tenantFullName: '',
            tenantEmail: '',
            phoneNumber: '',
            tenantMobileNo_1: '',
            username: '',
            password: '',
            propertyName: '',
            propertyId: 0,
            propertyUnitName: '',
            propertyUnitId: 0,
            rentAmount: 600,
            depositAmount: 800,
            leaseId: 0,
            leaseGuid: '',
        };
    }


    eachInvoice() {
        return {
            Id: 0,
            DueDate: '',
            FrequecyDueDate: '',
            Rent: 0,
            ListingId: null,
            IsMarkedAsDeleted: false,
            IsInvoicePaid: false,
            SmartMoveListingId: null,
            CanDelete: true,
            PaidAmount: 0,
            TenantId: 0,
            TenantName: '',
            IndividualForecastInvoiceEditModels: [],
            TotalAmount: 0,
            TotalTenant: 0,
            IsMultipleDate: true,
            TotalInvoice: 0,
            InvoiceForecastedInvoiceId: 0,
            IsNew: true,
            IsManualChanged: false,
            isCollapsed: false,
            IsGroupInvoice: false,
            IsInvalidUpdatedRentAmount: false,
            AdditionalInvoiceAmount: 0,
        };
    }
}




export default new PropertiesDataObject();
