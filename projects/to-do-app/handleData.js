const fs = require("fs");
const colors = require("colors");

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

module.exports = handleData;
