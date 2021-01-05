// `http://api.nbp.pl/api/exchangerates/rates/a/${code}?format=json`

const fetch = require("node-fetch");
const fs = require("fs");

const validCodes = ["usd", "eur", "gbp", "chf"];

const code = process.argv[2];
const isValid = validCodes.includes(code);

if (!isValid) {
  console.log("Ta waluta jest nie obsługiwana");
  process.exit();
}

const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`;

fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Coś jest nie tak...: " + response.status);
    }
  })
  .then((data) => {
    const processedData = JSON.stringify(data);

    // datanie do pliku txt
    fs.appendFile("./currencies.txt", `${processedData}\n`, (err) => {
      if (err) {
        throw new Error(err);
      }

      console.log("Dopisane dane do pliku: ", data);
    });

    //dodanie do pliku json
    fs.readFile(
      "./currencies.json",
      { encoding: "utf-8" },
      (err, currentData) => {
        if (err) {
          throw new Error(err);
        }
        const dataObj = JSON.parse(currentData);
        dataObj.currencies.push(data);
        const stringifiedData = JSON.stringify(dataObj);
        fs.writeFile("./currencies.json", stringifiedData, (err) => {
          if (err) {
            throw new Error(err);
          }
          console.log("Dodano dane do json: ", data);
        });
      }
    );
  })
  .catch((err) => {
    throw new Error(err);
  });
