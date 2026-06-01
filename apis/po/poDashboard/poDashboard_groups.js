import poDashboard_apis from "./poDashboard_apis.js";






class PoDashboardGroups {
    data;
    trends;


    dashboardListingDefaultApisGroup = () => {
        poDashboard_apis.initialize(this.data);
        poDashboard_apis.trends = this.trends;


        poDashboard_apis.getMaintenanceDetailOnDashboard();
        poDashboard_apis.getPropertyOwnerUnsignedLeaseListModel();
        poDashboard_apis.getPropertyOwnerListingStatsModel();
        poDashboard_apis.getApplicationListByPropertyOwnerId();
        poDashboard_apis.getUnverifiedBankAccount();               // this is not working having some issue
        poDashboard_apis.getAdvertisements();
        poDashboard_apis.getDashboardReferralModel();
        poDashboard_apis.getOutstandingInvoices();
        poDashboard_apis.getShowByMonths();
        poDashboard_apis.getPendingBank();
        poDashboard_apis.getPropertyOwnerStatus();
        poDashboard_apis.getInvoiceStats();              // this is giving error and i am not able to undersatnad what is the error so need to anlysis that


    };
   








}


export default new PoDashboardGroups();
