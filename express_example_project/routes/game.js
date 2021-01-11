function gameRoute(app) {
  let goodAnswers = 0;
  let callToAFriendUsed = false;
  let questionToTheCrowdUsed = false;
  let halfOnHalfUsed = false;
  let isGameOver = false;

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
    } else if (isGameOver) {
      res.json({
        looser: true,
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
    if (isGameOver) {
      res.json({
        looser: true,
      });
    }

    const { index } = req.params;
    const question = questions[goodAnswers];
    const isCorrectAnswer = Number(index) === question.correctAnswer;

    if (isCorrectAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isCorrectAnswer,
      goodAnswers,
    });
  });

  app.get("/help/friend", (req, res) => {
    if (callToAFriendUsed) {
      return res.json({
        text: "To koło ratunkowe było już wykorzystane",
      });
    }

    callToAFriendUsed = true;

    const doesFriendKnowAnswer = Math.random() < 0.5;
    const question = questions[goodAnswers];

    res.json({
      text: doesFriendKnowAnswer
        ? `Wydaje mi się, że odpowiedź to ${
            question.answers[question.correctAnswer]
          }`
        : "Hmmm, no nie wiem.",
    });
  });
}

module.exports = gameRoute;
