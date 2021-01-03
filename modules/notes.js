console.log("Jestem w module notes");

console.log("exports", exports);
console.log(exports === module.exports);
console.log("__dirname", __dirname);
console.log("__filename", __filename);
console.log("require", require);
console.log("module", module);

module.exports = {
  text: "coś zwrócone z modułu notes",
};
