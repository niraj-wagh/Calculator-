const display = document.getElementById("display");
const resultBox = document.getElementById("result");

function press(val) {
  display.value += val;
}

function clearAll() {
  display.value = "";
  resultBox.innerText = "";
}

function calculate() {
  try {
    let expr = display.value
      .replace(/÷/g, "/")
      .replace(/×/g, "*");

    const result = eval(
      expr
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/sqrt/g, "Math.sqrt")
    );

    resultBox.innerText = "Result: " + result;
  } catch {
    resultBox.innerText = "❌ Invalid Expression";
  }
}
