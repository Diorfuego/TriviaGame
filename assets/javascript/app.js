// however many seconds have passed so far 
var secondsPassed = 0
// however many seconds we allocate for a given round
var secondsForRound = 30
// however many seconds left in a round 
var secondsLeft = secondsForRound

// interval id for pause/play purposes
var intervalID = null;
var correctAnswer = 0;
var wrongAnswer = 0;
var currentQuestionIndex = 0;

var questionsA = []
var randomQuestionIndex = 0 //= Math.random() * (triviaQuestions.length - 0) + 0;

var triviaQuestions = [{
        question: "What is the name of the villiage naruto is from?",
        answerChoices: ['white dragon villa', 'hidden leaf village', 'hidden rain village', 'red eyes black dragon'],
        answer: 'hidden leaf village'
    },
    {
        question: 'Who is sauske\'s brother?',
        answerChoices: ['Madara', 'Itachi', 'Naruto', 'Kurama'],
        answer: 'Itachi'
    },
    {
        question: 'Who does Naruto marry?',
        answerChoices: ['Hinata', 'Tsunade', 'Konan', 'Sakura'],
        answer: 'Hinata'
    },
    {
        question: 'Who was the first main villian in the Naruto series?',
        answerChoices: ['Madura', 'Deidara', 'Orochimaru', 'Sasori'],
        answer: 'Orochimaru'
    },
    {
        question: 'Who is the god of chalkra?',
        answerChoices: ['Kaguya', 'Hagoromo', 'Obito', 'Hashirama'],
        answer: 'Kaguya'
    },
    {
        question: "When does Naruto meet his father?",
        answerChoices: ['During the great Shinobi war', 'During the fight against pain', 'After getting married', 'Pervy Sage told him'],
        answer: 'During the great Shinobi war'
    }
]

function reset() {
    secondsPassed = 0;
    secondsLeft = secondsForRound;
}

function showResult(){
    clearInterval(intervalID);
    $("#panel").empty();
    $("#panel").append("Correct answers: " + correctAnswer + "<br/>");
    $("#panel").append("Incorrect answers: " + wrongAnswer);
    $("#panel").removeClass("hidden");

        $("#start-button").removeClass("hidden");

        $("#timer-container").addClass("hidden");
     

        $("#question-container").addClass("hidden");

        $("#answer-container").addClass("hidden");
       

    
}

function nextQuestion(){
    currentQuestionIndex++;
    console.log(currentQuestionIndex + "/" + triviaQuestions.length);
    if (currentQuestionIndex < triviaQuestions.length) {
        //  Set up next question
        var currentQuestion = triviaQuestions[currentQuestionIndex];
        $('#question').text(currentQuestion.question);
        $('#answer-choice-one').text(currentQuestion.answerChoices[0]);
        $('#answer-choice-two').text(currentQuestion.answerChoices[1]);
        $('#answer-choice-three').text(currentQuestion.answerChoices[2]);
        $('#answer-choice-four').text(currentQuestion.answerChoices[3]);

        reset();
    } else {
        //  Go to tally screen

        showResult();

        
    }


}

function gameTick() {


    // every seconds, increment amount of seconds
    // that have passed 
    secondsPassed = secondsPassed + 1
    // calculate amount of seconds left (30 - secondsPassed)
    secondsLeft = secondsForRound - secondsPassed
    // print seconds to html/document 
    $("#time").text(secondsLeft)

    // we will populate the page with a new set of questions
    // when the following occur

    // when times runs out, get next question from 
    // triviaQuestionn array and populate the HTML 

    // round is over 
    if (secondsLeft < 0) {

        nextQuestion();
    }
};


$(document).ready(function() {
    $(".answer-choice").on("click", function() {
        if(triviaQuestions[currentQuestionIndex].answer === $(this).text()) {
            console.log(correctAnswer);
            correctAnswer++;
        }
        else {
            wrongAnswer++
        }
        nextQuestion();

        
    });

    $("#start-button").click(function (event) {
        $("#start-button").addClass("hidden");

        $("#panel").addClass("hidden");

        currentQuestionIndex = 0

        $("#timer-container").removeClass("hidden");
       

        $("#question-container").removeClass("hidden");
     

        $("#answer-container").removeClass("hidden");
       

        // start the game with index 0

        // var currentQuestion = triviaQuestions[currentQuestionIndex]

        // $('#question').text(currentQuestion.question)
        // $('#answer-choice-one').text(currentQuestion.answerChoices[0])
        // $('#answer-choice-two').text(currentQuestion.answerChoices[1])
        // $('#answer-choice-three').text(currentQuestion.answerChoices[2])
        // $('#answer-choice-four').text(currentQuestion.answerChoices[3])

        // start the game  
        intervalID = setInterval(gameTick, 1000);

        currentQuestionIndex = -1;
        correctAnswer = 0
        wrongAnswer = 0
        nextQuestion();
    });
});
