function gameRoute(app) {
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

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      });
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;
      res.json({
        question,
        answers,
      });
    }
  });

  app.post("/answer/:index", (req, res) => {
    const { index } = req.params;
    const question = questions[goodAnswers];
    const isCorrectAnswer = Number(index) === question.correctAnswer;

    res.json({
      correct: isCorrectAnswer,
    });
  });
}

module.exports = gameRoute;
