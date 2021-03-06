const express = require("express");
const path = require("path");
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

//--------------------
// Przesyłanie plików - res.sendFile(ścieżka_do_pliku)
app.get("/send-file", (req, res) => {
  res.sendFile("send-file.html", {
    root: path.join(__dirname, "static"),
  });
});

app.get("/profile", (req, res) => {
  // wersja basic
  // const pathname = path.join(__dirname, "static", "profile.jpeg");
  // res.sendFile(pathname);

  //wersja extended (lepiej używać tej wersji)
  res.sendFile("profile.jpeg", {
    root: path.join(__dirname, "static"), // główna ścieżka do pliku
    lastModified: true, // ture jest by default, można zmienić na false, żeby nie wyświetlać
    // headers: {} // dodatkowe nagłówki, jeśli trzeba
    // dotfiles: ignore // opcje allow, deny i ignore - zazwolenie na pliki ukryte
    // inne
  });
});

// metoda res.attachment() - użycie jak res.sendFile()
// plik wysyłany jako załącznik, tj. przeglądarka go nie wyświetli, lecz zapyta, czy go pobrać
// trzeba zakończyć połączenie za pomocą res.end()
app.get("/attach", (req, res) => {
  res.attachment("profile.jpeg", {
    root: path.join(__dirname, "static"),
  });
  res.end();
});

// druga opcja to res.download()
app.get("/download", (req, res) => {
  res.download(path.join(__dirname, "static", "profile.jpeg"), "logo.jepg");
});

//Ustawianie nagłówków:
// - res.set() - pojedyńczy nagłówek
// - res.set({...}) - wiele nagłówków
// Ustawianie nagłówków powinno odbyć się przed wysłaniem odpowiedzi (bo inaczej jest zablokowane).
// Można to sprawdzić za pomocą właśiwości
// - res.headersSent // true lub false

//Cookies - ustawianie za pomocą metody:
// - res.cookie('nazwa', 'wartość'); - cookie na czas sesji
// Konfigurowanie cookies:
// - res.cookie('nazwa', 'wartość', { opcje }) - dostępne opcje to: domain, expires, maxAge, httpOnly i inne...

// Przykład ustawiania ciastek
app.get("/cookies/hi/:name", (req, res) => {
  const { name } = req.params;
  const dt = new Date();
  dt.setDate(dt.getDate() + 7);

  res.cookie("visitor_name", name, {
    expires: dt,
  });
  res.send("Imię zapisano");
});

// Przykład czyszczenia ciastek
app.get("/logout", (req, res) => {
  res.clearCookie("visitor_name");
  res.send("Wylogowano");
});

//---------------------------------------------------------
// Midlewares, aby użyc middleware, trzeba użyć funkcji
// - app.use(jakisMiddleware());
// należy zadelarować wszystkie middleware przed ścieżkami
// Przykłady middlewares:
// - app.use(express.json()); - middleware do odczytywania json od klienta, domyślnie do 100kB, można zwiększyć.
// użycie tego middleware powoduje dodania dodatkowego obiektu do obiektu req i jest to req.body z rozkodowanymi danymi

app.use(express.json());

app.post("/get-json/hello", (req, res) => {
  const { name, surname } = req.body;

  res.send(`Witaj ${name} ${surname}`);
});

//Przykład zapytania
// fetch("/get-json/hello", {
//   method: 'POST',
//   body: JSON.stringify({
//       name: "Anna",
//       surname: "Kowalska"
//   }),
//   headers: {
//       "Content-Type": "application/json",
//   }
// })

// Serwowanie plików statycznych:
// - app.use(express.static("ścieżka_do_folderu_plików_statycznych")); - middleware do automatycznego serwowania plików statycznych
app.use(express.static(path.join(__dirname, "static")));
// lecz wymaga używania pełnych ścieżek plików

//odczyt ciasteczek:
// potrzebna dodatkowa paczka "cookie-parser"
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// można ustawić obiekt opcjiw cookieParser(), patrz dokumentacja
// Ten middleware dodaje nowy obiekt do req pod kluczem req.cookies lub req.signedCookies

app.get("/get-cookies", (req, res) => {
  const { visitor_name } = req.cookies;

  if (visitor_name) {
    res.send(`Witaj, ${visitor_name}`);
  } else {
    res.send(`Czy my się znamy?`);
  }
});
