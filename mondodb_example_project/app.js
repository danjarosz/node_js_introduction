const mongo = require("mongodb");

const client = new mongo.MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function addNewToDo(todosCollection, title) {
  todosCollection.insertOne({ title, done: false }, (err) => {
    if (err) {
      console.log(`Błąd podczas dodawania "${title}"`, err);
    } else {
      console.log(`Pomyślnie dodano zadanie "${title}"`);
    }
    client.close();
  });
}

function showAllTodos(todosCollection) {
  todosCollection.find({}).toArray((err, todos) => {
    if (err) {
      console.log("Błąd pobierania listy", err);
    } else {
      const todosToDo = todos.filter((todo) => !todo.done);
      const todosDone = todos.filter((todo) => todo.done);

      console.log(
        `# Lista zadań do zrobienia (niezakończone): (${todosDone.length})`
      );

      if (todosDone.length) {
        for (const todo of todosDone) {
          console.log(`- ${todo.title}`);
        }
      } else {
        console.log("Brak zadań.");
      }

      console.log(
        `# Lista zadań zrobionych (zakończone): (${todosToDo.length})`
      );

      if (todosToDo.length) {
        for (const todo of todosToDo) {
          console.log(`- ${todo.title}`);
        }
      } else {
        console.log("Brak zadań.");
      }
    }
    client.close();
  });
}

function doTheToDo(todosCollection) {
  const [command, ...args] = process.argv.splice(2);

  switch (command) {
    case "add":
      addNewToDo(todosCollection, args[0]);
      break;
    case "list":
      showAllTodos(todosCollection);
      break;
    default:
      console.log("Nie rozpoznano polecenia");
      client.close();
  }
}

client.connect((err) => {
  if (err) {
    console.log("Błąd połączenia" + err);
  } else {
    console.log("Połączenie udane");

    const db = client.db("test");
    const todosCollection = db.collection("todos");

    doTheToDo(todosCollection);
  }
});
