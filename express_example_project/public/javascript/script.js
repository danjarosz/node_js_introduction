const questionEl = document.querySelector("#question");

function fillQuestionElements(data) {
  const { question, answers } = data;
  questionEl.innerText = question;

  for (let i in answers) {
    const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
    answerEl.innerText = answers[i];
  }
}

function showNextQuestion() {
  fetch("/question", {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      fillQuestionElements(data);
    });
}

showNextQuestion();
