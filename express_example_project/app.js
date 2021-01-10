const express = require("express");
const path = require("path");
const port = process.env.PORT || 4000;
const gameRoute = require("./routes/game");

const app = express();

app.listen(port, "127.0.0.1", () => {
  console.log(`Server is running on the ${port}`);
});

app.use(express.static(path.join(__dirname, "public")));

gameRoute(app);
