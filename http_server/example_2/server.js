const http = require("http");
const server = http.createServer();

server.addListener("request", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Dzień dobry");
});

server.listen(4400, "127.0.0.1", () => {
  console.log("Server is running on port 4400");
});
