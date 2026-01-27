const display = document.querySelector(".current");
const opv = document.querySelector(".opv");
const buttons = Array.from(
  document.getElementsByTagName("button"),
);
let firstNumber = "";
let operator = "";
let secondNumber = "";
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const h = btn.getAttribute("data-value");
    switch (h) {
      case "C":
        firstNumber = "";
        operator = "";
        secondNumber = "";
        display.innerHTML = "";
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (firstNumber !== "") {
          operator = h;
          display.innerHTML = operator;
        }
        break;
      case "=":
        if (
          firstNumber !== "" &&
          operator !== "" &&
          secondNumber !== ""
        ) {
          let result;
          switch (operator) {
            case "+":
              result = +firstNumber + +secondNumber;
              break;
            case "-":
              result = +firstNumber - +secondNumber;
              break;
            case "*":
              result = +firstNumber * +secondNumber;
              break;
            case "/":
              result = +firstNumber / +secondNumber;
              break;
          }
          display.innerHTML = result;
          opv.innerHTML =  firstNumber + operator + secondNumber;
          firstNumber = result.toString();
          operator = "";
          secondNumber = "";
        }
        break;
      default:
        if (operator === "") {
          firstNumber += h;
          display.innerHTML = firstNumber;
        } else {
          secondNumber += h;
          display.innerHTML = secondNumber;
        }
        break;
    }
  });
});
