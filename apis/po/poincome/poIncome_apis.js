


class poIncomeApis {
    data;
    trends;

    commonHeaders = {
        Accept: 'application/json", text/plain, */*',
        Origin: `${APP_BASE_URL}`,
        Referer: `${APP_BASE_URL}`,
    };

    initialize(authData) {
        this.data = authData;
        this.trends = {};
    }

    _validateAuth() {
        if (!this.data?.sessionId || !this.data?.accessToken) {
            throw new Error("Authentication data is missing. Please initialize with valid auth data.");
        }
    }

    _createHeaders() {
        return {
            "Content-Type": "application/json",
            authorization: `Bearer ${this.data.accessToken}`,
            token: this.data.sessionId,
            ...this.commonHeaders,
        };
    }

    _createFileUploadHeaders() {
        return {
            Token: `${this.data.sessionId}`,
            Authorization: `Bearer ${this.data.accessToken}`,
            // Note: Don't set Content-Type for multipart/form-data, k6 will set it automatically
            Accept: 'application/json, text/plain, */*',
            Origin: `${APP_BASE_URL}`,
            Referer: `${APP_BASE_URL}`,
        };
    }


    _createTags(apiEndPoint) {
        if (!apiEndPoint) {
            throw new Error("apiEndPoint is undefined in _createTags");
        }
        return {
            method: apiEndPoint.methodType,
            name: apiEndPoint.name,
            status: apiEndPoint.status?.toString(),
        };
    }

    _handleResponse(response, apiEndPoint, operationName) {
        if (response.status !== apiEndPoint.status) {
            console.log(`Failed to ${operationName.toLowerCase()}: ${response.status}`);
        }

        const checkName = operationName.replace(/([A-Z])/g, "$1").trim();
        check(response, {
            [`${checkName} api status is ${apiEndPoint.status}`]: (r) => r.status === apiEndPoint.status,
            [`${checkName} api response body is not empty`]: (r) => r.body && r.body.length > 0,
        });

        addResponseTimeToTrend(this.trends, apiEndPoint.name, response);
        expect(response).to.have.validJsonBody();

        return JSON.parse(response.body);
    }

    _makeGetRequest(url, apiEndPoint, operationName, customHeaders = null) {
        const headers = customHeaders || this._createHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.get(url, headers, tags);
        return this._handleResponse(response, apiEndPoint, operationName);
    }

    _makePostRequest(url, payload, apiEndPoint, operationName, customHeaders = null) {
        const headers = customHeaders || this._createHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.post(url, payload, headers, tags);
        return this._handleResponse(response, apiEndPoint, operationName);
    }

    _makeGetRequestWithUrl(apiEndPoint, customUrl, operationName) {
        const headers = this._createHeaders();
        const tags = this._createTags(apiEndPoint);
        const response = HttpsMethods.get(customUrl, headers, tags);
        return this._handleResponse(response, apiEndPoint, operationName);
    }
}


export default new poIncomeApis();

