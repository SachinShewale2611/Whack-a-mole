const score = document.getElementById('score');
const timeLeft = document.getElementById('time-left');
const squares = document.querySelectorAll('.square');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const grid = document.getElementById('grid');
const audio = document.getElementById('audio');

let clicked;
let gameTimer;
let moleInterval;
let scoreCounter = 0;
let speed = 1000;
let gameTimeCount = 15;
let gameStarted = false;
let prevMolePosition = 0;
let gridSize = squares.length;
const showMole = `<img src="Assets/mole.png" id="mole-img">`;


//change Difficulty  
const changeMode = () => {
     switch(select.value){
     case'1':
          speed = 1000;
          break;
     case'2':
          speed = 850;
          break;
     case'3':
          speed = 600;
          break;
     case'4':
          speed = 450; 
     }
}

//get random position
const randomPosition = () => {
     let randomSquare = Math.floor(Math.random() * gridSize);
     while(prevMolePosition === randomSquare) {
          randomSquare = Math.floor(Math.random() * gridSize);
     }
     prevMolePosition = randomSquare;
     return randomSquare;
}

//set random location of the mole
const randomizeMole = () => {
     let mole = document.querySelector('.mole');
     mole.classList.remove('mole');
     mole.innerHTML = '';
     let currentMolePosition = squares[randomPosition()];
     currentMolePosition.classList.add('mole');
     currentMolePosition.innerHTML = showMole;
     clicked = false;
}

//set time interval when game starts;
const startGame = () => {
     if (!gameStarted) {
          resetGame();
          gameStarted = true;
          scoreCounter = 0;
          moleInterval = setInterval(() => {
               randomizeMole();
          }, speed);
          gameTimer = setInterval(() => {
               gameTimeCount--;
               timeLeft.innerHTML = gameTimeCount + "s";
               checkGameTimer();
          }, 1000)
     }
}

//check timeout of the game
const checkGameTimer = () => {
     if (gameTimeCount === 0) {
          clearInterval(gameTimer);
          clearInterval(moleInterval);
          gameStarted = false;
          gameTimeCount = 15;
          squares[parseInt(gridSize/2)].innerHTML = `Your Score Is ${scoreCounter}`;
          let mole = document.querySelector('.mole');
          mole.innerHTML = '';
     }
}
//count score
const countScore = () => {
     if(gameStarted){
          audio.currentTime = 0;
          audio.play();
          scoreCounter++;
          let mole = document.querySelector('.mole');
          mole.innerHTML = '';
          score.innerHTML = scoreCounter;
     }
}

//Reset the game
const resetGame = () => {
     clearInterval(moleInterval);
     clearInterval(gameTimer);
     scoreCounter = 0;
     gameTimeCount = 15;
     timeLeft.innerHTML = gameTimeCount + "s";
     score.innerHTML = scoreCounter;
     gameStarted = false;
     squares[parseInt(gridSize/2)].innerHTML = "";
}

//start the game when start button is clicked;
start.addEventListener('click', startGame);
grid.addEventListener('click', (e) => {
     if (e.target.parentElement.classList.contains('mole') && !clicked){
          countScore();
          clicked = true;
     }
})
reset.addEventListener('click', resetGame);

const select = document.getElementById('select');

select.addEventListener('change',changeMode);
