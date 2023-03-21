var startButton = $('#start');
var answersOne = ['answer1', 'answer2', 'answer3', 'answer4']

function playGame() {
    $('#startPage').hide();
    questionOne();
}

function questionOne() {
    var question = $('<h1></h1>').text('Is this working?');
    for(let i = 0; i < 4; i++) {
        question.append($('<p></p>').text(answersOne[i]));
    }
    $('body').append(question);
}

$(startButton).on("click", function () {
    playGame();
});

console.log(startButton.innerHTML);