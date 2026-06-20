

class PoLeaseAndFilesRequestPayload {

    
    getLeaseStatsRequestPayload(userInternalData, searchOptions = {}) {
    const inputRequestJson = {
        PropertyOwnerId: userInternalData.OrganizationRoleUserId,
        PropertyId: searchOptions.PropertyId || 0,
        PropertyUnitId: searchOptions.PropertyUnitId || 0,
        FromDate: searchOptions.FromDate || null,
        ToDate: searchOptions.ToDate || null,
        StatusId: searchOptions.StatusId || 0,
        PageNumber: searchOptions.PageNumber || 1,
        PageSize: searchOptions.PageSize || 50,
        ExpiringInDays: searchOptions.ExpiringInDays || 90,
        RentalRequestId: searchOptions.RentalRequestId || 0,
        IsArchived: searchOptions.IsArchived || false,
        RetainedRentalRequestId: searchOptions.RetainedRentalRequestId || 0,
        SortingOrder: searchOptions.SortingOrder || 1,
        SortingColumn: searchOptions.SortingColumn || 0,
    };
    return JSON.stringify(inputRequestJson);
}


   /**
     * Creates request payload for lease document save
    *. @param {Object} documentData - Document data object with FileId
    @returns {string} JSON stringified request payload
    */
    getLeaseDocumentSaveRequestPayload(documentData) {
        const payload = {
            FileId: documentData?.FileId || documentData,
            DocumentName: 'Test Document',
            DocumentType: 'Lease',
            Description: 'Uploaded via load test'
        };
        return JSON.stringify(payload);
    }


    getLeasesRequestPayload(userInternalData, searchOptions = {}) {
        const inputRequestJson = {
            PropertyOwnerId: userInternalData.OrganizationRoleUserId,
            PropertyOwnerUid: userInternalData.OrganizationUuId,
            OrganizationId: userInternalData.OrganizationId,
            PropertyIds: searchOptions.PropertyIds || [],
            PropertyUnitIds: searchOptions.PropertyUnitIds || [],
            StatusId: searchOptions.StatusId || 0,
            ShowActive: searchOptions.ShowActive !== undefined ? searchOptions.ShowActive : true,
            ShowFuture: searchOptions.ShowFuture !== undefined ? searchOptions.ShowFuture : true,
            ShowPast: searchOptions.ShowPast !== undefined ? searchOptions.ShowPast : false,
            ShowArchived: searchOptions.ShowArchived !== undefined ? searchOptions.ShowArchived : false,
            PageNumber: searchOptions.PageNumber || 1,
            PageSize: searchOptions.PageSize || 20,
            SearchText: searchOptions.SearchText || '',
            SortingColumn: searchOptions.SortingColumn || 0,
            SortingOrder: searchOptions.SortingOrder || 0,
        };
        return JSON.stringify(inputRequestJson);
    }


















}


export default new PoLeaseAndFilesRequestPayload();
