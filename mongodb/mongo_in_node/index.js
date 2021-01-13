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
    const cars = db.collection("cars");

    //operacje na bazie
    //INSERT
    // cars.insertOne(
    //   {
    //     brand: "Honda",
    //     model: "Civic",
    //   },
    //   (err) => {
    //     if (err) {
    //       console.log("Błąd podczas dodawnia danych");
    //     } else {
    //       console.log("Pomyślnie dodano do bazy danych");
    //     }
    //     //Zakończenie połączenia z bazą danych
    //     // client.close();
    //     client.close();
    //   }
    // );

    //DELETE
    // cars.deleteOne(
    //   {
    //     _id: mongo.ObjectId("5fff3e48d41e7656fd8e0277"),
    //   },
    //   (err) => {
    //     if (err) {
    //       console.log("Błąd podczas usuwania danych");
    //     } else {
    //       console.log("Pomyślnie usunięto z bazy danych");
    //     }
    //     //Zakończenie połączenia z bazą danych
    //     // client.close();
    //     client.close();
    //   }
    // );

    //FIND
    cars.find({}).toArray((err, carsList) => {
      if (err) {
        console.log("Błędne zapytanie");
      } else {
        console.log(carsList);
      }
      client.close();
    });

    //UPDATE
    // cars.updateOne(
    //   { _id: mongo.ObjectId("5ffdeaf68a2c239c15adbac6") },
    //   { $set: { model: "Lanos" } },
    //   (err) => {
    //     if (err) {
    //       console.log("Błąd podczas modyfikowania danych");
    //     } else {
    //       console.log("Pomyślnie zmodyfikowano dane");
    //     }
    //     client.close();
    //   }
    // );
  }
});
