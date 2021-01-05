const parseArgs = require("minimist");
const handleCommnad = require("./handleCommand");

const command = parseArgs(process.argv.slice(2, 3));
delete command._;

handleCommnad(command);
