const questionEl = document.querySelector("#question");
const buttons = document.querySelectorAll(".answer-button");
const goodAnswersEl = document.querySelector("#good-answers");
const gameboardEl = document.querySelector("#gameboard");
const h2 = document.querySelector("h2");

function fillQuestionElements(data) {
  const { question, answers, winner } = data;

  if (data.winner === true) {
    gameboardEl.style.display = "none";
    h2.innerText = "Wygrałeś!";
    return;
  }

  if (data.looser === true) {
    gameboardEl.style.display = "none";
    h2.innerText = "Nie poszło tym razem, spróbuj ponownie!";
    return;
  }

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

function handleAnswerFeedback(data) {
  const { goodAnswers } = data;
  goodAnswersEl.innerText = goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      handleAnswerFeedback(data);
    });
}

handleFriendsAnswer = (data) => {
  const tipEl = document.querySelector("#tip");
  tipEl.innerText = data.text;
};

callToAFriend = () => {
  fetch("/help/friend", {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      handleFriendsAnswer(data);
    });
};

handleHalfOnHalf = (data) => {
  if (typeof data.text === "string") {
    const tipEl = document.querySelector("#tip");
    tipEl.innerText = data.text;
  } else {
    for (const button of buttons) {
      if (data.answersToRemove.indexOf(button.innerText) > -1) {
        button.innerText = "";
      }
    }
  }
};

halfOnHalf = () => {
  fetch("/help/half", {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      handleHalfOnHalf(data);
    });
};

handleQuestionToTheCrowd = (data) => {
  if (typeof data.text === "string") {
    const tipEl = document.querySelector("#tip");
    tipEl.innerText = data.text;
  } else {
    data.chart.forEach((percent, index) => {
      buttons[index].innerText = buttons[index].innerText + ` - ${percent}%`;
    });
  }
};

questionToTheCrowd = () => {
  fetch("/help/crowd", {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      handleQuestionToTheCrowd(data);
    });
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const answerIndex = e.target.dataset.answer;
    sendAnswer(answerIndex);
  });
});

document
  .querySelector("#callToAFriend")
  .addEventListener("click", callToAFriend);

document.querySelector("#halfOnHalf").addEventListener("click", halfOnHalf);

document
  .querySelector("#questionToTheCrowd")
  .addEventListener("click", questionToTheCrowd);

showNextQuestion();
