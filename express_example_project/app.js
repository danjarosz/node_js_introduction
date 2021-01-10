const express = require("express");
const port = process.env.PORT || 4000;

const app = express();

app.listen(port, "127.0.0.1", () => {
  console.log(`Server is running on the ${port}`);
});

let goodAnswers = 0;
let callToAFriendUsed = false;
let questionToTheCrowdUsed = false;
let halfOnHalfUsed = false;

const questions = [
  {
    question: "Jaki jest najlepszy język programownaia wg mnie?",
    answers: ["C++", "Fortran", "JavaScript", "Java"],
    correctAnswer: 2,
  },
  {
    question: "Czy ten kurs jest fajny",
    answers: ["Nie wiem", "Oczywiście, że tak", "Nie", "Jest najlepszy"],
    correctAnswer: 3,
  },
  {
    question: "Czy chcesz zjeść pizzę",
    answers: [
      "Nawet dwie",
      "Jestem na diecie",
      "Nie, dziękuję",
      "Wolę brokuły",
    ],
    correctAnswer: 0,
  },
];
