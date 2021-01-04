// `http://numbersapi.com/${number}/${type}?json`

const fetch = require("node-fetch");

const arg = process.argv[2];
let type = "";

if (arg.indexOf("--year") === 0) {
  console.log("Szukamy informacji o roku...");
  type = "year";
} else if (arg.indexOf("--math") === 0) {
  console.log("Szukamy informacji o liczbie...");
  type = math;
} else if (arg.indexOf("--trivia") === 0) {
  console.log("Szukamy informacji o liczby-ciekawostki...");
  type = "trivia";
}

const equalSign = arg.search("=");
if (equalSign === -1) {
  console.log("Nie wpisałeś liczby");
  process.exit();
}

const number = arg.slice(equalSign + 1);
if (number === "" || isNaN(Number(number))) {
  console.log("Nie wpisałeś liczby");
  process.exit();
}

fetch(`http://numbersapi.com/${number}/${type}?json`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Coś jest nie tak...: " + response.status);
    }
  })
  .then((data) => {
    console.log(data.text);
  })
  .catch((err) => {
    throw new Error(err);
  });
