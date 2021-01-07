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

  //Obiekt Response
  // 1 - write + end
  // res.write("Hello world");
  // res.end();
  // 2 - send = write + end, lecz ustawia nagłowek automatycznie, na podstawie tego co wysyłamy:
  // - Content-Type i kodowanie utf-8
  // - Content-Length
  // - Nagłówki związane z podstawowym catchingiem
  // - konwertuje dane jeśli to potrzebne
  // - przesyła dane i kończy połączenie
  res.send("Zażółć gęślą jaźń");
  // Metodą res.send(dane_wejściowe) można przesłać:
  // - string - text/html i przesłanie tekstu
  // - Buffer - application/octet-stream i przesyłanie czystych danych
  // - Array / Object - application/json i zakodowanie danych jako JSON
});

//--------------------------
// Response
// wysyłanie tekstu za pomocą res.send():
app.get("/string", (req, res) => {
  res.send("String wysłany jako HTML");
});

//wysyłanie JSONA za pomocą res.send():
app.get("/object", (req, res) => {
  res.send({
    title: "Obiekt dane jako JSON",
    otherData: 1234,
  });
});

app.get("/array", (req, res) => {
  const str = "Zażółć gęślą jaźń";
  const arr = str.split(" ");
  res.send(arr);
});

// Wysyłanie JSON za pomocą res.json(dane_wejściowe). POzwala na:
// - zawsze wysłanie JSON, nawek jak podamy zwykły tekst
// - specjalne opcje dla formatowania JSON w Express
// tak to niczym innym się nie różni od res.send(dane_wejściowe)
app.get("/json/string", (req, res) => {
  res.json("Zwykły tekst");
});

app.get("/json/object", (req, res) => {
  res.json({
    text: "hello world",
    isGood: true,
  });
});

app.get("/json/array", (req, res) => {
  const str = "Zażółć gęślą jaźń";
  const arr = str.split(" ");
  res.json(arr);
});

// Przekierowanie
// - res.redirect(nowy_adres, kod_statusu(opcjonalnie))
// - res.location(nowy_adres)

app.get("/location", (req, res) => {
  // res.location("https://google.com");
  res.location("/");
  res.sendStatus(302);
});

app.get("/redirect", (req, res) => {
  // res.redirect("https://google.com");
  res.redirect("/");
});

//redirect obsługuje ścieżki względne
app.get("/go-up", (req, res) => {
  res.redirect("..");
});

app.get("/go-back", (req, res) => {
  res.redirect("back"); // back to special string, odczytuje referer i cofa o jeden route, jeśli nie ma wcześniejszej ścieżki to przekierowuje na /
});

// zobacz statusy 301, 302, 303, 307

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
  res.end();
});

app.get("/hello/:name", (req, res) => {
  console.log("powitanie osoby " + req.params.name);
  res.end();
});

// ściażka z opcjonalną zmienną:
// article/:id/:title?
// wtedy wpisanie: article/123 i article/123/tytul-artykulu złapie ten sam route

app.get("/article/:id/:title?", (req, res) => {
  console.log("params: ", req.params); // pobiera paramsy z adresu URL i zwraca obiekt JS
  res.end();
});
