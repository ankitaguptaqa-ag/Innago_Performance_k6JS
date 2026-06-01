




class dateUtils {
    addDays(aDate, numberOfDays) {
        aDate.setDate(aDate.getDate() + numberOfDays); // Add numberOfDays
        return aDate; // Return the date
    }


    format(date, appendZero) {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


        var day = date.getDate();
        if (appendZero === "yes") {
            day = date.getDate() < 10 ? "0" + day : day;
        }
        var monthIndex = date.getMonth();
        var year = date.getFullYear();


        return monthNames[monthIndex] + " " + day + ", " + year;
    }


    format_yyyy_mm_dd(date) {
        var day = date.getDate();
        day = date.getDate() < 10 ? "0" + day : day;
        var monthIndex = date.getMonth() + 1;
        monthIndex = monthIndex < 10 ? "0" + monthIndex : monthIndex;
        var year = date.getFullYear();
        return year + "/" + monthIndex + "/" + day;
    }


    format_yyyy_mm_dd_hyphen(date) {
        var day = date.getDate();
        day = date.getDate() < 10 ? "0" + day : day;
        var monthIndex = date.getMonth() + 1;
        monthIndex = monthIndex < 10 ? "0" + monthIndex : monthIndex;
        var year = date.getFullYear();
        return year + "-" + monthIndex + "-" + day;
    }


    getDateInISOFormat(daysToAdd = 0) {
        return this.addDays(new Date(), daysToAdd).toISOString();
    }


    getTodaysDateInISOFormat() {
        return this.addDays(new Date(), 0).toISOString();
    }


    getTodaysDate_yyyy_mm_dd() {
        return this.format_yyyy_mm_dd(this.addDays(new Date(), 0));
    }


    getTodaysDate_yyyy_mm_dd_hyphen() {
        return this.format_yyyy_mm_dd_hyphen(this.addDays(new Date(), 0));
    }


    formatWithGivenSeparator(date, separator) {
        var day = date.getDate();
        day = date.getDate() < 10 ? "0" + day : day;
        var monthIndex = date.getMonth() + 1;
        monthIndex = monthIndex < 10 ? "0" + monthIndex : monthIndex;
        var year = date.getFullYear();
        return year + separator + monthIndex + separator + day;
    }


    getTodaysDateWithGivenSeparator(separator) {
        return this.formatWithGivenSeparator(this.addDays(new Date(), 0), separator);
    }


    getFutureDateWithGivenSeparator(separator, daysToAdd) {
        return this.formatWithGivenSeparator(this.addDays(new Date(), daysToAdd), separator);
    }


    getOneYearFutureWithGivenSeparator(separator) {
        return this.formatWithGivenSeparator(this.addDays(new Date(), 365), separator); // Return future date after 1 Year
    }


    getTodaysDate(appendZero) {
        if (appendZero === "appendZero") {
            return this.format(this.addDays(new Date(), 0), "yes");
        } else {
            return this.format(this.addDays(new Date(), 0), "no");
        }
    }


    getOneYearFutureDate_yyyy_mm_dd() {
        return this.format_yyyy_mm_dd(this.addDays(new Date(), 365)); // Return future date after 1 Year
    }


    getFirstDateOfFutureMonth_yyyy_mm_dd(monthsToAdd) {
        let d = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        d.setMonth(d.getMonth() + monthsToAdd);
        return this.format_yyyy_mm_dd(d);
    }


    getFutureDate_yyyy_mm_dd(daysToAdd = 0) {
        return this.format_yyyy_mm_dd(this.addDays(new Date(), daysToAdd)); // Return future date based on provided additional days
    }


    getDay() {
        let date = new Date();
        return date.getDate();
    }


    getFutureDay(daysToAdd) {
        const date = new Date(); // Get the current date
        date.setDate(date.getDate() + daysToAdd); // Add the specified number of days
        return date.getDate(); // Return only the day of the month
    }


    getDate() {
        let date = new Date();
        return date.getDate();
    }


