const http = require("http");
const port = process.env.PORT || 4400;

http
  .createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);

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
  .listen(port, "127.0.0.1", () => {
    console.log(`server is running on ${port}`);
  });
