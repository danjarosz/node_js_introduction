const users = require("./users");
const mymodule = require("../../mymodule");
const { showUsers, showUserObjectByName, showUserObjectById } = users;

showUsers();
showUserObjectByName("Daniel");
showUserObjectByName("Daniellll");
showUserObjectByName("Zbyszek");
showUserObjectById(2);
showUserObjectById(10);

mymodule.readModuleName();
