import dateUtils from "../utils/dateUtils.js";


class PoDashboardRequestPayload {
    getRequestJsonForInvoiceStats() {
        return JSON.stringify({
            DateFrom: dateUtils.getCurrentMonthFirstDate(),
            DateTo: dateUtils.getCurrentMonthLastDate(),
        });
    }


    getApplicationListByPropertyOwnerIdPayload() {
        return JSON.stringify({
            SearchText: "",
            PageNumber: 1,
            PageSize: 20,
            TotalRecords: 0,
            ApplicantName: "",
            ApplicantNames: [],
            PropertyIds: [],
            IsGrouped: false,
            ExcellentCreditScore: false,
            GoodCreditScore: false,
            BadCreditScore: false,
            PoorCreditScore: false,
            ApplicantinApplicationStatusId: 0,
            StatusId: 0,
            StatusIds: [],
            RetainedApplicationId: 0,
            SortingOrder: 0,
            SortingColumn: -1,
        });
    }
}


export default new PoDashboardRequestPayload();
