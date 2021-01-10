const express = require("express");
const port = process.env.PORT || 4000;

const app = express();

app.listen(port, "127.0.0.1", () => {
  console.log(`Server is running on the ${port}`);
});
