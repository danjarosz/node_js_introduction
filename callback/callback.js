const fs = require("fs");

fs.readFile("./text.txt", "utf-8", (err, file) => {
  if (!err) {
    console.log(file);
  }
});

const add = (a, b) => a + b;
const division = (number1, number2) => number1 / number2;

const math = (a, b, callback) => {
  const value = callback(a, b);
  console.log(value);
};

math(4, 5, add);
math(20, 5, division);
