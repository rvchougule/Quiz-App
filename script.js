let questions = [
  {
    prompt: `Inside which HTML 
                 element do we put 
                 the JavaScript?`,
    options: ["<javascript>", "<js>", "<script>", "<scripting>"],
    answer: "<script>",
  },

  {
    prompt: `How do you call a
                 function named 
                 myFunction?`,
    options: [
      "call myFunction()",
      "myFunction()",
      "call function myFunction",
      "Call.myFunction",
    ],
    answer: "myFunction()",
  },

  {
    prompt: `How does a for loop
                 start?`,
    options: [
      "for (i = 0; i <= 5; i++)",
      "for (i = 0; i <= 5)",
      "for i = 1 to 5",
      " for (i <= 5; i++)",
    ],
    answer: "for (i = 0; i <= 5; i++)",
  },

  {
    prompt: `In JavaScript, which 
                 of the following is 
                 a logical operator?`,
    options: ["|", "&&", "%", "/"],
    answer: "&&",
  },

  {
    prompt: `A named element in a 
                 JavaScript program that
                 is used to store and 
                 retrieve data is a _____.`,
    options: ["method", "assignment operator", "letiable", "string"],
    answer: "letiable",
  },
];

const start = document.querySelector(".start");
const container = document.querySelector(".container");
const quizContainer = document.querySelector(".quiz-container");
const highestScore = document.querySelector(".highest-score");

const quizTimer = document.querySelector(".quiz-timer");
const quizQuestion = document.querySelector(".quiz-question");
const option = document.querySelectorAll(".option");
const quizNum = document.querySelector(".quiz-num");
const answerContainer = document.querySelector(".answer-container");
const nextbtn = document.querySelector(".next");

// Quiz's initial state
let currentQuestionIndex = 0;
let time = 30;
let timerID;

const allQuizes = JSON.parse(localStorage.getItem("allQuizes")) || {};

let completedQuizCount = Object.values(allQuizes).filter(
  (quiz) => quiz.id
).length;

highestScore.textContent = `Highest Score ${completedQuizCount}/${questions.length}`;

start.addEventListener("click", () => {
  container.classList.add("quiz-open");
  quizContainer.classList.add("quiz-open");
  document.body.style.backgroundColor = "#CCE2C2";
  QuizStart();
});

nextbtn.addEventListener("click", () => {
  answerContainer.style.pointerEvents = "all";
  option.forEach((choice) => {
    choice.classList.remove("you-choose");
    choice.classList.remove("correct-anwser");
  });
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
});

// console.log(questions.length);

function QuizStart() {
  getQuestion();
}

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
  resetTime();
  timerID = setInterval(clockTick, 1000);
  let currentQuestion = questions[currentQuestionIndex];

  quizNum.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
  quizQuestion.textContent = currentQuestion.prompt;
  currentQuestion.options.forEach(function (choice, i) {
    option[i].querySelector("h3").textContent = choice;
  });
}

option.forEach((choice) => {
  choice.addEventListener("click", () => {
    let choiceID = choice.id;
    let choiceText = choice.querySelector("h3").textContent;
    questionClick(choiceID, choiceText);
  });
});

function questionClick(choiceID, choiceText) {
  let isCorrect = false;
  if (choiceText !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    quizTimer.textContent = `00:${time}`;
    document.querySelector(`#${choiceID}`).classList.add("you-choose");
    option.forEach((ch) => {
      let choice = ch.querySelector("h3").textContent;
      if (choice == questions[currentQuestionIndex].answer) {
        document.querySelector(`#${ch.id}`).classList.add("correct-anwser");
      }
    });
    answerContainer.style.pointerEvents = "none";
    clearInterval(timerID);
    allQuizes[currentQuestionIndex] = {
      question: questions[currentQuestionIndex]["prompt"],
      id: "",
      optionText: "",
    };
    localStorage.setItem("allQuizes", JSON.stringify(allQuizes));
  } else {
    document.querySelector(`#${choiceID}`).classList.add("correct-anwser");
    isCorrect = true;
    allQuizes[currentQuestionIndex] = {
      question: questions[currentQuestionIndex]["prompt"],
      id: choiceID,
      optionText: choiceText,
    };
    localStorage.setItem("allQuizes", JSON.stringify(allQuizes));
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else if (isCorrect) {
    setTimeout(() => {
      document.querySelector(`#${choiceID}`).classList.remove("correct-anwser");
      clearInterval(timerID);
      getQuestion();
    }, 1000);
  }
}

// End quiz by hiding questions,
// Stop timer and show final score

function quizEnd() {
  clearInterval(timerID);
  container.classList.remove("quiz-open");
  quizContainer.classList.remove("quiz-open");
}

function clockTick() {
  time--;
  if (time <= 0) {
    clearInterval(timerID);
    clearTimeout(timerID);
  }
  quizTimer.textContent = `00:${time}`;
  if (time == 15) {
    document.body.style.backgroundColor = "#D4D69F";
  } else if (time == 5) {
    document.body.style.backgroundColor = "#DBADAD";
  }
}

function resetTime() {
  time = 30;
}
