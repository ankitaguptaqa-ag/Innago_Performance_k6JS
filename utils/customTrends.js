import { Trend } from "k6/metrics";
import apiEndpoints from "../config/apiEndPoints.js";
import poPropertiesApiEndPoints from "../apis/po/poProperties/poPropertiesApiEndPoints.js";


function extractApiNames(obj) {
    let apiNames = [];


    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];


            if (typeof value === "object" && value !== null) {
                if (value.name && (value.url || typeof value.url === "function")) {
                    apiNames.push(value.name);
                } else {
                    const nestedNames = extractApiNames(value);
                    apiNames = apiNames.concat(nestedNames);
                }
            }
        }
    }


    return apiNames;
}


const getAllApiNames = () => {
    const allNames = [
        ...extractApiNames(apiEndpoints),
        ...extractApiNames(poPropertiesApiEndPoints),
    ];
    return [...new Set(allNames)];
};


export const TREND_NAMES = {};
const allApiNames = getAllApiNames();


allApiNames.forEach((name) => {
    const constantName = name.toUpperCase().replace(/-/g, "_");
    TREND_NAMES[constantName] = name;
});


export const createCustomTrends = () => {
    const trends = {};


    allApiNames.forEach((trendName) => {
        trends[trendName] = new Trend(trendName);
    });


    return trends;
};


export const getTrendName = (apiName) => {
    return `${apiName}`;
};


export const addResponseTimeToTrend = (trends, trendName, response) => {
    if (response && response.timings && response.timings.duration && trends[trendName]) {
        trends[trendName].add(response.timings.duration);
    } else if (!trends[trendName]) {
        console.warn(`Trend '${trendName}' not found in predefined trends`);
    }
};


export const addToTrend = (trends, trendName, value) => {
    if (trends && trends[trendName]) {
        trends[trendName].add(value);
    } else {
        console.warn(`Trend '${trendName}' not found in predefined trends`);
    }
};


export const getAllTrendNames = () => allApiNames;








