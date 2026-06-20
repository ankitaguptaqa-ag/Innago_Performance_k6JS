import poLeaseAndFilesApis from './poLease&Files_apis.js';
import randomUtils from '../../../utils/randomUtils.js';


class PoLeaseAndFilesGroups {
    data = {};
    trends = {};


    leaseAndFilesDefaultApisGroup() {
        poLeaseAndFilesApis.data = this.data;
        poLeaseAndFilesApis.trends = this.trends;
        poLeaseAndFilesApis.groupedPropertyByActiveInActiveUnits();
        poLeaseAndFilesApis.getLeaseFilterStatus();
        poLeaseAndFilesApis.getLeaseStats();
        poLeaseAndFilesApis.getLeasesList();
        poLeaseAndFilesApis.checkIfAnyTemplateIsCreated();
        poLeaseAndFilesApis.getLeaseTemplateShortList();
        poLeaseAndFilesApis.exportLeaseList();
    }

    leasesExportApiGroup() {
        poLeaseAndFilesApis.data = this.data;
        poLeaseAndFilesApis.trends = this.trends;
        return poLeaseAndFilesApis.exportLeaseList();
    }


    getListOfAllLeasesGroup() {
        poLeaseAndFilesApis.data = this.data;
        poLeaseAndFilesApis.trends = this.trends;
        return poLeaseAndFilesApis.getLeasesList().Data.List;
    }

    getLeaseDetailsGroup(selectedFile) {
        poLeaseAndFilesApis.data = this.data;
        poLeaseAndFilesApis.trends = this.trends;
        let leaseList = this.getListOfAllLeasesGroup();
        if (leaseList && leaseList.length > 0) {
            let selectedLease = randomUtils.getRandomValueFromArray(leaseList);
            let leaseDetailResponse = poLeaseAndFilesApis.getLeaseDetail(selectedLease.RentalRequestId);
            let leaseDetail = leaseDetailResponse?.Data;
            if (!leaseDetail) {
                console.warn('Failed to get lease detail');
                return;
            }
            poLeaseAndFilesApis.getOpenOnlineDocuments(leaseDetail.RentalContractId, selectedLease.PropertyName);
            poLeaseAndFilesApis.getCompletedOnlineDocuments(leaseDetail.RentalContractId, selectedLease.PropertyName);
            poLeaseAndFilesApis.getOfflineDocuments(leaseDetail.RentalContractId, selectedLease.PropertyName);
            poLeaseAndFilesApis.getRentalRequestActivityList(selectedLease.RentalRequestId);
            let leaseIdField = selectedLease.LeaseUid || selectedLease.LeaseId || selectedLease.LeaseGuid;
            if (leaseIdField) {
                poLeaseAndFilesApis.getDamageReportStatus(leaseIdField);
            }
            let fileUploadResponse = poLeaseAndFilesApis.tempSaveFile(selectedFile);
            let uploadedFileData = fileUploadResponse?.Data;
            if (uploadedFileData) {
                poLeaseAndFilesApis.saveLeaseDocument(leaseDetail.RentalContractId, uploadedFileData);
            } else {
                console.warn('File upload failed');
            }
        }
    }

    uploadLeaseDocuments(selectedFile) {
        poLeaseAndFilesApis.data = this.data;
        poLeaseAndFilesApis.trends = this.trends;
        console.log('[uploadLeaseDocuments] Starting lease document upload with PNG file');

        let leaseList = this.getListOfAllLeasesGroup();
        if (!leaseList || leaseList.length === 0) {
            console.warn('[uploadLeaseDocuments] No leases available');
            return;
        }

        let selectedLease = randomUtils.getRandomValueFromArray(leaseList);
        let leaseDetailResponse = poLeaseAndFilesApis.getLeaseDetail(selectedLease.RentalRequestId);
        let leaseDetail = leaseDetailResponse?.Data;

        if (!leaseDetail) {
            console.warn('[uploadLeaseDocuments] Could not retrieve lease detail');
            return;
        }

        let uploadedFileResponse = poLeaseAndFilesApis.tempSaveFile(selectedFile);
        let uploadedFileData = uploadedFileResponse?.Data;

        if (!uploadedFileData) {
            console.warn('[uploadLeaseDocuments] PNG file upload failed');
            return;
        }

        console.log('[uploadLeaseDocuments] PNG file uploaded, now saving to lease');
        poLeaseAndFilesApis.saveLeaseDocument(leaseDetail.RentalContractId, uploadedFileData);
    }










}


export default new PoLeaseAndFilesGroups();
