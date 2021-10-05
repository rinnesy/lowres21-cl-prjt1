let startButton = document.getElementById('start-btn');
let nextButton = document.getElementById('next-btn');

let startContainerElement = document.getElementById ('start-container');
let gameContainerElement = document.getElementById ('game-container');
let gameContainerElement2 = document.getElementById ('game-container-MIA');
let gameContainerElement3 = document.getElementById ('game-container-BP');
let questionElement = document.getElementById('song');
let questionArtCover = document.getElementById('cover');
let answerButtonsElement = document.getElementById('answer-buttons');
let attemptsContainer = document.getElementById('attempts-container');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNext
})

console.log(startContainerElement);

// Start the game
function startGame() {
console.log('Started');
startButton.classList.add('hide');
startContainerElement.classList.remove('show');
startContainerElement.classList.add('hide');
console.log(startContainerElement);
gameContainerElement.classList.remove("hide");
gameContainerElement.classList.add('show');
console.log(gameContainerElement);
attemptsContainer.classList.remove("hide");
attemptsContainer.classList.add('show');
console.log(attemptsContainer);

// shuffledQuestions = questions.sort(() => Math.random() -.5);
currentQuestionIndex = 0;

nextQuestion()
}

// Select an answer
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    console.log(selectedButton.id);
    nextQuestion();
}

// Move to the next question
function nextQuestion() {
    resetState();
    showQuestion();
}

function showQuestion(questions) {
    questionElement.innerHTML = question.question;
    questionArtCover.src = question.img;
    question.answers.array.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState () {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}


function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.add('wrong');
}

const questions = [
    {
        question: "Same Ol' Mistakes\nRihanna",
        img: '"/media/music-covers/rihanna-antiCover.png"',
        answers: [
            { text: "New Person, Same Old Mistakes\nTame Impala", correct: true },
            { text: "Mistakes\nMorray", correct: false },
            { text: "Upgrade U\nBeyonce", correct: false },
            { text: "Building a Ladder\nHiatus Kaiyote", correct: false }
        ],
        question: "20 Dollar\nM.I.A.",
        img: '',
        answers: [
            { text: "10 Dollar\nM.I.A.", correct: false },
            { text: "Funky Dollar Bill\nFunkadelic", correct: false },
            { text: "20 Something\nSZA", correct: false },
            { text: "Where Is My Mind?\nPixies", correct: true }
        ],
        question: "Don't Turn Around\nBiig Piig",
        img: '"/media/music-covers/biigPiigCover.png"',
        answers: [
            { text: "Turning Point\nMario", correct: false },
            { text: "Don't Play Around\nGunna", correct: false },
            { text: "Get It On Tonite\nMontell Jordan", correct: true },
            { text: "Thinking Out Loud\nMiguel", correct: false }
        ] 
    }
]

// Setup settings menu
// 1. Set the width of the side navigation to 250px
function openNav () {
    document.getElementById("mySidenav").style.width = "250px";
}

// 2. Set the width of the side navigation to 0
function closeNav () {
    document.getElementById("mySidenav").style.width = "0";
}

// Difficulty options
// 1. select difficulty buttons
$("#medium").click(function(evt){
    // 2. identify the clicked option
    let difficultyID = evt.target.id;
    console.log (difficultyID);

    // 3. change CSS for medium when selected
    $("#medium").css("background", "#de6c1a");
})
$("#hard").click(function(evt){
    // 4. identify the clicked option
    let difficultyID = evt.target.id;
    console.log (difficultyID);

    // 5. change CSS for medium & hard when hard is selected
    $("#medium").css("background", "#de6c1a");
    $("#hard").css("background", "#C81E27");
})

// Setup option buttons
// 1. select option buttons
$(".game-options").click(function(evt){
    // 2. identify the clicked button
    let itemID = evt.target.id;
    console.log(itemID);

    // 3. change button CSS when correct answer is selected
    $(".correct").css("background", "#217C12");
    $(".correct").css("border-color", "#217C12");
});



/* ----- p5js code ----- */
let remainingLives = ["X\n", "X\n", "X\n"];
let usedLives = [];

let correctButton;
let incorrectButton;


function setup() {
  const myCanvas = createCanvas(155, 388);
  myCanvas.parent('attempts-container');
//   background(10);
  
  correctButton = document.getElementById("correct"); 
  incorrectButton = document.getElementById("incorrect"); 
//   correctButton.position = (0,0);
//   incorrectButton.position = (0, 10);
  
}

function draw() {
    fill(200,40,30);
    stroke(0);
    textSize(25);
    textAlign(CENTER);
    text("ATTEMPTS", width/2, height/4.5);
    // 1. Fill container with 3 blank X's
    for (var i = 0; i < remainingLives.length; i++) {
    stroke(220);
    noFill();
    textSize(75)
    text(remainingLives.join(''), width/2, height/2.5);
    stroke(0);
    textSize(75);
    fill(200,40,30);
    text(usedLives.join(''), width/2, height/2.5);
    } 
     // 2. Listen for wrong answer
    incorrectButton.addEventListener('click', loseAttempt);
    correctButton.addEventListener('click', correctDisplay);
    
  }

// 3. If wrong answer selected, ask how many attempts remain & if at least one attempt remains, give the X a red fill
function loseAttempt () { 
 if (remainingLives.length > 0 && usedLives.length < 3) {
     remainingLives.pop;
     usedLives.push("X\n");
     console.log(remainingLives);
     console.log(usedLives);
  }
}

function correctDisplay () {
  background(color('green'));
  
}

// Music Player (from github)
var player = document.getElementById("player");
let progress = document.getElementById("progress");
let playbtn = document.getElementById("playbtn");

var playpause = function () {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

playbtn.addEventListener("click", playpause);

player.onplay = function () {
  playbtn.classList.remove("fa-play");
  playbtn.classList.add("fa-pause");
}

player.onpause = function () {
  playbtn.classList.add("fa-play");
  playbtn.classList.remove("fa-pause");
}

player.ontimeupdate = function () {
  let ct = player.currentTime;
  current.innerHTML = timeFormat(ct);
  //progress
  let duration = player.duration;
  prog = Math.floor((ct * 100) / duration);
  progress.style.setProperty("--progress", prog + "%");
}

function timeFormat(ct) {
  minutes = Math.floor(ct / 60);
  seconds = Math.floor(ct % 60);

  if (seconds < 10) {
    seconds = "0"+seconds;
  }

  return minutes + ":" + seconds;
}