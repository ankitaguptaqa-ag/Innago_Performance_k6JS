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
import poLeaseAndFilesGroups from "../apis/po/poLease&Files/poLease&Files_groups.js";
import { getRandomPngFile } from "../utils/fileSelector.js";


export let responseTimeTrend = new Trend("response_time");

// create all custom trends
export let customTrends = createCustomTrends();


export const options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        http_req_failed: ["rate<0.05"],    // less than 5% requests should fail (allows for file upload API issues)
        http_req_duration: ["p(95)<10000"], // 95% of requests must finish within 10s
    },
};

export const httpDebug = 'full';


const users = new SharedArray("users", function () {
    return JSON.parse(open("../userData/qa_UserData.json")).local;
});

const pngFile_1 = open(`../utils/dummyFilesForUpload/SystemCreateError.png`, 'b');
const pngFile_2 = open(`../utils/dummyFilesForUpload/HIPPA78.png`, 'b');
const pngFile_3 = open(`../utils/dummyFilesForUpload/SubFramework_UI_Issue.png`, 'b');

const fileMap = {
    'SystemCreateError.png': pngFile_1,
    'HIPPA78.png': pngFile_2,
    'SubFramework_UI_Issue.png': pngFile_3,
};

const selectedRandomFileName = getRandomPngFile();
console.log(`[File Setup] Selected filename: ${selectedRandomFileName}, Available keys: ${Object.keys(fileMap).join(', ')}`);
const selectedFileContent = fileMap[selectedRandomFileName];
console.log(`[File Setup] File content loaded: ${selectedFileContent ? 'YES (' + selectedFileContent.byteLength + ' bytes)' : 'NO - undefined'}`);








   


export function handleSummary(data) {
    const latestReportPath = 'reports/po_latest_report.html';

    console.log(`\n📊 Latest report: ${latestReportPath}\n`);

    return {
        [latestReportPath]: htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}


export function setup() {
    return {
        propertyDataArray: mockDataGenerator.getMockPropertyData(),
        nameDataArray: mockDataGenerator.getMockNameDataArray(),
        fileContent: selectedFileContent,
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
        propertyObject = poPropertiesGroups.createNewPropertyWithM2MLease_v2_group(propertiesDataObjects.blankProperty(), dummyPoData, dummyPoData.fileContent);
        propertyId = propertyObject.propertyId;
        console.log(`[Load Test] Property created: ${propertyObject.propertyName}, Id: ${propertyId}`);
        poPropertiesGroups.propertyDetailSectionDefaultApis_group(propertyObject);
    });

    sleep(5);

    group('PO Lease and Files APIs', () => {
        poLeaseAndFilesGroups.data = userData;
        poLeaseAndFilesGroups.trends = customTrends;
        poLeaseAndFilesGroups.leaseAndFilesDefaultApisGroup();
        poLeaseAndFilesGroups.getLeaseDetailsGroup(dummyPoData.fileContent);
        poLeaseAndFilesGroups.uploadLeaseDocuments(pngFile_2);
        poLeaseAndFilesGroups.leasesExportApiGroup();




    });

    sleep(5);
}










