const btn = document.querySelector('.arrow');
const mainInfo = document.getElementsByClassName('main-info');
const info = document.querySelector('.info');
const input = document.getElementsByTagName('INPUT');
const resultInfo = document.querySelector('.result-info');
const year = document.querySelector('#year');
const month = document.querySelector('#month');
const day = document.querySelector('#day');
const date = new Date();

btn.addEventListener('click', (e) => {
    e.preventDefault();
    validationBlank();
    infoFull();
});

day.addEventListener('change', changeInput);
month.addEventListener('change', changeInput);
year.addEventListener('change', changeInputYear);

function changeInput(e){
    const numRegex = /^\d+$/;
    if(!numRegex.test(e.target.value) || e.target.value.length !== 2 || e.target.value <= 0){
        e.target.value = '';
    }
}

function changeInputYear(e){
    const numRegex = /^\d+$/;
    if(!numRegex.test(e.target.value) || e.target.value.length !== 4 || e.target.value <= 0){
        e.target.value = '';
    }
}

function validationBlank() {
    for (let data of input) {
        switch (true) {
            case (data.value === ''):
                cleanMessage(data);
                data.style = 'border-color:red';
                data.parentElement.children[0].style = 'color:red';
                message('This field is required', data);
                break;
            case (data.id === 'day' && data.value > 31):
                cleanMessage(data);
                data.style = 'border-color:red';
                data.parentElement.children[0].style = 'color:red';
                message('Must be a valid day', data);
                break;
            case (data.id === 'month' && data.value > 12):
                cleanMessage(data);
                data.style = 'border-color:red';
                data.parentElement.children[0].style = 'color:red';
                message('Must be a valid month', data);
                break;
            case (data.id === 'year' && data.value > date.getFullYear()):
                cleanMessage(data);
                data.style = 'border-color:red';
                data.parentElement.children[0].style = 'color:red';
                message('Must be in the past', data);
                break;
            default:
                data.style = 'none';
                data.parentElement.children[0].style = 'none';
                cleanMessage(data);
                break;
        }
    }
}

function message(text, reference) {
    const p = document.createElement('P');
    p.textContent = text;
    p.classList.add('validation');
    reference.parentElement.appendChild(p);
}
function cleanMessage(reference) {
    if (reference.parentElement.children[2]) {
        reference.parentElement.lastChild.remove();
    }
}

function infoFull() {
    const dayInfo = mainInfo[0].children[0].children[2];
    const monthInfo = mainInfo[0].children[1].children[2];
    const yearInfo = mainInfo[0].children[2].children[2];
    if (!dayInfo && !monthInfo && !yearInfo) {
        var currentDate = new Date();
        var currentDay = currentDate.getDate();
        var currentMonth = currentDate.getMonth() + 1;
        var currentYear = currentDate.getFullYear();

        var totalYears = currentYear - year.value;
        var totalMonths = currentMonth - month.value;
        var totalDays = currentDay - day.value;

        if (totalDays < 0) {
            totalMonths--;
            totalDays += new Date(currentYear, currentMonth - 1, 0).getDate();
        }

        if (totalMonths < 0) {
            totalYears--;
            totalMonths += 12;
        }
        resultInfo.children[0].firstChild.textContent = totalYears + ' ';
        resultInfo.children[1].firstChild.textContent = totalMonths + ' ';
        resultInfo.children[2].firstChild.textContent = totalDays + ' ';
    }
}

