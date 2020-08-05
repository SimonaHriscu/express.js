const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Home
app.get("/", (req, res) => {
  res.send(`Choose between '/calculator' or '/bmicalculator' in the URL`);
});

app.use(bodyParser.urlencoded({ extended: true })); // extended posts nested obj
//we use when we try to pass info that comes from a html form

//Basic Calculator
app.get("/calculator", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // sendFile for files
});
app.post("/calculator", (req, res) => {
  let num1 = Number(req.body.num1); // to turn string in number
  let num2 = Number(req.body.num2);
  let result = 0;
  switch (req.body.select) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
  }
  res.send(`The result is ${result}`);
});

//BMI Calculator router
app.get("/bmicalculator", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html"); // sendFile for files
});

app.post("/bmicalculator", (req, res) => {
  let height = parseFloat(req.body.height); // to turn string in number
  let weight = parseFloat(req.body.weight);
  let bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);
  let status = "";
  if (bmi < 18.5) {
    status = "Underweight";
  } else if (bmi > 18.5 && bmi < 24.9) {
    status = "Normal";
  } else if (bmi > 25.0 && bmi < 29.9) {
    status = "Overweight";
  } else if (bmi >= 30.0) {
    status = "Obese";
  }
  res.send(
    `Your BMI is: <span style="font-weight: bold; font-size: 1.2rem">${bmi}</span>, your Weight Status is: <span style="font-weight: bold ; color: red; font-size: 1.2rem">${status}</span>`
  );
});
app.listen(port, () => {
  console.log(`Listening to localhost:${port}`);
});
