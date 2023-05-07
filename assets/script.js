var startButton = $('#start');
var j = 0;
var score = 0;
var timeLeft = 10;
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
    question.css('color', 'white')
    question.children().on('click', (e) => {
        if(e.target.textContent === correctAnswers[j]) {
            //console.log(correctAnswers[j], e.target.textContent)
            score++
        } else {

        }
        j++;
        question.hide();
        if(j < questionList.length) {
            questions();
        } else {
            console.log(score)
        }
    })
    $('body').append(question);
}

function playGame() {
    $('#startPage').hide();
    var timer = $('<p></p>').text(`${timeLeft} seconds left`);
    $('body').append(timer);
    var x = window.setInterval(function() {
        timeLeft--;
        timer = timer.text(`${timeLeft} seconds left`);
        console.log(timeLeft)
        if (timeLeft === 0) {
            question.hide();
            timer.hide();
            var endMessage = $('<p></p>').text('Ran out of time');
            $('body').append(endMessage);
            window.clearInterval(x);
        }
    }, 1000);
    questions();
}

$(startButton).on("click", function () {
    playGame();
});

