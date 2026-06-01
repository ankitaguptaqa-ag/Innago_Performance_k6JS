class PoDashboardApiEndPoints {
    po = {
        dashboard: {
            getMaintenanceDetailOnDashboard_get: {
                url: "/maintenancems/v1/maintenance/request/detail/dashboard",
                name: "dashboard_getMaintenanceDetail",
                status: 200,
                methodType: "GET",
            },


            getPropertyOwnerUnsignedLeaseListModel_get: {
                url: "/api/PropertyOwner/Dashboard/GetPropertyOwnerUnsignedLeaseListModel",
                name: "dashboard_getUnsignedLeaseListModel",
                status: 200,
                methodType: "GET",
            },


            getPropertyOwnerListingStatsModel_get: {
                url: "/api/PropertyOwner/Dashboard/GetPropertyOwnerListingStatsModel",
                name: "dashboard_getListingStatsModel",
                status: 200,
                methodType: "GET",
            },


            getApplicationListByPropertyOwnerId_post: {
                url: "/api/PropertyOwner/Dashboard/GetApplicationListByPropertyOwnerId",
                name: "dashboard_getApplicationList",
                status: 200,
                methodType: "POST",
            },
            unverifiedBankAccount_get: {
                url: "/api/bank/microDeposit-verification/unverified-bankacccount",
                name: "dashboard_getUnverifiedBankAccount",
                status: 200,
                methodType: "GET",
            },
            getAdvertisements_get: {
                url: "/api/property-owner/advertisements",
                name: "dashboard_getAdvertisements",
                status: 200,
                methodType: "GET",
            },


            dashboardReferralModel_get: {
                url: "/api/PropertyOwner/Dashboard/GetDashboardReferralModel",
                name: "dashboard_getReferralModel",
                status: 200,
                methodType: "GET",
            },


            outstandingInvoices_get: {
                url: "/api/property-owner/dashboard/outstanding-invoice?allTime=false",
                name: "dashboard_getOutstandingInvoices",
                status: 200,
                methodType: "GET",
            },


            getShowByMonths_get: {
                url: "/api/Home/DropDown/GetShowByMonths",
                name: "dashboard_getShowByMonths",
                status: 200,
                methodType: "GET",
            },


            getPendingBank_get: {
                url: "/api/bank/getpendingbank",
                name: "dashboard_getPendingBank",
                status: 200,
                methodType: "GET",
            },


            getPropertyOwnerStatus_get: {
                url: "/api/PropertyOwner/PropertyOwner/status",
                name: "dashboard_getPropertyOwnerStatus",
                status: 200,
                methodType: "GET",
            },
            getInvoiceStats_post: {
                url: "/api/property-owner/dashboard/invoice-stats",
                name: "dashboard_getInvoiceStats",
                status: 200,
                methodType: "POST",
            },
        },
    };
}




export default new PoDashboardApiEndPoints();

