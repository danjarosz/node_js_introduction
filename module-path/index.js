const path = require("path");

const pathToFile = path.join(__dirname, "index.js");
console.log(pathToFile);

const anotherPathToFile = path.join(__dirname, "..", "users", "index.js");
console.log(anotherPathToFile);
