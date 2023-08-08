

//All the questions for the quiz
const questions = [
    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts',
    },
    {
        title: 'What does HTML stand for?',
        choices: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
        answer: 'Hyper Text Markup Language',
    },
    {
        title: 'What does CSS stand for?',
        choices: ['Cascading Style Sheets', 'I dont know', 'Cascading Summer Style', 'Cascading Stuff Soo'],
        answer: 'Cascading Style Sheets',
    },
    {
        title: 'What does * do in CSS?',
        choices: ['It targets one element', 'Makes things pretty', 'Targets all elements', 'Nada'],
        answer: 'Targets all elements',
    },
    {
        title: 'What does the <p> tag in HTML do?',
        choices: ['It defines a paragraph', 'It makes a picture', 'It makes a link', 'It makes a button'],
        answer: 'It defines a paragraph',
    },
    {
        title: 'Arrays in JavaScript can be used to store ________.',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above',
    },
    {
        title: 'String values must be enclosed within ________ when being assigned to variables.',
        choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        answer: 'quotes',
    },
    {
        title: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        answer: 'console.log',
    },
    {
        title: 'Where do you link your jQuery in your HTML file?',
        choices: ['In the head of the HTML', 'At the top of the body', 'Bottom of body above JS link', 'Bottom of body below JS link'],     
        answer: 'Bottom of body below JS link',
    },

];

var currentQuestr = 0;
var time = questions.length * 10;
var timerId;

//Setting up variables to reference DOM elements
var startBtn = document.getElementById('start-btn');
var choicesEl = document.getElementById('question-choices');
var submitBtn = document.getElementById('submit-btn');
var feed = document.getElementById('feedback');
var timerEl = document.getElementById('time');
var initialsEl = document.getElementById('initials');
var questionsEl = document.getElementById('question-screen');

function  beginQuiz() {
    // Hide the start screen
    var startScreenEl = document.getElementById('home-screen');
    startScreenEl.setAttribute('class', 'hide');

    // Un-hide the questions section
    questionsEl.removeAttribute('class');

    // Start the timer
    timerId = setInterval(timeMove, 1500);

    // Show starting time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestr];

    // Update the title with the current question
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    // Clear out any old question choices
    choicesEl.innerHTML = '';

    // Loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
        // Create new button for each choice
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.textContent = i + 1 + '. ' + choice;

        // Attach click event listener to each choice
        choiceNode.onclick = questionClick;

        // Display on the page
        choicesEl.appendChild(choiceNode);
    }
    );
}

function questionClick() {
    var buttonEl = event.target;

    if (!buttonEl.matches('button')) {
        return;
    }      

    if (buttonEl.value !== questions[currentQuestr].answer) {
        time -= 10;

        if (time < 0) {
            time = 0;
        }

        // Display new time on page
        timerEl.textContent = time;

    //     feed.textContent = 'You are wrong Hacker!';
    // } else {
    //     feed.textContent = 'You are correct!';
    }   

    // feedbackEl.setAttribute('class', 'feedback');
//     setTimeout(function() {
//         // feedbackEl.setAttribute('class', 'feedback hide');
//     }   , 1000);

//     currentQuestr++;

//     if (time <= 0 || currentQuestr === questions.length) {
//         quizEnd();
//     }   else {
//         getQuestion();
//     }
// }

function quizEnd() {
    clearInterval(timerId);

    // Show end screen
    var endScreenEl = document.getElementById('finalScreen');
    endScreenEl.removeAttribute('class');

    // Show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    // Hide questions section
    questionsEl.setAttribute('class', 'hide');
};

setTimeout(function() {
    // feedbackEl.setAttribute('class', 'feedback hide');
}   , 1000);

currentQuestr++;

if (time <= 0 || currentQuestr === questions.length) {
    quizEnd();
}   else {
    getQuestion();
}
};


function timeMove() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveScore() {
    // Get value of input box
    var initials = initialsEl.value.trim();

    if (initials !== '') {
        // Get saved scores from localstorage, or if not any, set to empty array
        var highscores = 
        JSON.parse(window.localStorage.getItem('highscores')) || [];

        // Format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };

        // Save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        // Redirect to next page
        window.location.href = 'highscores.html';
    }
}     

function checkForEnter(event) {
    if (event.key === 'Enter') {
        saveScore();
    }
}

// User clicks button to submit initials
 submitBtn.onclick = saveScore;

// User clicks button to start quiz
startBtn.onclick = beginQuiz;

initialsEl.onkeyup = checkForEnter;