    getCurrentMonth() {
        let date = new Date();
        let month = date.getMonth();
        return month + 1;
    }


    getCurrentMonthInString() {
        let monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let date = new Date();
        let month = date.getMonth();
        return monthNames[month];
    }


    getCurrentMonthInFullString() {
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = new Date();
        let month = date.getMonth();
        return monthNames[month];
    }


    getCurrentYear() {
        let date = new Date();
        let year = date.getFullYear();
        return year;
    }


    getLastYear() {
        let currentDate = new Date();
        let previousDate = new Date(currentDate);
        previousDate.setFullYear(currentDate.getFullYear() - 1);
        previousDate = new Date(previousDate);
        let year = previousDate.getFullYear();
        return year;
    }


    getFirstDateofLastMonth() {
        let currentDate = this.getDay();
        return this.format(this.addDays(new Date(), -currentDate - 1), "yes");
    }


    getFirstDateOfCurrentMonth() {
        let currentDate = this.getDay();
        return this.format(this.addDays(new Date(), -currentDate + 1), "yes");
    }


    getFirstDateOfCurrentMonth_yyyy_mm_dd() {
        let currentDate = this.getDay();
        return this.format_yyyy_mm_dd(this.addDays(new Date(), -currentDate + 1), "yes");
    }


    getLastDateOfCurrentMonth_yyyy_mm_dd() {
        const currentDate = new Date();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        return this.format_yyyy_mm_dd(lastDate);
    }


    getLastDateOfCurrentMonth() {
        const currentDate = new Date();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        return this.format(lastDate);
    }


    getLastDateOfNextMonth() {
        let currentDate = this.getDay();
        return this.format(this.addDays(new Date(), 60 - currentDate));
    }


    getFutureDate(daysToAdd) {
        return this.format(this.addDays(new Date(), daysToAdd)); // Return future date based on provided additional days
    }


    twoYearsFutureLeaseStartDate() {
        return this.format(this.addDays(new Date(), 400));
    }


    getOneYearFutureDate() {
        return this.format(this.addDays(new Date(), 365)); // Return future date after 1 Year
    }


    getOneYearFutureDate_yyyy_mm_dd() {
        return this.format_yyyy_mm_dd(this.addDays(new Date(), 365));
    }


    pastInvoiceDuetDate() {
        return this.format(this.addDays(new Date(), -11));
    }


    futureInvoiceDueDate() {
        return this.format(this.addDays(new Date(), 5));
    }


    getTodaysDatePlusOneMonth(noOfMonths, appendZero) {
        if (appendZero === "appendZero") {
            return this.format(this.addMonths(new Date(), noOfMonths), "yes");
        } else {
            return this.format(this.addMonths(new Date(), noOfMonths), "no");
        }
    }


    addMonths(aDate, numberOfMonths) {
        aDate.setDate(1);
        aDate.setMonth(((aDate.getMonth() + numberOfMonths) % 12) + 1); // Add numberOfDays
        return aDate; // Return the date
    }


    getFutureMonth(monthToAdd) {
        return ((new Date().getMonth() + monthToAdd) % 12) + 1;
    }


    isLeapYear(year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }


