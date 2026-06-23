//import http from "k6/http";






class randomUtils {
    /**
     * Retrives a random value from an array
     * @param {Array} arrayList - The array from which to retrieve a random value.
     * @returns {any} A random value from the provided array.
     *
     */
    getRandomValueFromArray(arrList) {
        return arrList[Math.floor(Math.random() * arrList.length)];
    }
    // ...existing code...
    // getRandomValueFromArray(arrList) {
    //     if (!Array.isArray(arrList) || arrList.length === 0) {
    //         throw new Error("getRandomValueFromArray requires a non-empty array");
    //     }
    //     return arrList[Math.floor(Math.random() * arrList.length)];
    // }


    // getRandomValueFromArray(arrList) {
    //     if (!Array.isArray(arrList) || arrList.length === 0) {
    //         throw new Error(`Invalid array provided: ${JSON.stringify(arrList)}`);
    //     }


    //     return arrList[Math.floor(Math.random() * arrList.length)];
    // }
    // async getRandomValueFromArray(arrayList) {
    //     if (!Array.isArray(arrayList) || arrayList.length === 0) {
    //         throw new Error(`Invalid arrayList: ${JSON.stringify(arrayList)}`);
    //     }


    //     const randomIndex = Math.floor(Math.random() * arrayList.length);
    //     return arrayList[randomIndex];
    // }


    /**
     * Line Meaning Effect
     *+=    Adds the new character to the end   Builds up the full string
     * =    Replaces the entire string  Keeps only the latest character
     */


    generateRandomNumber(length) {
        const numbers = "123456789";
        let randomString = "";
        for (var i = 0; i < length; i++) {
            var rnum = Math.floor(Math.random() * numbers.length);
            randomString += numbers.substring(rnum, rnum + 1);
        }
        return Number(randomString);
    }


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    //9 digit Random Number
    randomPhoneNumber(length) {
        const num = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
        return num.toString();
    }

    // Random string of alphabets (a-z) with no spaces
    randomAlphabetsWithoutSpace(length) {
        const alphabets = "abcdefghijklmnopqrstuvwxyz";
        let randomString = "";
        for (let i = 0; i < length; i++) {
            randomString += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
        }
        return randomString;
    }

    // Random string of alphabets (a-z) that may include spaces between characters
    randomAlphabetsWithSpace(length) {
        const characters = "abcdefghijklmnopqrstuvwxyz ";
        let randomString = "";
        for (let i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString.trim();
    }
}


export default new randomUtils();




