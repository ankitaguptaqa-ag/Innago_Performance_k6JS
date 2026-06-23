import poIncome_apis from "./poIncome_apis.js";
import randomUtils from "../../../utils/randomUtils.js";
import dateUtils from "../../../utils/dateUtils.js";


class PoIncomeGroups {
    data;
    trends;


    incomeDefaultApisGroup = () => {
        poIncome_apis.initialize(this.data);
        poIncome_apis.trends = this.trends;


        poIncome_apis.getInvoiceStatus();
        poIncome_apis.getPaymentTypes();
        poIncome_apis.getCumulativeBankListByOrganizationId();
        poIncome_apis.getGroupedPropertyByActiveInActiveUnitsByOrganizationId();
        poIncome_apis.getDepositTypes();
        poIncome_apis.getIncomeInvoicesGroupByProperty();
        poIncome_apis.getOverdueInvoices();
        poIncome_apis.getIncomeInvoiceStatistics();
        poIncome_apis.getIncomeInvoiceNotGroupIncome({});
    };


    createNewCustomRandomInvoiceGroup = (propertyId = 0, dueInDays = 1) => {
        // share auth + trends with the apis layer
        poIncome_apis.data = this.data;
        poIncome_apis.trends = this.trends;

        // ---- STEP 1: pick a random amount for this invoice ----
        const invoiceAmount = randomUtils.getRandomValueFromArray(['500', '600', '800', '900', '1000']);

        // ---- STEP 2: load the "new invoice" form data (same calls the UI makes) ----
        const invoiceTypes = poIncome_apis.getDepositTypesIncludingCredit().Data;
        const invoiceModel = poIncome_apis.getInvoiceEditModel().Data;   // blank invoice template
        const propertyList = poIncome_apis.getPropertyByOrganizationId().Data;
        poIncome_apis.getRentDueOnTypes();

        // pick a random charge type (skip deposit types)
        const chargeTypes = invoiceTypes.filter((type) => type.IsDepositType === false);
        const randomInvoiceType = randomUtils.getRandomValueFromArray(chargeTypes);

        // ---- STEP 3: choose property -> unit -> listing -> tenant (each needs the previous id) ----
        let selectedProperty;
        if (propertyId !== 0) {
            selectedProperty = propertyList.find((p) => Number(p.Value) === propertyId);
        } else {
            selectedProperty = randomUtils.getRandomValueFromArray(propertyList);
        }

        const unit = poIncome_apis.getUnitByPropertyId(selectedProperty.Value).Data[0];
        const listing = poIncome_apis.getListingByPropertyUnitIdForInvoice(unit.Value).Data[0];
        const tenant = poIncome_apis.getTenantsByListingId(listing.Value).Data[0];

        // ---- STEP 4: fill the blank invoice template ----
        // the single line item (the charge)
        const lineItem = invoiceModel.InvoiceItemEditModels[0];
        lineItem.ItemTypeId = Number(randomInvoiceType.Value);
        lineItem.Item = randomInvoiceType.Text;
        lineItem.Description = `${randomInvoiceType.Text} Fee`;
        lineItem.Quantity = '1';
        lineItem.Rate = invoiceAmount;
        lineItem.AmountDue = Number(invoiceAmount);

        // who/what the invoice is for
        invoiceModel.PropertyId = Number(selectedProperty.Value);
        invoiceModel.PropertyUnitId = Number(unit.Value);
        invoiceModel.ListingId = Number(listing.Value);
        invoiceModel.InvoiceTenantEditModel = [
            { Invoice: { InvoiceId: 0 }, Tenant: { Id: Number(tenant.Value) } },
        ];

        // amounts + dates
        invoiceModel.TotalAmount = Number(invoiceAmount);
        invoiceModel.BalanceDue = Number(invoiceAmount);
        invoiceModel.DueDate = dateUtils.getFutureDateWithGivenSeparator('-', dueInDays);
        invoiceModel.Notes = randomUtils.randomAlphabetsWithSpace(10);

        // flags / settings
        invoiceModel.Status = 54;
        invoiceModel.IsManualInvoice = true;
        invoiceModel.IsSharedByAllTenant = true;
        invoiceModel.RecurringInvoiceFrequency = 22;
        invoiceModel.TenantId = 0;
        invoiceModel.CustomFrequencyDate = [];
        invoiceModel.FirstRecurringInvoiceDate = [];
        invoiceModel.InvoiceDueDateRange = [];

        // ---- STEP 5: create the invoice (the actual POST) ----
        poIncome_apis.saveManualInvoice(invoiceModel);

        // ---- STEP 6: return a small summary of what we created ----
        return {
            amount: Number(invoiceAmount),
            invoiceTypeName: randomInvoiceType.Text,
            invoiceTypeId: randomInvoiceType.Value,
            statusId: 54,
        };
    };
}


export default new PoIncomeGroups();
