const http = require("http");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 4400;

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    switch (req.url) {
      case "/":
        const pathNameIndex = path.join(__dirname, "index.html");
        fs.readFile(pathNameIndex, { encoding: "utf-8" }, (err, page) => {
          if (err) {
            res.end("<h1>Nie udało się pobrać pliku</h1>");
          }
          res.end(page);
        });
        break;
      case "/users":
        const pathNameUsers = path.join(__dirname, "users.html");
        fs.readFile(pathNameUsers, { encoding: "utf-8" }, (err, page) => {
          if (err) {
            res.end("<h1>Nie udało się pobrać pliku</h1>");
          }
          res.end(page);
        });
        break;
      case "/api/users":
        const pathNameUsersAPI = path.join(__dirname, "users.json");
        fs.readFile(pathNameUsersAPI, (err, file) => {
          if (err) {
            res.end("<h1>Nie udało się pobrać pliku</h1>");
          }
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(file);
        });
        break;
      default:
        res.end("<h1>Strona nie istnieje</h1>");
    }
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`server is running on ${port}`);
  });
