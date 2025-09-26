let steady = document.querySelector('.steady');
let burst = document.querySelector('.burst');
let balloonContainer = document.querySelector('.balloon-container');
let cloud = document.querySelectorAll('.clouds');
let scoreElement = document.getElementById('totalScore');
let startMenu = document.querySelector('.start');
let gameOverMenu = document.querySelector('.gover');
let scoreBoard = document.querySelector('.score-board');
let result = document.getElementById('result');
let menuContainer = document.querySelector('.menu-container');
let timeOut = document.querySelector('.timeout');
let popSound = new Audio('pop.mp3');
let speed = 1000;
let totalScore = 0;
let minDistance = 0;
let isOver = true;
let deadTime = 7000;
let pauseDelay = 30000;
let transitionTime = 5;
let started;
let deadTimeInterval;
let speedUp;
let clickCount = 0;

function swingClouds() {
    for (let i = 0; i < cloud.length; i++) {
        let randomIndex = Math.floor(Math.random() * cloud.length);
        let randomX = Math.floor(Math.random() * 350);
        cloud[i].style.top = `${minDistance}px`;
        cloud[i].style.left = `${randomX}px`;
        minDistance += 100;
    }
}

function moveRandom() {
    for (let i = 0; i < cloud.length; i++) {
        let lr = ['-100px', '100px'];
        for (let swingX = 0; swingX < lr.length; swingX++) {
            // will work here later..

        }
        let randomX = Math.floor(Math.random() * 350);
        cloud[i].style.top = `${minDistance}px`;
        cloud[i].style.left = `${randomX}px`;
        minDistance += 100;
    }
}

function randomPositions() {
    const angle = Math.floor((Math.random() * 360) + 1);
    const x = Math.floor(Math.random() * 400);
    const y = Math.floor(Math.random() * 400);
    balloonContainer.style.top = `${y}px`;
    balloonContainer.style.left = `${x}px`;
    // rotate the bursting balloon
    // burst.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

}

function blast() {
    burst.style.display = 'block';
    setTimeout(function () {
        balloonContainer.style.display = 'none'
    }, 150);
    setTimeout(function () {
        randomPositions();
        balloonContainer.style.display = 'block';
        steady.style.display = 'block';
        burst.style.display = 'none';
    }, 600);
}

function deadTimeCall() {
    // game over menu
    deadTimeInterval = setTimeout(function () {
        gameOver(pauseDelay);
    }, deadTime);

    // reset timeout bar
    timeOut.style.boxShadow = 'inset 0 0 0 white';
    timeOut.style.backgroundColor = ' rgb(122, 255, 122)';
    timeOut.style.transition = 'box-shadow 0s linear, background-color 0s linear';
    // empty
    setTimeout(function () {
        timeOut.style.boxShadow = 'inset -400px 0 0 white';
        timeOut.style.backgroundColor = ' rgb(255, 66, 66)';
        timeOut.style.transition = `box-shadow ${deadTime / 1000}s linear, background-color ${deadTime / 1000}s linear`;
    }, 100);
}

steady.addEventListener('click', function () {
    popSound.play();
    steady.style.display = 'none';
    blast();
    totalScore += 5;
    scoreElement.innerHTML = totalScore;
    result.innerHTML = totalScore;
    clearInterval(deadTimeInterval);
    deadTime = 7000;
    deadTimeCall();
    sppedControl();

    console.log(speed);

});

function sppedControl() {
    clearInterval(started);

    // changing speed according to scores
    if (totalScore >= 400) {
        speed = 650;
    } else if (totalScore >= 350) {
        speed = 650;
    } else if (totalScore >= 300) {
        speed = 700;
    } else if (totalScore >= 250) {
        speed = 750;
    } else if (totalScore >= 200) {
        speed = 800;
    } else if (totalScore >= 150) {
        speed = 850;
    } else if (totalScore >= 100) {
        speed = 900;
    } else if (totalScore >= 50) {
        speed = 950;
    }
    started = setInterval(function () {
        randomPositions();
    }, speed);
}


// when popup menu is clicked
startMenu.addEventListener('click', function () {
    startGame();
    deadTimeCall();
})
gameOverMenu.addEventListener('click', function () {
    gameOver(200);
})

function startGame() {
    clearInterval(started);
    speed = 1000;
    totalScore = 0;
    scoreElement.innerHTML = totalScore;
    result.innerHTML = totalScore;
    startMenu.style.top = '-50%';
    menuContainer.style.background = 'rgba(0,0,0,0)';
    setTimeout(function () {
        started = setInterval(function () {
            randomPositions();
        }, speed);
    }, 100);
    setTimeout(function () {
        menuContainer.style.display = 'none';
    }, 400);
}

function gameOver(pauseDuration) {
    clearInterval(started);
    startMenu.style.top = '-50%';
    menuContainer.style.display = 'block';
    menuContainer.style.background = 'rgba(0,0,0,.5)';
    setTimeout(function () {
        gameOverMenu.style.top = '50%';
        scoreBoard.style.top = '50%';
    }, 100);
    setTimeout(function () {
        gameOverMenu.style.top = '-50%';
        scoreBoard.style.top = '-50%';
    }, pauseDuration);
    setTimeout(function () {
        startMenu.style.top = '50%';
    }, pauseDuration + 800);
}

if (isOver) {
    menuContainer.style.display = 'block';
    startMenu.style.top = '50%';
}




swingClouds();
randomPositions();
