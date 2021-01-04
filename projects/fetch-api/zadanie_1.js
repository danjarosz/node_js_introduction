// http://numbersapi.com/random/year?json

const fetch = require("node-fetch");

const year = process.argv[2] || Math.floor(Math.random() * 2020);

fetch(`http://numbersapi.com/${year}/year?json`)
  .then((response) => {
    console.log(response.status);
    console.log(response.ok);
    return response.json();
  })
  .then((data) => {
    console.log(data.text);
  })
  .catch((err) => {
    throw new Error(err);
  });
