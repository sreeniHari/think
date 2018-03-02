var quiz = {
    current: 0, // current question
    total: 10, // total number of questions
    score: 0, // total number of correct answers
    choice: null, // current choice chosen
};

const renderQuestion = function () {
    const question = questions[quiz.current];
    const choicesHTML = question.choices.map(function (choice, i) {
        return `<button data-value="${i}">${choice}</button>`;
    }).join('');
    $('.question').html(`
        <p class="question-text">${question.text}</p>
        <div class="choices">
            ${choicesHTML}
        </div>
    `);
}

const renderHeader = () => {
    $('header').html(`
        <div class="score">
            Score: ${quiz.score}
        </div>
        <div class="score">
            Question: ${quiz.current} / ${quiz.total}
        </div>
    `);
};

const renderBody = () => {
    $('main').html(`
        <form class="quiz">
            <div class="question"/>
            <button class="submit">Submit</button>
        </form>
    `);
};

const renderCompleted = () => {
    $('main').html(`
        <h1>You're done!</h1>
        <p>Great job! You go ${quiz.score} right!</p>
        <button class="again">Try again?</button>
    `);
};

$('.start-btn').click(e => {
    e.preventDefault();
    renderHeader();
    renderBody();
    renderQuestion();
});


// store the answer that is clicked
$(document).on('click', '.choices button', e => {
    e.preventDefault();
    quiz.choice = $(e.target).data('value');
});

$(document).on('click', '.again', e => {
    e.preventDefault();
    quiz.current = 0;
    quiz.score = 0;
    quiz.choice = null;
    renderHeader();
    renderBody();
    renderQuestion();
});

// grade you on the question when you submit
$(document).on('submit', '.quiz', e => {
    e.preventDefault();
    const question = questions[quiz.current];
    if (quiz.choice === null) {
        console.log('Please select an answer!');
        return;
    }

    if (quiz.choice === question.answer) {
        console.log('Nice going! That\'s right!');
        quiz.score++;
    } else {
        console.log('Aw, man!  Wrong!');
    }
    quiz.choice = null;
    quiz.current++;
    renderHeader();
    if (quiz.current >= 2) {
        renderCompleted();
    } else {
        renderQuestion();
    }
});
