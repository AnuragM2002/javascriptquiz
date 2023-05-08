var startButton = $('#start');
var scoreButton = $('#score');
var submitButton = $('<button></button>').text('Submit Score');
var j = 0;
var score = 0;
var timeLeft = 30;
var question = '';

// All the questions and answers are written in arrays so that they can be easily manipulated with the functions.
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

// Makes the questions and answers visible based on the arrays above.
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

// Saves information, creates the timer and gets the date and time of each completed quiz.
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

// Shows a list of past scores with the date and time. Stores data using local storage.
function showScores() {
    $('#startPage').hide();
    var scoreArray = localStorage.getItem("scores").split('').filter(Number);
    var date = localStorage.getItem("dates").split(',');
    if (date.length > scoreArray.length) {
        date.shift();
    }
    var scoreTable = $('<h1></h1>').text('Past Scores');
    var back = $('<button></button>').text('Save and quit');
    $(back).on('click', function() {
        scoreTable.hide();
        back.hide();
        var newArr = scoreArray.filter(Number);
        var newArr2 = date.filter(e => !e.includes('x'));
        localStorage.setItem("scores", newArr);
        localStorage.setItem("dates", newArr2);
        $('#startPage').show();
    })
    $('body').append(scoreTable);
    $('body').append(back);
    for (let i = 0; i < scoreArray.length; i++) {
        scoreTable.append($('<p></p>)').text(`${scoreArray[i]}/5, ${date[i]}`).attr("id", i));
    }
    scoreTable.children().on('click', function(e) {
        let test = e.target;
        let i = test.getAttribute("id");
        test.remove();
        scoreArray.splice(i, 1, 'x');
        date.splice(i, 1, 'x');
    });
}

// Starts the quiz
$(startButton).on("click", function () {
    playGame();
});

// Shows the scores
$(scoreButton).on("click", function () {
    showScores();
})

