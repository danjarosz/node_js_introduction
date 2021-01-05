const colors = require("colors");
const handleData = require("./handleData");

const handleCommnad = ({ add, remove, list }) => {
  if (add) {
    if (typeof add !== "string") {
      return console.log("Wpisz nazwę dodawane zadania (tekst!)".red);
    } else if (add.length < 7) {
      return console.log("Nazwa zadania musi mieć więcej niż 6 znaków".red);
    }

    handleData(1, add);
  } else if (remove) {
    if (typeof remove !== "string" || remove.length < 7) {
      return console.log(
        "Wpisz nazwę usuwanego zadania (musi być tekst i co najmiej 7 znaków)"
          .red
      );
    }

    handleData(2, remove);
  } else if (list || list === "") {
    handleData(3, null);
  } else {
    console.log(
      'Nie rozumiem polecenia. Użyj --list, --add="nazwa zadania" lub --remove="nazwa zadania"'
        .red
    );
  }
};

module.exports = handleCommnad;
