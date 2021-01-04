const path = require("path");

//JOIN
const pathToFile = path.join(__dirname, "index.js");
console.log(pathToFile);

const anotherPathToFile = path.join(__dirname, "..", "users", "index.js");
console.log(anotherPathToFile);

//PARSE
const parse = path.parse(__filename);
console.log(parse);

const parseTwo = path.parse(path.join(__dirname, "index.js"));
console.log(parseTwo);

//EXTNAME
const extname = path.extname("index.js");
console.log(extname);

//ISABSOLUTE
const isAbsolute = path.isAbsolute("./file.js");
console.log(isAbsolute);

const isAbsoluteTwo = path.isAbsolute("/file.js");
console.log(isAbsoluteTwo);

const isAbsoluteThree = path.isAbsolute("file.js");
console.log(isAbsoluteThree);
