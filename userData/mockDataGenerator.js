import HttpsMethods from "../utils/httpsMethods.js";




class MockDataGenerator {
    commonHeaders = {
        "X-API-Key": "03d44c10",
        Accept: "*/*",
    };




    getMockPropertyData() {
        const response = HttpsMethods.get(`https://my.api.mockaroo.com/propertyDetail.json?key=03d44c10`, this.commonHeaders);


        if (response.status !== 200) {
            console.log(`Failed to get mock property data: ${response.status}`);
        }


        return JSON.parse(response.body);


    }


    getMockNameDataArray() {
        const response = HttpsMethods.get(`https://my.api.mockaroo.com/nameDataArray.json?key=03d44c10`, this.commonHeaders);


        if (response.status !== 200) {
            console.log(`Failed to get random name array: ${response.status}`);
        }


        return JSON.parse(response.body);


    }
}


export default new MockDataGenerator();


