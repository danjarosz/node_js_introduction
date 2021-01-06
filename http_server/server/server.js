const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    const content = `
      <h1>Dzień dobry</h1>
      <script src="./code.js"></script>
    `;

    res.write(content);
    res.end("<div>Something from end</div>");
  })
  .listen(4400, "127.0.0.1", () => {
    console.log("server is running on 4400");
  });
