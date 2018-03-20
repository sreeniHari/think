let currentQuestion = 0;
//let nextQuestion = false;
let currentScore = 0;
let outcomes = [];
const QUESTIONWITHANSWERS = [{
    question: "Which best explains getSelection()?",
    answer: ["Returns the VALUE of a selected OPTION.",
      "Returns document.URL of the window in focus",
      "Returns the value of cursor-selected text",
      "Returns the VALUE of a checked radio input."
    ],
    correctIndex: 2
  },
  {
    question: "To open a dialog box each time an error occurs, which of the following is added to prefs.js?",
    answer: ["user_pref(\"javascript.classic.error_alerts\", true);",
      "user_pref(\"javascript.classic.error_alerts \", false);",
      "user_pref(\"javascript.console.open_on_error \", true);",
      "user_pref(\"javascript.console.open_on_error \", false);"
    ],
    correctIndex: 0
  },
  {
    question: "Choose the client-side JavaScript object",
    answer: ["Database",
      "Cursor",
      "Client",
      "FileUpLoad"
    ],
    correctIndex: 2
  },
  {
    question: "DOM stands for",
    answer: ["Document Observer Model",
      "Distant Object Model",
      "Document Object Model",
      "Discrete Object Model"
    ],
    correctIndex: 2
  },
  {
    question: "What is mean by \"this\" keyword in javascript?",
    answer: ["It refers current object",
      "It referes previous object",
      "It is variable which contains value",
      "None of the above"
    ],
    correctIndex: 0
  },
  {
    question: "The syntax of capture events method for document object is ______________",
    answer: ["captureEvents()",
      "captureEvents(args eventType)",
      "captureEvents(eventType)",
      "captureEvents(eventVal)"
    ],
    correctIndex: 2
  },
  {
    question: "The syntax of a blur method in a button object is ______________",
    answer: ["Blur()",
      "Blur(contrast)",
      "Blur(value)",
      "Blur(depth)"
    ],
    correctIndex: 0
  },
  {
    question: "In general, event handler is nothing but",
    answer: ["function",
      "interface",
      "event",
      "handler"
    ],
    correctIndex: 0
  },
  {
    question: "Scripting language are",
    answer: ["High Level Programming language",
      "Assembly Level programming language",
      "Machine level programming language",
      "Functional  level programming language"
    ],
    correctIndex: 0
  },
  {
    question: "In JavaScript, Window.prompt() method returns",
    answer: ["false",
      "true",
      "No return",
      "Undefined"
    ],
    correctIndex: 0
  }
];

const QANSWERS = [];
const NOOFQUESTIONS = QUESTIONWITHANSWERS.length;

function compareAnswer(SelectedAnswer, correctAnswer) {
  return SelectedAnswer === correctAnswer;
}

function renderQuestion(index) {

  let question = QUESTIONWITHANSWERS[index].question;
  let answer = [];

  for (let i = 0; i < 4; i++) {
    answer[i] = QUESTIONWITHANSWERS[index].answer[i];
  }
  $(".question").html(`<p>${question}</p>`);
  for (let i = 0; i < 4; i++) {
    let answerItem = "answer-" + (i + 1);
    $(`label[for=${answerItem}]`).html(` ${answer[i]}`);
  }

  $("input[name='answer']").prop('checked', false);
}

function updateCurrentScore() {
  $(".js-current-score").html(currentScore);
}

function highlightAnswer(correctAnswer) {
  $(`.answer-${(correctAnswer+1)}`).addClass("highlight");
}

function updateFeedback(outcome, correctAnswer, CorrectAnswerText) {
  $(`.answer-${(correctAnswer+1)}`).addClass("highlight");
  $("input[type=radio]").attr('disabled', true);
  $('.feedback').removeClass("highlightNoSelection");
  if (outcome) {
    $('.feedback').removeClass("highlightWrongAnswer");
    $('.feedback').addClass("highlightCorrectAnswer");
    $(".feedback").html(`Correct Answer: ${CorrectAnswerText}`);
    currentScore++;
    updateCurrentScore()
  } else if (outcome === false) {
    $('.feedback').removeClass("highlightCorrectAnswer");
    $('.feedback').addClass("highlightWrongAnswer");
    $(".feedback").html(`Incorrect Answer ; Correct Answer should be : ${CorrectAnswerText}`);
  }
}

function resetAnswerBackground() {
  $(".answer").removeClass("highlight");
  $(".answers").css("background-color", "");
}

