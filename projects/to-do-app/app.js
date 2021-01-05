const parseArgs = require("minimist");
const colors = require("colors");

const command = parseArgs(process.argv.slice(2, 3));
delete command._;

const handleCommnad = ({ add, remove, list }) => {
  if (add) {
    if (typeof add !== "string") {
      return console.log("Wpisz nazwę dodawane zadania (tekst!)".red);
    } else if (add.length < 7) {
      return console.log("Nazwa zadania musi mieć więcej niż 6 znaków".red);
    }

    handleData();
  } else if (remove) {
    if (typeof remove !== "string" || remove.length < 7) {
      return console.log(
        "Wpisz nazwę usuwanego zadania (musi być tekst i co najmiej 7 znaków)"
          .red
      );
    }

    handleData();
  } else if (list || list === "") {
    handleData();
  } else {
    console.log(
      'Nie rozumiem polecenia. Użyj --list, --add="nazwa zadania" lub --remove="nazwa zadania"'
    );
  }
};

const handleData = () => {
  console.log("Robimy coś z danymi");
};

handleCommnad(command);
