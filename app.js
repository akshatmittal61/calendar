console.clear();
const darkButton = document.getElementById("dark");
const lightButton = document.getElementById("light");
const body = document.body;
const theme = localStorage.getItem("theme");
if (theme) {
    body.classList.add(theme);
}
if (theme === "dark") {
    darkButton.classList.add("dispn");
    lightButton.classList.remove("dispn");
}
else if (theme === "light") {
    lightButton.classList.add("dispn");
    darkButton.classList.remove("dispn");
}
else {
    body.classList.add("dark");
    darkButton.classList.add("dispn");
    lightButton.classList.remove("dispn");
}
const removeAllClasses = () => {
    body.classList.remove(...body.classList.value.split(" "));
};
darkButton.onclick = () => {
    removeAllClasses();
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    darkButton.classList.add("dispn");
    lightButton.classList.remove("dispn");
};
lightButton.onclick = () => {
    removeAllClasses();
    body.classList.add("light");
    localStorage.setItem("theme", "light");
    lightButton.classList.add("dispn");
    darkButton.classList.remove("dispn");
};

const mcode = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
const ycode = [5, 6, 0, 1, 3, 4, 5, 6, 1, 2, 3, 4, 6, 0, 1, 2, 4, 5, 6, 0, 2, 3, 4, 5, 0, 1, 2, 3];
const dcode = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const Month_short3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
for (let j = 0; j < Month_short3.length; j++) {
    if (Date().substring(4, 7) == Month_short3[j]) {
        document.querySelector("#month").innerHTML = j + 1;
        document.querySelector(".month").innerHTML = Month[j];
    }
}
document.querySelector("#year").innerHTML = parseInt(Date().substring(11, 15));
let year = document.querySelector("#year").innerHTML;
let month = document.querySelector("#month").innerHTML;
let Mon = document.querySelector(".month").innerHTML;
let mon = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
let Day = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let leap = false;
let day;
// month=2;
// year=2004;
function chmonth() {
    mon = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    Day = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) leap = true;
            else leap = false;
        }
        else leap = true;
    }
    else leap = false;
    if (((month == 4 || month == 6 || month == 9 || month == 11))) { mon.pop(); Day.pop(); }
    else if (month == 2 && leap == true) {
        mon.pop(); mon.pop(); Day.pop(); Day.pop();
    }
    else if (month == 2 && leap == false) {
        mon.pop(); mon.pop(); mon.pop(); Day.pop(); Day.pop(); Day.pop();
    }
    let cal_head=document.querySelector(".head");
    cal_head.setAttribute("style","background-color: var(--"+Month_short3[month-1]+"_color);");
}
function chdate() {
    let i = 0, k = 0;
    for (i = 0; i < 35; i++) {
        document.querySelector("._" + i).innerHTML = "";
    }
    for (i = 0; i < mon.length; i++) {
        date = mon[i];
        day = (date + mcode[month - 1] + ycode[year % 28]) % 7;
        if (leap == true && (month == 1 || month == 2)) {
            if (day == 0) day = 6;
            else day--;
        }
        Day[i] = dcode[day];
        let prcode = ((day + 5) % 7) + k * 7;
        if (prcode % 7 == 6) k++;
        if (prcode == 34 && i < mon.length) k = 0;
        document.querySelector("._" + prcode).innerHTML = i + 1;
        console.log(`${document.querySelector(".month").innerHTML} ${date} ${year}= ${Day[i]}`);
    }
    for (let i = 0; i < 35; i++) {
        document.querySelector("._" + i).setAttribute("style","background-color: inherit;");
    }
    for (let i = 0; i < mon.length; i++) {
        if(document.querySelector("._" + i).innerHTML==parseInt(Date().substring(8,10)))
        {
            document.querySelector("._" + i).setAttribute("style","background-color: var(--"+Month_short3[month-1]+"_color);");
        }
    }
}
chmonth();
chdate();

const back = document.querySelector(".back");
const forward = document.querySelector(".forward");
back.addEventListener("click", () => {
    console.clear();
    if (month > 1) {
        month--;
        Mon = Month[month - 1];
        document.querySelector(".month").innerHTML = Mon;
        chmonth();
        chdate();
    }
    else {
        month = 12;
        Mon = Month[month - 1];
        document.querySelector(".month").innerHTML = Mon;
        year--;
        document.querySelector("#year").innerHTML = year;
        chmonth();
        chdate();
    }
})
forward.addEventListener("click", () => {
    console.clear();
    if (month < 12) {
        month++;
        Mon = Month[month - 1];
        document.querySelector(".month").innerHTML = Mon;
        chmonth();
        chdate();
    }
    else {
        month = 1;
        Mon = Month[month - 1];
        document.querySelector(".month").innerHTML = Mon;
        year++;
        document.querySelector("#year").innerHTML = year;
        chmonth();
        chdate();
    }
})