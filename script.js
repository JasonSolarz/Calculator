const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll(".number");
const arithmetic = document.querySelectorAll(".arithmetic");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");

let firstValue = true;
let values = ["", ""];
let operand = null;

document.addEventListener("keydown", (e) => {
    let key = e.key;
    keyHandler(key);
});

function keyHandler(key) {
    let numKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    let arithmeticKeys = ["/", "*", "-", "+", "=", "Enter"];
    if (numKeys.includes(key)) {
        if (key === ".") {
            if (!checkDuplicateDot()) {
                updateValues(key);
                updateScreen(key);
            }
        } else {
            updateValues(key);
            updateScreen(key);
        }

    }

    if (arithmeticKeys.includes(key)) {
        if (values[0] !== "") {
            firstValue = false;
        }
        switch(key) {
            case "/":
                setOperand(divide)
                break;
            case "*":
                setOperand(multiply)
                break;
            case "-":
                setOperand(subtract)
                break;
            case "+":
                setOperand(add)
                break;
            case "=":
                calculate();
                break;
            case "Enter":
                calculate();
                break;
            default:
        }
    }
}

numberBtns.forEach(number => {
    number.addEventListener("click", () => {
        let input = number.textContent;
        if (input === ".") {
            if (!checkDuplicateDot()) {
                updateValues(input);
                updateScreen(input);
            }
        } else {
            updateValues(input);
            updateScreen(input);
        }

    })
});

arithmetic.forEach(button => {
    button.addEventListener("click", () => {
        if (values[0] !== "") {
            firstValue = false;
        }
        switch(button.textContent) {
            case "/":
                setOperand(divide)
                break;
            case "*":
                setOperand(multiply)
                break;
            case "-":
                setOperand(subtract)
                break;
            case "+":
                setOperand(add)
                break;
            default:
        }
    })
})

equalBtn.addEventListener("click", calculate);
clearBtn.addEventListener("click", clear);

function calculate() {
    let total;
    if (values[0] !== "" && values[1] !== ""){
        total = operate(operand, values[0], values[1]);
        display.textContent = total;
        values[0] = total;
        values[1] = "";
    }
}

function setOperand(op) {
    if (values[1] !== "") {
        calculate();
    }
    operand = op;
}

function updateValues(input) {
    if (firstValue) {
        values[0] += input;
    } else {
        values[1] += input;
    }
};

function updateScreen(content) {
    if (values[1] === "") {
        display.textContent = values[0];
    } else {
        display.textContent = values[1]
    }

};

function checkDuplicateDot() {
    if (display.textContent.includes(".")) {
        return true;
    } else {
        return false;
    }
};

function clear() {
    display.textContent = "";
    values[0] = "";
    values[1] = "";
    firstValue = true;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

function operate(operator = add, num1, num2) {
    return operator(Number(num1), Number(num2));
};