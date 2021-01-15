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
        `# Lista zadań do zrobienia (niezakończone): (${todosToDo.length})`
      );

      if (todosToDo.length) {
        for (const todo of todosToDo) {
          console.log(`- [${todo._id}] ${todo.title}`);
        }
      } else {
        console.log("Brak zadań.");
      }

      console.log(
        `# Lista zadań zrobionych (zakończone): (${todosDone.length})`
      );

      if (todosDone.length) {
        for (const todo of todosDone) {
          console.log(`- [${todo._id}] ${todo.title}`);
        }
      } else {
        console.log("Brak zadań.");
      }
    }
    client.close();
  });
}

function markTaskAsDone(todosCollection, id) {
  todosCollection.find({ _id: mongo.ObjectId(id) }).toArray((err, todos) => {
    if (err) {
      console.log("Błąd podczas pobierania!", err);
      client.close();
    } else if (todos.length !== 1) {
      console.log("Nie znaleziono zadania!");
      client.close();
    } else if (todos[0].done) {
      console.log("To zadanie jest już zakończone");
      client.close();
    } else {
      todosCollection.updateOne(
        {
          _id: mongo.ObjectId(id),
        },
        {
          $set: {
            done: true,
          },
        },
        (err) => {
          if (err) {
            console.log(`Błąd podczas edycji`, err);
          } else {
            console.log(`Pomyślnie oznaczono zadanie jako wykonane`);
          }
          client.close();
        }
      );
    }
  });
}

function deleteTask(todosCollection, id) {
  todosCollection.find({ _id: mongo.ObjectId(id) }).toArray((err, todos) => {
    if (err) {
      console.log("Błąd podczas pobierania!", err);
      client.close();
    } else if (todos.length !== 1) {
      console.log("Nie znaleziono zadania!");
      client.close();
    } else {
      todosCollection.deleteOne(
        {
          _id: mongo.ObjectId(id),
        },
        (err) => {
          if (err) {
            console.log(`Błąd podczas usuwania`, err);
          } else {
            console.log(`Pomyślnie usunięto zadanie`);
          }
          client.close();
        }
      );
    }
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
    case "done":
      markTaskAsDone(todosCollection, args[0]);
      break;
    case "delete":
      deleteTask(todosCollection, args[0]);
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
