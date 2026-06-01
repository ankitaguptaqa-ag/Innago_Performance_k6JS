import { SharedArray } from "k6/data";
import { group, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import loginApis from "../apis/loginAuthentication/loginApis.js";
import poDashboardGroups from "../apis/po/poDashboard/poDashboard_groups.js";
import { createCustomTrends } from "../utils/customTrends.js";


export let responseTimeTrend = new Trend("response_time");
export let successRate = new Rate("success_rate");


// create all custom trends
export let customTrends = createCustomTrends();


export const options = {
    vus: 1,
    duration: "1m",
    thresholds: {
        http_req_failed: ["rate<0.01"],   // less than 1% requests should fail
        http_req_duration: ["p(95)<2000"], // 95% of requests must finish within 2s
    },
};


const users = new SharedArray("users", function () {
    return JSON.parse(open("../userData/qa_UserData.json")).local;
});






   


export function handleSummary(data) {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}`;
    const reportName = `reports/po_dashboard_${timestamp}.html`;

    return {
        [reportName]: htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}


export default function (dummyPoData) {
    let userData, poCreds, propertyObject, propertyId;


    poCreds = users[Math.floor(Math.random() * users.length)];


    group("Login Flow", () => {
        // pass trends to login APIs
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









































}










