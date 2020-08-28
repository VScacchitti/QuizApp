const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCountText = document.getElementById("questionCount");
var scoreText = document.getElementById("score");
var timerText = document.getElementById("timer");
var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var timer = 60;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
  {
    question: "What does DOM stand for?",
    choice1: "Dominant Ostrich Mode",
    choice2: "Document Object Model",
    choice3: "Dilligent Otter March",
    choice4: "Direct Observation Myth",
    answer: 2,
  },
  {
    question:
      "What do we use CSS (Cascading Style Sheets) to do for our applications?",
    choice1: "Allow to create a skeletal structure for our websites",
    choice2: "CSS sounds like a shipping vessel!",
    choice3:
      "It allows us freedom to style and design our websites and applications",
    choice4: "Allows us to dynamically alter our pages",
    answer: 3,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
  {
    question: "What number of columns is bootStrap based on?",
    choice1: "10",
    choice2: "12",
    choice3: "14",
    choice4: "16",
    answer: 2,
  },
  {
    question: "What does HTML stand for?",
    choice1: "Hyper Turtle Monster Line",
    choice2: "Highlly Tolerable Mediocre Landscape",
    choice3: "Huge Taco Made Live",
    choice4: "Hyper Text Mark-up Language",
    answer: 4,
  },

  {
    question: "What does '&&' and '||' stand for?",
    choice1: "'yes' and 'no'",
    choice2: "'and' and 'or'",
    choice3: "'true' or 'false'",
    choice4: "'number' or 'string'",
    answer: 2,
  },
  {
    question:
      "In the following array what is the index of 'Giraffe?  Animals = ['Zebra', 'Rhino', 'Giraffe', 'Owl'];",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 2,
  },
  {
    question: "What does an else/if statement allow us to do?",
    choice1: "Allow to create a skeletal structure for our websites",
    choice2: "Allows us to write functions",
    choice3:
      "Allow us to execute condtions and run code based on those conditions being met, or not met.",
    choice4:
      "Allows to to change elements of JavaScript without editing the HTML.",
    answer: 3,
  },
  {
    question:
      "Which of the following examples is best practice when naming a variable with Boolean Value about sleeping?",
    choice1: "IneedMyBed",
    choice2: "Issleeping",
    choice3: "snoozeTime",
    choice4: "isSleeping",
    answer: 4,
  },

  {
    question:
      "Which of the following values can be assigned when naming a variable?",
    choice1: "Boolean",
    choice2: "Strings",
    choice3: "Numeric",
    choice4: "All of the Above",
    answer: 4,
  },
];

const correctBonus = 10;
const maxQuestions = 10;
const wrongPenalty = -5;

function startGame() {
  questionCounter = 0;
  score = 0;
  timeDown();
  availableQuestions = [...questions];
  getNewQuestion();
}

function getNewQuestion() {
  if (
    availableQuestions.length === 0 ||
    questionCounter > maxQuestions ||
    timer === 0
  ) {
    localStorage.setItem("lastQuizScore", score);
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCountText.innerText = questionCounter + "/" + maxQuestions;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    console.log(e.target);
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    var classToApply = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      classToApply = "correct";
    }

    if (classToApply === "correct") {
      scoreUp(correctBonus);
    } else {
      timer -= 5;
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

function scoreUp(num) {
  score += num;
  scoreText.innerText = score;
}

function timeDown() {
  timer = 60;
  var interval = setInterval(function () {
    document.getElementById("timer").innerHTML = timer;
    timer--;
    timerText.innerText = timer;
    if (timer === 0) {
      clearInterval(interval);
      localStorage.setItem("lastQuizScore", score);
      return window.location.assign("end.html");
    }
  }, 1000);
}

startGame();
