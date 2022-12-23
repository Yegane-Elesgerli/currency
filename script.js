let leftBtn = document.querySelectorAll(".valuleft");
let rightBtn = document.querySelectorAll(".valuright");

let inputfirst = document.querySelector(".inputfrom");
let inputsecond = document.querySelector(".inputto");

let leftText = document.querySelector(".left-text");
let rightText = document.querySelector(".right-text");   

let leftCurrency = "RUB";
let rightCurrency = "USD";

leftCur();

leftBtn.forEach((item)=>{
    item.addEventListener("click", (e)=>{
        leftBtn.forEach((item) =>{
            item.classList.remove("checked");
        });
        leftCurrency = e.target.innerHTML;
        leftCur();
        rightCur();

        e.target.classList.add("checked");
    });
});

rightBtn.forEach((item)=>{
    item.addEventListener("click", (e) =>{
        rightBtn.forEach((item)=>{
            item.classList.remove("checked");
        });
            rightCurrency = e.target.innerHTML;
            leftCur();
            rightCur();

            e.target.classList.add("checked");
    });
});

function leftCur() {
    fetch(
        `https://api.exchangerate.host/latest?base=${leftCurrency}&symbols=${rightCurrency}`
    )
    .then((res) => res.json())
    .then((data) => {
        leftText.innerHTML = `1 ${leftCurrency} = ${data.rates[rightCurrency].toFixed(4)} ${rightCurrency}`;
        if(isNaN(inputfirst.value)) {
            inputsecond.value = "";
            
        }
        else {
            inputsecond.value= (inputfirst.value * data.rates[rightCurrency]).toFixed(2);
        }

        inputfirst.addEventListener("keyup", (e)=>{
            inputfirst.value = e.target.value;
            inputfirst.value = inputfirst.value.split(",").join(".");
            if(isNaN(inputfirst.value)) {
                inputsecond.value = "";
            }
            else {
                inputsecond.value= (inputfirst.value * data.rates[rightCurrency]).toFixed(2);
            }

        });
    });
}

function rightCur () {
    fetch(
        `https://api.exchangerate.host/latest?base=${rightCurrency}&symbols=${leftCurrency}`
    )
    .then((res)=> res.json())
    .then((data) => {
    rightText.innerHTML = `1 ${rightCurrency} = ${data.rates[leftCurrency].toFixed(4)} ${leftCurrency}`;

    inputsecond.addEventListener("keyup", (e)=>{
        inputsecond.value = e.target.value;
        inputsecond.value=inputsecond.value.split(",").join(".");

        if(isNaN(inputsecond.value)){
            inputfirst.value="";
        }
        else{
            inputfirst.value = (inputsecond.value * data.rates[leftCurrency]).toFixed(2); 
        }
    });
    });
}

fetch(
    `https://api.exchangerate.host/latest?base=${rightCurrency}&symbols=${leftCurrency}`
)
.then((res) => res.json())
.then((data) =>{
    leftText.innerHTML = `1${rightCurrency} = ${data.rates[leftCurrency]} ${leftCurrency}`;
    if(isNaN(inputsecond.value)) {
        inputfirst.value = "";
    }
    else{
        inputfirst.value = (inputsecond.value * data.rates[leftCurrency]).toFixed(2);
    }

    inputsecond.addEventListener("keyup", (e) =>{
        inputsecond.value= e.target.value;
        inputsecond.value= inputsecond.value.split(",").join(".");

        if(isNaN(inputsecond.value)) {
            inputfirst.value = "";
        }
        else{
            inputfirst.value = (inputsecond.value * data.rates[leftCurrency]).toFixed(2);
        }
    });
});