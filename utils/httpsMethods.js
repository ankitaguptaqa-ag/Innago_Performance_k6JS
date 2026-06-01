
import http from "k6/http";
import { sleep } from "k6";


class HttpsMethods {
    static CONSTANT_DELAY = 2; // seconds delay between requests


    static get(url, headers = {}, tags = {}) {
        let response = http.get(url, {
            headers,
            tags,
        });


        sleep(HttpsMethods.CONSTANT_DELAY);
        return response;
    }


    static post(url, payload, headers = {}, tags = {}) {
        let response = http.post(url, payload, {
            headers,
            tags,
        });


        sleep(HttpsMethods.CONSTANT_DELAY);
        return response;
    }


    static put(url, payload, headers = {}, tags = {}) {
        let response = http.put(url, payload, {
            headers,
            tags,
        });


        sleep(HttpsMethods.CONSTANT_DELAY);
        return response;
    }


    static delete(url, headers = {}, tags = {}) {
        let response = http.del(url, {
            headers,
            tags,
        });


        sleep(HttpsMethods.CONSTANT_DELAY);
        return response;
    }
}


export default HttpsMethods;



