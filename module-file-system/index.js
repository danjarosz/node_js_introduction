const fs = require("fs");

//ACCESS
fs.access("./names.txt", (err) => {
  const message = err
    ? "Plik names.txt nie istnieje"
    : "Plik names.txt istnieje";
  console.log(message);
});

fs.access("./names.txt", fs.constants.F_OK, (err) => {
  const message = err
    ? "Plik names.txt nie istnieje"
    : "Plik names.txt istnieje";
  console.log(message);
});

fs.access("./zablokowany.txt", fs.constants.W_OK, (err) => {
  const message = err
    ? "Plik zablokowany.txt nie można zapisywać"
    : "Plik zablokowany.txt można zapisywać";
  console.log(message);
});

//RENAME
fs.rename("./names.txt", "./imiona.txt", (err) => {
  if (err) {
    console.log(err);
  }

  console.log("Nazwa zmieniona");
});

fs.rename("./imiona.txt", "./names.txt", (err) => {
  if (err) {
    console.log(err);
  }

  console.log("Nazwa zmieniona");
});

try {
  fs.renameSync("./users.txt", "./uzytkownicy.txt");
} catch (err) {
  console.log(err);
}

try {
  fs.renameSync("./uzytkownicy.txt", "./users.txt");
} catch (err) {
  console.log(err);
}

//RIDDIR
const folder = fs.readdirSync("./");
// console.log(folder);

fs.readdir("./", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
