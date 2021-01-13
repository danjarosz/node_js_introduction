const mongo = require("mongodb");

// Ustanowienie połączenia z bazą danych
const client = new mongo.MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.log("Błąd połączenia" + err);
  } else {
    console.log("Połączenie udane");

    //Wybór odpowieniej bazy
    const db = client.db("test");

    //Wybór odpowiedniej kolekcji
    const clients = db.collection("clients");

    //operacje na bazie
    //...
    //koniec operacji na bazie

    //Zakończenie połączenia z bazą danych
    client.close();
  }
});
