const users = [
  {
    id: 1,
    name: "Daniel",
  },
  {
    id: 2,
    name: "Kasia",
  },
  {
    id: 3,
    name: "Asia",
  },
  {
    id: 4,
    name: "Zbyszek",
  },
  {
    id: 4,
    name: "Zbyszek",
  },
];

module.exports = {
  showUsers() {
    const names = users.map((user) => user.name);
    console.log("Użytkownicy:");
    names.forEach((name) => {
      console.log(name);
    });
  },
  showUserObjectByName(userName) {
    const user = users.filter((user) => user.name === userName);
    if (user.length) {
      console.log(user);
    } else {
      console.log("User not found");
    }
  },
  showUserObjectById(id) {
    const user = users.filter((user) => user.id === id);
    if (user.length) {
      console.log(user[0]);
    } else {
      console.log(`User with id=${id} not found`);
    }
  },
};
