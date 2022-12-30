function numberDecomposition(num, numConcat, numCheck) {
    let sign = (Math.sign(num) === -1) ? "минус " : "";

    let hundreds;
    let dozens;
    let units;

    if (sign !== "") {
        num = String(num).slice(1);
    } else {
        num = String(num);
    }

    if (num.length === 3) {
        hundreds = num[0];
        dozens = num[1];
        units = num[2];
    } else if (num.length === 2) {
        hundreds = "";
        dozens = num[0];
        units = num[1];
    } else if (num.length === 1) {
        hundreds = "";
        dozens = "";
        units = num[0];
    }

    let result = numConcat(sign, hundreds, dozens, units);
    return numCheck(result, num, sign);
}

function numberConcat(sign, hundreds, dozens, units) {
    switch (hundreds) {
        case "1":
            hundreds = "сто";
            break;
        case '2':
            hundreds = "двести";
            break;
        case '3':
            hundreds = "триста";
            break;
        case '4':
            hundreds = "четыреста";
            break;
        case '5':
            hundreds = "пятьсот";
            break;
        case '6':
            hundreds = "шестьсот";
            break;
        case '7':
            hundreds = "семьсот";
            break;
        case '8':
            hundreds = "восемьсот";
            break;
        case '9':
            hundreds = "девятьсот";
            break;
        default:
            hundreds = "";
            break;
    }

    switch (dozens) {
        case '1':
            switch (units) {
                case "0":
                    dozens = " десять";
                    units = "";
                    break;
                case "1":
                    dozens = " одинадцать";
                    units = "";
                    break;
                case "2":
                    dozens = " двенадцать";
                    units = "";
                    break;
                case "3":
                    dozens = " тринадцать";
                    units = "";
                    break;
                case "4":
                    dozens = " четырнадцать";
                    units = "";
                    break;
                case "5":
                    dozens = " пятнадцать";
                    units = "";
                    break;
                case "6":
                    dozens = " шестнадцать";
                    units = "";
                    break;
                case "7":
                    dozens = " семнадцать";
                    units = "";
                    break;
                case "8":
                    dozens = " восемнадцать";
                    units = "";
                    break;
                case "9":
                    dozens = " девятнадцать";
                    units = "";
                    break;
            }
            break;
        case "2":
            dozens = " двадцать";
            break;
        case "3":
            dozens = " тридцать";
            break;
        case "4":
            dozens = " сорок";
            break;
        case "5":
            dozens = " пятьдесят";
            break;
        case "6":
            dozens = " шестьдесят";
            break;
        case "7":
            dozens = " семьдесят";
            break;
        case "8":
            dozens = " восемьдесят";
            break;
        case "9":
            dozens = " девяносто";
            break;
        default:
            dozens = "";
            break;
    }

    switch (units) {
        case '1':
            units = " один";
            break;
        case '2':
            units = " два";
            break;
        case '3':
            units = " три";
            break;
        case '4':
            units = " четыре";
            break;
        case '5':
            units = " пять";
            break;
        case '6':
            units = " шесть";
            break;
        case '7':
            units = " семь";
            break;
        case '8':
            units = " восемь";
            break;
        case '9':
            units = " девять";
            break;
        default:
            units = "";
            break;
    }

    return result = sign + hundreds + dozens + units;
}

function numberCheck(result, num, sign) {
    if (answerNumber > 0) {
        sign = "";
    } else {
        sign = "-";
    }

    if (num === "0") {
        return num;
    } else if (result.length < 20) {
        return result;
    } else {
        return sign + num;
    }
}

let minValueDefault = 0;
let maxValueDefault = 100;

let minValue = parseInt(prompt('Минимальное значение числа для игры', '0')) || minValueDefault;
(minValue < -999) ? minValue = -999 : (minValue >= 1000) ? minValue = 999 : minValue;

let maxValue = parseInt(prompt('Максимальное значение числа для игры', '100')) || maxValueDefault;
(maxValue < -999) ? maxValue = -999 : (maxValue >= 1000) ? maxValue = 999 : maxValue;

if (minValue > maxValue) {
    let buf = minValue;
    minValue = maxValue;
    maxValue = buf;
}

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

let answerNumber = Math.floor((minValue + maxValue) / 2);
console.log(answerNumber);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${numberDecomposition(answerNumber, numberConcat, numberCheck)}?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = parseInt(prompt('Минимальное знание числа для игры', '0')) || minValueDefault;
    (minValue < -999) ? minValue = -999 : (minValue >= 1000) ? minValue = 999 : minValue;

    maxValue = parseInt(prompt('Максимальное знание числа для игры', '100')) || maxValueDefault;
    (maxValue < -999) ? maxValue = -999 : (maxValue >= 1000) ? maxValue = 999 : maxValue;

    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

    answerNumber = Math.floor((minValue + maxValue) / 2);
    console.log(answerNumber);
    orderNumber = 1;
    gameRun = true;

    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${numberDecomposition(answerNumber, numberConcat, numberCheck)}?`;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        console.log(`Максимальное число до ${maxValue}`);
        console.log(`Минимальное число до ${minValue}`);
        console.log(`Текущее число до ${answerNumber}`);
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            let randomFieldNumber = Math.round(Math.random() * 3);
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            console.log(answerNumber);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            let answerFieldArr = [`Да это легко! Ты загадал ${numberDecomposition(answerNumber, numberConcat, numberCheck)}?`, `Наверное, это число ${numberDecomposition(answerNumber, numberConcat, numberCheck)}?`, `Ага! Это число ${numberDecomposition(answerNumber, numberConcat, numberCheck)}?`, `Признавайтесь) Это число ${numberDecomposition(answerNumber, numberConcat, numberCheck)}?`];
            answerField.innerText = answerFieldArr[randomFieldNumber];
            console.log(`Максимальное число после ${maxValue}`);
            console.log(`Минимальное число после ${minValue}`);
            console.log(`Текущее число после ${answerNumber}`);
        }
    }
})

document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun) {
        (minValue === answerNumber && maxValue !== minValue) ? maxValue-- : null;
        console.log(`Максимальное число до ${maxValue}`);
        console.log(`Минимальное число до ${minValue}`);
        console.log(`Текущее число до ${answerNumber}`);
        if (maxValue === minValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            let randomFieldNumber = Math.round(Math.random() * 3);
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            let answerFieldArr = [`Да это легко! Ты загадал ${numberDecomposition(answerNumber, numberConcat, numberCheck)}?`, `Наверное, это число ${numberDecomposition(answerNumber, numberConcat, numberCheck)}?`, `Ага! Это число ${numberDecomposition(answerNumber, numberConcat, numberCheck)}?`, `Признавайтесь) Это число ${numberDecomposition(answerNumber, numberConcat, numberCheck)}?`];
            answerField.innerText = answerFieldArr[randomFieldNumber];
            console.log(`Максимальное число после ${maxValue}`);
            console.log(`Минимальное число после ${minValue}`);
            console.log(`Текущее число после ${answerNumber}`);
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        let randomFieldNumber = Math.round(Math.random() * 3);
        let answerFieldArr = [`Я всегда угадываю\n\u{1F60E}`, `Победа!\n\u{1F913}`, `Рад стараться\n\u{1F917}`, `Ого! Самому не верится, что угадал \n\u{1F626}`];
        answerField.innerText = answerFieldArr[randomFieldNumber];
        gameRun = false;
    }
})
