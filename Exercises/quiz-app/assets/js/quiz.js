var quiz = {
    current: 0, // current question
    total: 10, // total number of questions
    score: 0, // total number of correct answers
};

var renderQuestion = function (question) {
    var choicesHTML = question.choices.map(function (choice, i) {
        return `<button data-value="${i}">${choice}</button>`;
    }).join('');
    $('.question').html(`
        <p class="question">${question.text}</p>
        <div class="choices">
            ${choicesHTML}
        </div>
    `);
}

$('.start-btn').click(function (e) {
    e.preventDefault();
    $('header').html(`
        <div class="score">
            Score: ${quiz.score}
        </div>
        <div class="score">
            Question: ${quiz.current} / ${quiz.total}
        </div>
    `);
    $('main').html(`
        <div class="question"/>
        <button class="submit">Submit</button>
    `);
    renderQuestion(questions[0]);
});
