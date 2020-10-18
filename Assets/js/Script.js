//Button elements
const submitBtn = document.getElementById("submit");
const startBtn = document.getElementById("start");

// Questions and answers sourced from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS 
const questionsList = [
  {
    question: "Inside which HTML element would you put the JavaScript?",
    options: ["a. <javascript>", "b. <scripting>", "c. <js>", "d. <script>"],
    answer: "d. <script>"
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: ["a. <script src='xxx.js'>", "b. <script name='xxx/js'>", "c. <script href='xxx.js'>"],
    answer: "a. <script src='xxx.js'>"
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["a. function myFunction()","b. function:myFunction()","c. function = myFunction"],
    answer: "a. function myFunction()"
  },
  {
    question: "How would you write an IF statement for executing some code if 'i' is NOT equal to 5?",
    options: ["a. if (i<>5)", "b. if (i!=5)", "c. if i<>5", "d. if i =!5 then"],
    answer: "b. if (i!=5)"
  },
  {
    question: "How does a FOR loop start?",
    options: ["a. for i = 1 to 5", "b. for (i<=5;i++)", "c. for (i=0;i <= 5)", "d. for (i=0;i<= 5;i++)"],
    answer: "d. for (i=0;i<= 5;i++)"
  }
];


// Other variables needed 
let questionIterator = 0;
let time = questionsList.length * 30; // This would give 30 seconds per question, a total of 2.5 mins for five questions
let timer = 0;
let correctAnswersCount = 0; // This quiz gives 10 points per each correct answer.
let finalScore = 0;

// Elements needed to display questions, answers and scores
const questionsContainerEl = document.getElementById("questionsList");
const timerEl = document.getElementById("time");
const optionsEl = document.getElementById("options");
const initialsEl = document.getElementById("initials");
const responseEl = document.getElementById("response");

// This function starts and diplays the questions
function beginQuiz() {
  
  var landingPageEl = document.getElementById("landing-page");
  landingPageEl.setAttribute("class", "hide");
  questionsContainerEl.removeAttribute("class");

  // Timer starts at 150 on landing page but does not start counting down until start quiz is clicked.
  timer = setInterval(timerFunction, 1000);
  timerEl.textContent = time;

  displayQuestion();
}

function displayQuestion() {

  // Display each question
  var displayedQuestion = questionsList[questionIterator];
  var questionEl = document.getElementById("question-item");
  questionEl.textContent = displayedQuestion.question;

  // Delete previous options
  optionsEl.innerHTML = "";

  // Loop through options to display each as buttons
 for (i=0; i<displayedQuestion.options.length; i++) {
    var optionNode = document.createElement("button");
    optionNode.setAttribute("value", displayedQuestion.options[i]);
    optionNode.textContent = displayedQuestion.options[i];
    optionNode.onclick = validateAnswer;
    optionsEl.appendChild(optionNode);  
  }
  
}

function validateAnswer() {
 
  // Validate that answer is correct, otherwise deduct 10 seconds.
  if (this.value === questionsList[questionIterator].answer) {
    
    responseEl.textContent = "That is correct!";
    // Update answer counter by one. 
    correctAnswersCount++;
    console.log("correct answers: " + correctAnswersCount);

  } else {
    // Deduct 10 seconds if wrong.
    time = time-10;
    // If time is negative, it updates to 0.
    if (time < 0) {
      time = 0;
      finishQuiz();    
    }
    // Update timer accordingly.
    timerEl.textContent = time;
    responseEl.textContent = "Sorry, wrong answer. The correct answer was: "+questionsList[questionIterator].answer;
  }

  // Display response for 1200 milliseconds.
  responseEl.setAttribute("class", "response");
  setTimeout(function() {responseEl.setAttribute("class", "response hide");}, 1200);

  questionIterator++; // Update iterator accordingly.
  // Check to see if this is the last question. If not, display another question.
  if (questionIterator !== questionsList.length) {
    displayQuestion();
  
  } else {
    finishQuiz();
  }
}

function calculateFinalScore(){
  // This function calculates the final score by giving 10 points to each correct answer + a time bonus (half of the time left).
  // If user gets NO answers right at all, their final score will be 0.
  if (correctAnswersCount === 0) {
    finalScore = 0;
  }
  else {
    finalScore = (correctAnswersCount*10)+(Math.floor(time/2));
    console.log("my final score: "+ finalScore);
  }
  return(finalScore);
}

function finishQuiz() {
  
  clearInterval(timer);

  // Display final page with score.
  var finalPageEl = document.getElementById("final-page");
  finalPageEl.removeAttribute("class");

  // Calculate and display final score.
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = calculateFinalScore();
  // Remove questions from final page.
  questionsContainerEl.setAttribute("class", "hide");
}

function timerFunction() {

  if (time > 0) time--;
  console.log("timerFunction current time" + time);
  
  // Display current timer.
  timerEl.textContent = time;

  // If timer = 0, the quiz ends.
  if (time <= 0) {
    time = 0;
    finishQuiz();
  }
}

function updateScores() {

  // Save initials from input screen.
  var initials = initialsEl.value;

  // If initials is not empty, save to local storage. Otherwise display alert about it.
  if (initials !== "") {
    var scores = JSON.parse(window.localStorage.getItem("scores")) || [];
    var newScore = { initials: initials, score: finalScore };

    // Save the new high score to localstorage.
    scores.push(newScore);
    window.localStorage.setItem("scores", JSON.stringify(scores));

    // Display High Score html
    window.location.href = "scores.html";
  }
  else {
    // If empty, displays alert.
    alert("Please enter your initials.");
  }
}

// When submit button is clicked updateScores function is called.
submitBtn.onclick = updateScores;

// The quiz begins when the Start Quiz button is clicked.
startBtn.onclick = beginQuiz;


