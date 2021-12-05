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
const min = 1;
const max = 5000;
const years = [];
for (let i = min; i < max; i++) {
    years.push(i)
}

// main program
let month = 0;
let day = 0;
const date = `${pad(month + 1)}-${pad(dates[month][day])}-2021`; // +1 is beacuse jan 1st is 1-1, not 0-0..we sliced off [0] in arrays
let winners = 0;

function findDates() {
    let year = 0;
    for (let i = 0; i < (max - min) * 365; i++) {
        const date = `${pad(month + 1)}-${pad(dates[month][day])}-${years[year]}`

        // check FOR PALINDROME and AMBIGRAM
        let str = date.replace(/-/g, "");
        let rev = str.split("").reverse().join("");
        if (rev === str) {
            // console.log(date)
            if (isAmbigram(str)) {
                console.log(`ANGIGRAM- ${date}`)
                winners++;
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
findDates();
console.log(`there are ${winners} total in 1 Million Years`)