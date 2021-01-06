const http = require("http");
const port = process.env.PORT || 4400;

http
  .createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);

    if (req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end("<h1>Strona główna</h1>");
    } else if (req.url === "/users") {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end("<h1>Strona użytkowników</h1>");
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end(`<h1>Brak strony opodanym adresie</h1>`);
    }
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`server is running on ${port}`);
  });
