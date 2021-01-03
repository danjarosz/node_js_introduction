const users = require("./users");
const { showUsers, showUserObjectByName, showUserObjectById } = users;

showUsers();
showUserObjectByName("Daniel");
showUserObjectByName("Daniellll");
showUserObjectByName("Zbyszek");
showUserObjectById(2);
showUserObjectById(10);
