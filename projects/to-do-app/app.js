const parseArgs = require("minimist");
const colors = require("colors");
const fs = require("fs");

const command = parseArgs(process.argv.slice(2, 3));
delete command._;

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

const handleData = (type, title) => {
  // type 1 - add
  // type 2 - remove
  // type 3 - list

  let data = null;

  try {
    data = fs.readFileSync("./data-db.json", { encoding: "utf-8" });
  } catch (err) {
    throw new Error(err);
  }

  const tasks = JSON.parse(data);

  if (type === 1 || type === 2) {
    const isExisted = tasks.find((task) => task.title === title) ? true : false;

    if (type === 1 && isExisted) {
      return console.log("Takie zadanie już istnieje".red);
    }

    if (type === 2 && !isExisted) {
      return console.log("Nie można usunąć zadania które nie istnieje".red);
    }
  }

  switch (type) {
    case 1:
      const id =
        Math.round(Math.random() * 10000) * Math.round(Math.random() * 300);
      tasks.push({
        id,
        title,
      });
      fs.writeFile("./data-db.json", JSON.stringify(tasks), (err) => {
        if (err) {
          throw new Error(err);
        }
        console.log(`Dodano do bazy zadanie: ${title}`.white.bgGreen);
      });
      break;
    case 2:
      const filteredTasks = tasks.filter((task) => task.title !== title);
      fs.writeFile("./data-db.json", JSON.stringify(filteredTasks), (err) => {
        if (err) {
          throw new Error(err);
        }
        console.log(`Usunięto z bazy zadanie: ${title}`.white.bgRed);
      });
      break;
    case 3:
      console.log(`Masz ${tasks.length} zadań do zrobienia:`);
      if (tasks.length) {
        tasks.forEach((task, index) => {
          index % 2
            ? console.log(`${task.title}`.green)
            : console.log(`${task.title}`.yellow);
        });
      }
      break;
    default:
      return console.log("Nieobsługiwane polecenie".red);
  }
};

handleCommnad(command);
