const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progresstext = document.getElementById("progresstext");
const scoretext = document.getElementById('score');
const progressbarfull = document.getElementById('progressbarfull');
let currentquestion = {};
let acceptinganswers = false;
let score = 0;
let questioncounter = 0;
let availablequestions = [];

let questions = [
  {
    question: "What can cause cough?                ",
    choice1: "Allergies",
    choice2: "Acid reflux",
    choice3: "Secondhand smoke",
    choice4: "All of the above",
    answer: 4
  },
  {
    question: "What kind of cough can be treated with cough medicine?",
    choice1: "Asthma",
    choice2: "Chronic bronchitis",
    choice3: "Cold or flu",
    choice4: "Pneumonia",
    answer: 3
  },
  {
    question: "Which conditions are not consequences of Chronic Cough?",
    choice1: "Urinary incontinence",
    choice2: "Depression",
    choice3: "Anxiety",
    choice4: "Arthritis",
    answer: 4
  },
  {
    question: "How is Chronic Cough diagnosed?",
    choice1: "Rhinoscopy exam by a Cough Specialist Doctor using an advanced diagnostic tool to examine your nasal passages, sinuses and voice box",
    choice2: "Comprehensive medical history",
    choice3: "Chest X-Ray",
    choice4: "All of the above",
    answer: 4
  },
  {
    question: "Chronic Cough can be effectively treated with:",
    choice1: "Over the counter and/or prescription medications",
    choice2: "Voice Exercises",
    choice3: "Diet",
    choice4: "All of the above",
    answer: 1
  }

];




const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questioncounter = 0;
  score = 0;
  availablequestions = [...questions];
  console.log(availablequestions);
  getquestion();
};
getquestion = () => {
  if (availablequestions.length == 0 || questioncounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostrecentscore", score);
    return window.location.assign("end.html");
  }
  questioncounter++;
  progresstext.innerText = `Question ${questioncounter}/${MAX_QUESTIONS}`;
  progressbarfull.style.width = `${(questioncounter / MAX_QUESTIONS) * 100}%`;
  const questionindex = Math.floor(Math.random() * availablequestions.length);
  currentquestion = availablequestions[questionindex];
  question.innerText = currentquestion.question;
  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentquestion['choice' + number];
  });
  availablequestions.splice(questionindex, 1);
  console.log(availablequestions);
  acceptinganswers = true;
};
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptinganswers) return;
    acceptinganswers = false;
    const selectedchoice = e.target;
    const selectedanswer = selectedchoice.dataset["number"];

    const classtoapply = selectedanswer == currentquestion.answer ? 'correct' : 'incorrect';
    if (classtoapply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedchoice.parentElement.classList.add(classtoapply);
    setTimeout(() => {
      selectedchoice.parentElement.classList.remove(classtoapply);
      getquestion();
    }, 1000);
  });
});
incrementScore = num => {
  score += num;
  scoretext.innerText = score;
};
startGame();