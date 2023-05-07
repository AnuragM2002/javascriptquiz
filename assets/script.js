var startButton = $('#start');
var scoreButton = $('#score');
var submitButton = $('<button></button>').text('Submit Score');
var j = 0;
var score = 0;
var timeLeft = 30;
var question = '';
var answersOne = ['<script src="xxx.js">', '<script name="xxx.js">', '<script href="xxx.js">', '<script="xxx.js">']
var answersTwo = ['if i == 5 then', 'if(i == 5)', 'if i = 5', 'if i = 5 then']
var answersThree = ['if i <> 5', 'if(i <> 5)', 'if i =! 5 then', 'if(i != 5)']
var answersFour = ['for(i <= 5; i++)', 'for i = 1 to 5', 'for(i = 0; i <= 5; i++)', 'for(i = 0, i <= 5)']
var answersFive = ['var colors = [red, green, blue]', 'var colors = 1 = (red), 2 = (green), 3 = (blue)', 'var colors = red, green, blue', 'var colors = (1: red, 2: green, 3: blue)']
var answerList = [answersOne, answersTwo, answersThree, answersFour, answersFive]
var correctAnswers = ['<script src="xxx.js">', 'if(i == 5)', 'if(i != 5)', 'for(i = 0; i <= 5; i++)', 'var colors = [red, green, blue]']
var questionList = ['What is the correct syntax for referring to an external script called "xxx.js?', 
'How to write an IF statement in JavaScript?', 
'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
'How does a FOR loop start?',
'What is the correct way to write a JavaScript array?']

function questions() {
    question = $('<h1></h1>').text(questionList[j]);
    for(let i = 0; i < 4; i++) {
        question.append($('<p></p>').text(answerList[j][i]));
    }
    question.children().on('click', (e) => {
        if(e.target.textContent === correctAnswers[j]) {
            score++
        } else {
            timeLeft = timeLeft - 5;
        }
        j++;
        question.hide();
        if(j < questionList.length) {
            questions();
        } 
    })
    $('body').append(question);
}

function playGame() {
    $('#startPage').hide();
    var timer = $('<p></p>').text(`${timeLeft} seconds remaining`);
    $('body').append(timer);
    $(submitButton).on('click', function () {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        var savedScores = [localStorage.getItem("scores")];
        var savedDates = [localStorage.getItem("dates")]
        savedDates.push(datetime);
        savedScores.push(score);
        localStorage.setItem("scores", savedScores);
        localStorage.setItem("dates", savedDates);
        location.reload();
    })
    var x = window.setInterval(function() {
        timeLeft--;
        timer = timer.text(`${timeLeft} seconds remaining`);
        if (j >= questionList.length) {
            window.clearInterval(x);
            var endMessage = $('<p></p>').text(`You scored ${score} out of 5!`);
            $('body').append(endMessage);
            endMessage.append(submitButton);
        }
        if (timeLeft <= 0) {
            question.hide();
            timer.hide();
            var timeEnd = $('<p></p>').text('Ran out of time');
            var endMessage = $('<p></p>').text(`You scored ${score} out of 5!`);
            $('body').append(timeEnd);
            $('body').append(endMessage);
            endMessage.append(submitButton);
            window.clearInterval(x);
        }
    }, 1000);
    questions();
}

function showScores() {
    $('#startPage').hide();
    var scoreArray = localStorage.getItem("scores").split('').filter(Number);
    var date = localStorage.getItem("dates").split(',');
    console.log(date);
    var scoreTable = $('<h1></h1>').text('Past Scores');
    var back = $('<button></button>').text('Back');
    $(back).on('click', function() {
        scoreTable.hide();
        back.hide();
        $('#startPage').show();
    })
    $('body').append(scoreTable);
    $('body').append(back);
    for (let i = 0; i < scoreArray.length; i++) {
        scoreTable.append($('<p></p>)').text(`${scoreArray[i]}/5, ${date[i+1]}`));
    }
    scoreTable.children().on('click', (e) => {
        e.target.textContent == '';
    })
}

$(startButton).on("click", function () {
    playGame();
});

$(scoreButton).on("click", function () {
    showScores();
})





