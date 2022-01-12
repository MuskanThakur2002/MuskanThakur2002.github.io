const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
let correctAnswers = 0;
let attemp = 0;

// push the question into availableQuestion array
function setAvailableQuestion() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestion.push(quiz[i]);
  }
}
function getNewQuestion() {
  questionNumber.innerHTML =
    "Question " + (questionCounter + 1) + " of " + quiz.length;
  const questionIndex =
    availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  const index = availableQuestion.indexOf(questionIndex);
  availableQuestion.splice(index, 1);
  const optionlen = currentQuestion.options.length;
  for (let i = 0; i < optionlen; i++) {
    availableOptions.push(i);
  }
  optionContainer.innerHTML = "";
  let animitionDelay = 0.15;
  for (let i = 0; i < optionlen; i++) {
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    index1 = availableOptions.indexOf(optionIndex);
    availableOptions.splice(index1, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animitionDelay + "s";
    animitionDelay = animitionDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;
}
function getResult(element) {
  const id = parseInt(element.id);
  if (id === currentQuestion.answer) {
    element.classList.add("correct");
    updateAnswersIndicator("correct");
    correctAnswers++;
  } else {
    element.classList.add("wrong");
    updateAnswersIndicator("wrong");

    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attemp++;
  unclickableoptions();
}

function answersIndicator() {
  answersIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
  }
}
function updateAnswersIndicator(markType) {
  answersIndicatorContainer.children[questionCounter - 1].classList.add(
    markType
  );
}

function next() {
  if (questionCounter === quiz.length) {
    quizOver();
  } else {
    getNewQuestion();
  }
}

function unclickableoptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}
function quizOver() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  quizResult();
}
function quizResult() {
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attemp;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attemp - correctAnswers;
  const percentage = (correctAnswers / quiz.length) * 100;
  resultBox.querySelector(".percentage").innerHTML = percentage.toFixed() + "%";
  resultBox.querySelector(".total-score").innerHTML =
    correctAnswers + " / " + quiz.length;
}
function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attemp = 0;
}
function tryAgainQuiz() {
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}
function goToHome() {
  resultBox.classList.add("hide");
  homeBox.classList.remove("hide");
  resetQuiz();
}

function startQuiz() {
  homeBox.classList.add("hide");
  quizBox.classList.remove("hide");
  setAvailableQuestion();
  getNewQuestion();
  answersIndicator();
}

window.onload = function () {
  homeBox.querySelector(".total-question").innerHTML = quiz.length;
};
