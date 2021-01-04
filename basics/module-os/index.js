const os = require("os");

const uptime = os.uptime();
console.log(Math.round(uptime) + " s");
const uptimeInMinutes = uptime / 60;
console.log(Math.round(uptimeInMinutes) + " min");
const uptimeInHoures = uptimeInMinutes / 60;
console.log(Math.round(uptimeInHoures) + " h");

const homeDir = os.homedir();
console.log(homeDir);
