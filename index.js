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
const leapYear = dates[1] = Array.from(Array(30).keys()).slice(1);
const notLeapYear = dates[1] = Array.from(Array(29).keys()).slice(1);

// populate years
const min = 1;
const max = 10000;
const years = [];
for (let i = min; i < max; i++) {
    years.push(i)
}

// main program
let month = 0;
let day = 0;
// const date = `${pad(month + 1)}-${pad(dates[month][day])}-2021`; // +1 is beacuse jan 1st is 1-1, not 0-0..we sliced off [0] in arrays
let winners = 0;

function findDates() {
    let year = 0;
    let time_Diff = (max - min) * 365;
    for (let i = 0; i < time_Diff; i++) {
        const date = `${pad(month + 1)}${pad(dates[month][day])}${years[year]}`

        // check FOR PALINDROME and AMBIGRAM
        let rev = '';
        for (let i = date.length - 1; i >= 0; i--) {
            rev += date[i];
        }
        // palindrome check
        if (rev === date) {
            // console.log(date)
            // ambigram check
            if (isAmbigram(rev)) {
                // console.log(`ANGIGRAM- ${date}`)
                winners++;
                console.log(`${date} **`)
            } else {
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
        // dates[1] = Array.from(Array(30).keys()).slice(1)
        dates[1] = leapYear;
    } else {
        // dates[1] = Array.from(Array(29).keys()).slice(1)
        dates[1] = notLeapYear;
    }
}

function isAmbigram(str) {
    let itsAmbigram = true;
    const AMBIGRAM_CHARS = ['0', '1', '2', '5', '8'];
    for (let i = 0; i < str.length; i++) {
        if (!AMBIGRAM_CHARS.includes(str[i])) {
            itsAmbigram = false;
            break;
        }
    }
    if (itsAmbigram) {
        return true;
    }
}
console.log("** Ambigram as well")
console.log("")
const start = new Date();
findDates();
const end = new Date();
console.log(`time is ${end - start}`)
console.log()
console.log(`there are ${winners} total in ${max - min} Years that are both Palindrome and Ambigram`)