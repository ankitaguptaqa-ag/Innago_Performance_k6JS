import { SharedArray } from "k6/data";
import { group, sleep } from "k6";
import { Trend } from "k6/metrics";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import loginApis from "../apis/loginAuthentication/loginApis.js";
import poDashboardGroups from "../apis/po/poDashboard/poDashboard_groups.js";
import poPropertiesGroups from "../apis/po/poProperties/poProperties_groups.js";
import propertiesDataObjects from "../testData/dataObjects/propertiesDataObjects.js";
import mockDataGenerator from "../userData/mockDataGenerator.js";
import { createCustomTrends } from "../utils/customTrends.js";


export let responseTimeTrend = new Trend("response_time");

// create all custom trends
export let customTrends = createCustomTrends();


export const options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        http_req_failed: ["rate<0.01"],   // less than 1% requests should fail
        http_req_duration: ["p(95)<5000"], // 95% of requests must finish within 5s
    },
};


const users = new SharedArray("users", function () {
    return JSON.parse(open("../userData/qa_UserData.json")).local;
});






   


export function handleSummary(data) {
    return {
        "reports/po_latest_report.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}


export function setup() {
    return {
        propertyDataArray: mockDataGenerator.getMockPropertyData(),
        nameDataArray: mockDataGenerator.getMockNameDataArray(),
    };
}

export default function (dummyPoData) {
    let userData, poCreds, propertyObject, propertyId;


    poCreds = users[Math.floor(Math.random() * users.length)];


    group("Login Flow", () => {
        loginApis.trends = customTrends;
        console.log(`Logging in with user ::: ${poCreds.username}`);
        userData = loginApis.loginIntoGivenUser(poCreds);
    });

    sleep(1);


    group("PO Dashboard APIs", () => {
        poDashboardGroups.data = userData;
        poDashboardGroups.trends = customTrends;
        poDashboardGroups.dashboardListingDefaultApisGroup();
    });

    sleep(1);

    group("PO Properties Listing APIs", () => {
        poPropertiesGroups.data = userData;
        poPropertiesGroups.trends = customTrends;
        poPropertiesGroups.propertiesListingDefaultApis_Group();
    });

    sleep(1);

    group("PO Create Property & Details APIs", () => {
        poPropertiesGroups.data = userData;
        poPropertiesGroups.trends = customTrends;
        propertyObject = poPropertiesGroups.createNewPropertyWithM2MLease_v2_group(propertiesDataObjects.blankProperty(), dummyPoData);
        propertyId = propertyObject.propertyId;
        console.log(`[Load Test] Property created: ${propertyObject.propertyName}, Id: ${propertyId}`);
        poPropertiesGroups.propertyDetailSectionDefaultApis_group(propertyObject);
    });

    sleep(5);
}










