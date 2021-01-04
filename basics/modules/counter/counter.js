let counter = 0;

// module.exports = () => console.log(++counter);

module.exports = {
  add: (number) => {
    counter += number;
    console.log(counter);
  },
};
