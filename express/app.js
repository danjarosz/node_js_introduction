const { response, request } = require("express");
const express = require("express");
const port = process.env.PORT || 4000;

const app = express();

app.listen(port, "127.0.0.1", () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// dostępne metody app:
// - get
// - post
// - patch
// - put
// - delete
// - all
// - ...

app.get("/", (req, res) => {
  //------------------------------
  //właściwoście requesta
  console.log("hostname: ", req.hostname); // nazwa hosta
  console.log("ip", req.ip); // prawdziwy adres IP
  console.log("ips: ", req.ips); // lista ip przez które przeszło zapytanie (proxy)
  console.log("method: ", req.method); // metoda jaką wysłano zapytanie - przydatne przy app.all()
  console.log("url: ", req.url); // z czytstego Node.js
  console.log("originalUrl: ", req.originalUrl); // ZALECANA - pierwotna ścieżka, np. przed przekierowaniem, cały adres z query string
  console.log("path: ", req.path); // zawiera pierwszą część adresu np. bez query string
  console.log("protocol: ", req.protocol); // STRING - informacja o protokole - http lub https. Można użyć do wykrycia protokołu i przekierowania na bezpieczny (https)
  console.log("secure: ", req.secure); // BOOLEAN - czy połączenie bezpieczne (szyfrowane) TRUE czy nie FALSE

  // if (req.protocol !== "https") {
  //   console.log("Protokół niezabezpieczony");
  // }

  // if (!req.secure) {
  //   console.log("Protokół niezabezpieczony");
  // }

  //------------------------------
  // właściwoście adresu URL, na froncie kodowane za pomocą:
  // - encodeURIComponent
  // - URLSearchParams
  // odczytywane zapomocą req.query na backendzie
  console.log("query: ", req.query); // dane z query stringa w formie obiektu (odkodowane)
  const { name, surname } = req.query;
  console.log(`Hello, ${name} ${surname}`);

  //------------------------------
  // metoda req.get()
  console.log("get(): ", req.get("Referer")); // Referef przydatny do określenia skąd użytkownik przyszedł na stronę np. z mediów społeczniościowych
  // można też pobrać Cookies za pomocą get() (lecz są lepsze motody)
});

//----------------------------------------------
// Idea routingu - struktura REST:

// app.get("/", (req, res) => {
//   console.log("spis ludzi");
// });

// app.get("/:id", (req, res) => {
//   console.log("informacje szczegółowe na temat człowieka o id przekazanym w paramatrze id");
// });

// app.post("/", (req, res) => {
//   console.log("dodawanie do spisu ludzi nowej osoby");
// });

// app.patch("/:id", (req, res) => {
//   console.log("aktualizacja osoby o id przekazanym w paramatrze id");
// });

// app.delete("/:id", (req, res) => {
//   console.log("usunięcie osoby o id przekazanym w paramatrze id");
// });

// ścieżki stałe powinny być przed ścieżkami ze zmiennymi, aby obsłużyć je i nie nadpisać stałych routów
app.get("/hello/new-user", (req, res) => {
  console.log("dodawanie nowego użytkownika");
});

app.get("/hello/:name", (req, res) => {
  console.log("powitanie osoby " + req.params.name);
});

// ściażka z opcjonalną zmienną:
// article/:id/:title?
// wtedy wpisanie: article/123 i article/123/tytul-artykulu złapie ten sam route

app.get("/article/:id/:title?", (req, res) => {
  console.log("params: ", req.params); // pobiera paramsy z adresu URL i zwraca obiekt JS
});
