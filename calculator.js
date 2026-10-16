const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === "clear") {
      expression = "";
    } else if (action === "delete") {
      expression = expression.slice(0, -1);
    } else if (action === "equals") {
      try {
        expression = String(evaluate(expression));
      } catch {
        expression = "Error";
      }
    } else if (value) {
      expression += value;
    }

    display.value = expression;
  });
});

function evaluate(expr) {
  if (!/^[0-9+\-*/.\s]*$/.test(expr)) {
    throw new Error("Invalid expression");
  }
  return Function(`"use strict"; return (${expr})`)();
}