    //from jan to dec
    getCurrentYearRange() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const startDate = new Date(currentYear, 0, 1);
        const endDate = new Date(currentYear, 11, 31);
        const startDateString = startDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();
        const endDateString = endDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();
        return startDateString + " - " + endDateString;
    }


    addMonthsAndGetLastDate(monthsToAdd, appendZero) {
        var currentDate = new Date();
        var adjustedDate = new Date(currentDate.setMonth(currentDate.getMonth() + monthsToAdd));
        var lastDateOfMonth = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth() + 1, 0); // Get last day of adjusted month


        var formattedAdjustedDate = this.format(adjustedDate, appendZero);
        var formattedLastDateOfMonth = this.format(lastDateOfMonth, appendZero);


        return {
            adjustedDate: formattedAdjustedDate,
            lastDateOfMonth: formattedLastDateOfMonth,
        };
    }


    getPreviousDateOfNextYear() {
        let currentDate = new Date();
        let futureDate = new Date(currentDate);
        futureDate.setFullYear(currentDate.getFullYear() + 1);
        let previousDate = new Date(futureDate);
        previousDate.setDate(futureDate.getDate() - 1);
        return this.format(previousDate, 0);
    }


    formatAbbreviatedMonthToFull(dateString) {
        const date = new Date(dateString);
        const options = { month: "long", day: "numeric", year: "numeric" };
        let formattedDate = date.toLocaleDateString("en-US", options);
        return formattedDate;
    }


    format_MM_YYYY(date) {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var monthIndex = date.getMonth();
        var year = date.getFullYear();


        return monthNames[monthIndex] + " " + year;
    }


    getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");


        const ampm = hours >= 12 ? "PM" : "AM";


        hours = hours % 12;
        hours = hours ? String(hours).padStart(2, "0") : "12";


        return `${hours}:${minutes} ${ampm}`;
    }


    getOneYearFutureDateForCCExpiry() {
        const currentDate = new Date(); // Get the current date
        const currentMonth = currentDate.getMonth() + 1; // Current month (0-indexed)
        const currentYear = currentDate.getFullYear(); // Current year


        // Set the expiry date to be 1 year from the current date
        const expiryMonth = currentMonth; // Expiry month is next month
        const expiryYear = currentYear + 1; // If current month is December, increment the year


        // Format the month and year as MM/YYYY
        const formattedMonth = (expiryMonth < 10 ? "0" : "") + expiryMonth;
        const formattedYear = expiryYear;


        return `${formattedMonth}/${formattedYear}`;
    }


    getLessThanSixMonthFutureDateForCCExpiry() {
        const currentDate = new Date(); // Get the current date
        const currentMonth = currentDate.getMonth(); // Current month (0-indexed)
        const currentYear = currentDate.getFullYear(); // Current year


        // Set the expiry date to be 1 year from the current date
        const expiryMonth = currentMonth + 4; // Expiry month is next month
        const expiryYear = currentMonth === 11 ? currentYear + 1 : currentYear; // If current month is December, increment the year


        // Format the month and year as MM/YYYY
        const formattedMonth = (expiryMonth < 10 ? "0" : "") + expiryMonth;
        const formattedYear = expiryYear;


        return `${formattedMonth}/${formattedYear}`;
    }


    getSameMonthDateForCCExpiry() {
        const currentDate = new Date(); // Get the current date
        const currentMonth = currentDate.getMonth() + 1; // Current month (0-indexed)
        const currentYear = currentDate.getFullYear(); // Current year


        // Set the expiry date to be 1 year from the current date
        const expiryMonth = currentMonth; // Expiry month is next month
        const expiryYear = currentYear; // If current month is December, increment the year


        // Format the month and year as MM/YYYY
        const formattedMonth = (expiryMonth < 10 ? "0" : "") + expiryMonth;
        const formattedYear = expiryYear;


        return `${formattedMonth}/${formattedYear}`;
    }


    // Accept input in format: "Sep 14, 1974"; Output: "1974-09-14"
    formatDateToISO(dobString) {
        const months = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12",
        };
        const [month, day, year] = dobString.replace(",", "").split(" ");
        return `${year}-${months[month]}-${day.padStart(2, "0")}`;
    }


    getTotalDaysInCurrentMonth() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();


        return lastDay;
    }


    getCurrentMonthFirstDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const firstDate = new Date(year, month, 1, 0, 0, 0);
        return (
            firstDate.getFullYear() +
            "-" +
            String(firstDate.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(firstDate.getDate()).padStart(2, "0") +
            "T00:00:00"
        );
    }


    getCurrentMonthLastDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const lastDate = new Date(year, month + 1, 0, 0, 0, 0);
        return (
            lastDate.getFullYear() +
            "-" +
            String(lastDate.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(lastDate.getDate()).padStart(2, "0") +
            "T00:00:00"
        );
    }
}


export default new dateUtils();

