function startQuiz() {
  $(".js-start-btn").click(event => {
    showElements();
    currentQuestion = 0;
    currentScore = 0;
    updateCurrentScore();
    renderCurrentQuestion();
    renderQuestion(currentQuestion);
    clearResultsandFeedback();
    $('.startButton').addClass("hide");
  });
}

function resetQuestions() {
  //click try again to restart game
  //reset the questions
  //clear QANSWERS array
  QANSWERS.length = 0;
  currentQuestion = 0;
  renderQuestion(currentQuestion);
  updateSubmit("Submit");
  clearResultsandFeedback();
  resetAnswerBackground();
}

function clearResultsandFeedback() {
  $(".js-result-color").css("background-color", "#fff");
  $(".js-results").html("");
  $(".feedback").html("");
  $('.feedback').addClass('hide');
}

function submitAnswerMessage() {
  $(".feedback").html("<p>Please make a selection</p>");
  $('.feedback').addClass('highlightNoSelection');
}

function nextQuestionButton() {
  $(".submit").on("click", ".next-question-btn", function(event) {
    $("input[type=radio]").attr('disabled', false);
    //$('.feedback').addClass('hide');
    currentQuestion++;
    updateSubmit("Submit");
    if (currentQuestion <= NOOFQUESTIONS - 1) {
      renderQuestion(currentQuestion);
      renderCurrentQuestion();
      $(".submit").html('<button type="submit" value="Submit" role="button" class="submit-btn" aria-pressed="false"><p class="js-submit-text">Submit</p></button>');
      $('.feedback').addClass("hide");
      resetAnswerBackground();
    } else {
      alert("You have completed the Quiz challenge. Press Start to try again!!");
      resetQuestions();
      $(".submit").html('<button type="submit" value="Submit" role="button" class="submit-btn" aria-pressed="false"><p class="js-submit-text">Submit</p></button>');
      $('.feedback').addClass("hide");
      $('.startButton').removeClass("hide");
      hideElements();
    }
  });
}

//renders the current question in lower div
function renderCurrentQuestion() {
  // console.log("Current:"+currentQuestion);
  if (currentQuestion <= NOOFQUESTIONS) {
    $(".js-current-question").html(currentQuestion + 1);
  } else {
    $(".js-current-question").html(currentQuestion);
  }
}

function submitButton() {
  let outcome = 0;
  $(".submit").on("click", ".submit-btn", event => {
    event.preventDefault();
    $('.feedback').removeClass('hide');
    if (currentQuestion <= NOOFQUESTIONS) {
      //get user's choice and add to QANSWERS array
      var userInput = $("input[name='answer']:checked").val();
      if (userInput === undefined) {
        submitAnswerMessage();
      } else {
        QANSWERS.push(userInput);
        outcome = compareAnswer(parseInt(QUESTIONWITHANSWERS[currentQuestion].correctIndex),
          QANSWERS[QANSWERS.length - 1] - 1);
        outcomes.push(outcome);
        var correctAnsIndex = QUESTIONWITHANSWERS[currentQuestion].correctIndex;
        updateFeedback(outcome,
          correctAnsIndex,
          QUESTIONWITHANSWERS[currentQuestion].answer[correctAnsIndex]);
        $(".submit").html('<button type="button" value="Next Question" role="button" class="next-question-btn" aria-pressed="false"><p class="js-next-question">Next Question</p></button>');
        updateSubmit("Next Question");
      }
    }
  });
}

function updateSubmit(state) {
  if (state === "Submit") {
    $(".js-submit-text").html("<p>Submit</p>");
  } else if (state === "Next Question") {
    $(".js-submit-text").html("<p>Next Question</p>");
  }
}

function hideElements() {
  // Hide Questions, Answers, Submit and Feedback divs until quiz is started
  $('.question').addClass('hide');
  $('.answers').addClass('hide');
  $('.feedback').addClass('hide');
  $('.correct').addClass('hide');
  $('.submit').addClass('hide');
  $('.current-question-div').addClass('hide');
  $('.current-score-div').addClass('hide');
}

function showElements() {
  // Hide Questions, Answers, Submit and Feedback divs until quiz is started
  $('.question').removeClass('hide');
  $('.answers').removeClass('hide');
  $('.feedback').removeClass('hide');
  $('.correct').removeClass('hide');
  $('.submit').removeClass('hide');
  $('.current-question-div').removeClass('hide');
  $('.current-score-div').removeClass('hide');
}

function InitQuiz() {
  hideElements();
  updateCurrentScore();
  startQuiz();
  nextQuestionButton();
  submitButton();
  updateCurrentScore();
}

$(InitQuiz);
