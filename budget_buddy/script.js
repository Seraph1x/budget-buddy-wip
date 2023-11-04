const amount = document.getElementById('amount');
const incomesource = document.getElementById('incomesource');
const click_btn = document.getElementById('click');
const resultEl = document.getElementById('result');

let l = new Date;
let day = l.getDate();
let month = l.getMonth();
let year = l.getFullYear();

let todaysdata = [];

let gamesdata = [];
let tradesdata = [];
let tradestotal = 0;
let gamestotal = 0;

function makeresult() {

    let data = {
        datadate: new Date,
        amount: amount.value,
        source: incomesource.value,
    };

    if (localStorage.getItem('dataList') === null) {
        localStorage.setItem('dataList' , '[]');
        let oldData = [];
        oldData.push(data);
        localStorage.setItem('dataList', JSON.stringify(oldData , null , 1));
        console.log(localStorage.getItem('dataList') + 'storage');
        console.log('logged first data');
    } else {

        let oldData = [];
        oldData.push(JSON.stringify(data , null , 1));
        let oldStorage = JSON.parse(localStorage.getItem('dataList'));
        oldData.push(JSON.stringify(oldStorage , null , 1).slice(1 , -1));
        localStorage.setItem('dataList', '[' + oldData + ']');
        console.log('logged data');

    }

};


function showdata() {

    if (day < 10) {
        day = '0' + day;
    }

    let rin = JSON.parse(localStorage.getItem('dataList'));

    function getdatadate() {
        for (d = 0 ; d < rin.length ; d++) {
            if (rin[d].datadate.includes(year + '-' + (month + 1) + '-' + day)) {
                todaysdata.push(rin[d]);
            } else {}
        }

        document.getElementById('date').textContent = todaysdata[0].datadate;
    }

    getdatadate();

    function tradesort() {
        for (m = 0 ; m < todaysdata.length ; m++) {
            if (todaysdata[m].source.includes('trade')) {
                tradesdata.push(todaysdata[m]);
            } else {}
        }
        for (n = 0 ; n < tradesdata.length ; n++) {
            tradestotal = tradestotal + parseInt(tradesdata[n].amount);
        }
    }

    function gamessort() {
        for (m = 0 ; m < todaysdata.length ; m++) {
            if (todaysdata[m].source.includes('games')) {
                gamesdata.push(todaysdata[m]);
            } else {}
        }
        for (n = 0 ; n < gamesdata.length ; n++) {
            gamestotal = gamestotal + parseInt(gamesdata[n].amount);
        }
    }

    tradesort();
    gamessort();

    document.getElementById('trades_total').textContent = tradestotal + ' in total trades for' + tradesdata.length + ' inputs';
    document.getElementById('games_total').textContent = gamestotal + ' in total games for ' + gamesdata.length + ' inputs';
    document.getElementById('overall_total').textContent = (gamestotal + tradestotal) + ' in total for ' + todaysdata.length + ' inputs';

}




function clearstorage() {
    localStorage.clear();
}