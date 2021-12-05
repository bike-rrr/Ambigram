// const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
// const years = "2021"


// while (!day.includes("December") && !day.includes("30")) {

// }
// let month = 0;
// let day = 0;
// let year = 0;

// for (let i = 0; i < 20; i++) {

// }
function pad(num) {
    let sub = "00";
    let number = "" + num.toString();
    // console.log("number is: ", sub.substring(0, sub.length - num.toString().length) + number)
    return sub.substring(0, sub.length - num.toString().length) + number;
}

// get days for Each month
function populateDays(days) {
    return Array.from(Array(days).keys()).slice(1);
}
const dates = [];
const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // we start at 2000 for leap year, so FEB has 29 days 
for (let i = 0; i < 12; i++) {                                     // we switch back and forth inside printDate Function
    dates.push(populateDays(monthDays[i] + 1));
}
// populate years
const min = 0;
const max = 100000;
const years = [];
for (let i = min; i < max; i++) {
    years.push(i)
}

// main program
let month = 0;
let day = 0;
// console.log(dates)

const date = `${pad(month + 1)}-${pad(dates[month][day])}-2021`; // +1 is beacuse jan 1st is 1-1, not 0-0..we sliced off [0] in arrays

function printdates() {
    let year = 0;
    for (let i = 0; i < (max - min) * 365; i++) {
        const date = `${pad(month + 1)}${pad(dates[month][day])}${years[year]}`

        // check FOR PALINDROME and AMBIGRAM
        // let str = date.replace(/-/g, "");
        let rev = date.split("").reverse().join("");
        if (date === rev) {
            if (isAmbigram(rev)) {
                console.log(date)
            }
        }

        // CHECK FOR END OF MONTH
        if (dates[month][day] === dates[month].length) {
            // CHECK FOR LAST DAY OF YEAR
            if (month === 11) {
                // console.log('last day of year')
                month = 0;
                day = 0;
                year++;
                checkForLeapYear(year); // checks the next year
            }
            // ITS JUST THE END OF THE MONTH
            else {
                month++;
                day = 0;
            }
        }
        else {
            day++
        }
    }
}

function checkForLeapYear(year) {
    if (year % 4 === 0) {
        dates[1] = Array.from(Array(29 + 1).keys()).slice(1)
    } else {
        dates[1] = Array.from(Array(28 + 1).keys()).slice(1)
    }
}

function isAmbigram(str) {
    let itsAmbigram = true;
    const AMBIGRAM_CHARS = ['0', '1', '2', '5', '8'];
    for (let i = 0; i < str.length; i++) {
        if (!AMBIGRAM_CHARS.includes(str[i])) {
            itsAmbigram = false;
        }
    }
    if (itsAmbigram) {
        return true;
    }
}
printdates();
// console.log(years);
// console.log(isAmbigram('88007'))