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
});
