/***********************************
 * INIT
 * **********************************/
let player = document.getElementById('player');
let spriteImg = document.getElementById('spriteImg');
let surface = document.getElementById('surface');
let rabbit = document.getElementById('rabbit');
let mushroom = document.getElementById('mushroom')
let score = document.getElementById('score');
let timer = document.getElementById('timer');
let box = document.getElementById('box');
let bullet = document.getElementById('bullet');


let playerName = "";
let playerScore = 0;
let playTime;


let clockInterval;
let scoreCounter;
let timerseconds;
let timerString = ""
let gameLoopTimeOut;



//Audios 
let audioCellectItem = new Audio("../audio/collectItem.mp3")
let audioGameOver = new Audio("../audio/gameOver.wav")
let audioWalking = new Audio("../audio/steps.mp3")
let audioMusic = new Audio("../audio/backgroundMusic.mp3")
let audioCollectMushroom = new Audio("../audio/collectMushroom.mp3")

// Scale the surface to 80% of the screen width
let surface_scale = 0.45 * (window.innerWidth / surface.clientWidth)
surface.style.transform = `scale(${surface_scale})`;

/***********************************
 * GAME CONFIG
 * **********************************/
let spriteImgNumber = 0; // current animation part of sprite image
let gameSpeed = 24; // game loop refresh rate (pictures per second)
let characterSpeed = 10; // move offset in PX



/***********************************
 * EVENT LISTENER
 * **********************************/
document.onkeydown = keydown_detected;
document.onkeyup = keyup_detected;

let leftArrow = false;
let rightArrow = false;
let upArrow = false;
let downArrow = false;

function keydown_detected(e) {
    //console.log(e);
    //console.log(e.keyCode);
    if (!e) {
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 37) { // leftArrow
        leftArrow = true;
    }
    if (e.keyCode == 38) { //upArrow
        upArrow = true;
    }
    if (e.keyCode == 39) { // rightArrow
        rightArrow = true;
    }
    if (e.keyCode == 40) { // downArrow
        downArrow = true;
    }
}
function keyup_detected(e) {
    //console.log(e);
    //console.log(e.keyCode);
    if (!e) {
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 37) { // leftArrow
        leftArrow = false;
    }
    if (e.keyCode == 38) { //upArrow
        upArrow = false;
    }
    if (e.keyCode == 39) { // rightArrow
        rightArrow = false;
    }
    if (e.keyCode == 40) { // downArrow
        downArrow = false;
    }
}



/***********************************
 * GAME LOOP
 * **********************************/

function startGame() {

    if(playerName == "") {
        playerName = document.getElementById('name').value;
    }

    audioMusic.play()
    clockInterval = setInterval(clock, 1000)
    box.innerHTML = ""
    box.style.opacity = "0"
    scoreCounter = 0;
    timerseconds = 60;

    score.innerHTML = `<p id="scoreText">${scoreCounter} Punkte</p>`

    player.style.left = '250px'; // starting position
    player.style.top = '250px'; // starting position
    player.style.opacity = '1'; // show player
    spriteImg.style.right = '0px'; // starting animation

    gameLoop();
}

function gameLoop() {
    audioWalking.pause()
    if (leftArrow) {
        movePlayer((-1) * characterSpeed, 0, -1);
        animatePlayer();
    }
    if (rightArrow) {
        movePlayer(characterSpeed, 0, 1)
        animatePlayer();
    }
    if (upArrow) {
        movePlayer(0, (-1) * characterSpeed, 0);
        animatePlayer();
    }
    if (downArrow) {
        movePlayer(0, characterSpeed, 0);
        animatePlayer();
    }
    gameLoopTimeOut = setTimeout(gameLoop, 1500 / gameSpeed); // async recursion
}



/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: move left || 1: move right || 0: no change)
 */
function movePlayer(dx, dy, dr) {
    // current position
    let x = parseFloat(player.style.left);
    let y = parseFloat(player.style.top);

    // calc new position
    x += dx;
    y += dy;

    if (x <= 0 || x >= (surface.clientWidth - player.offsetWidth)) {
        return;
    }
    if (y < 0 || y > (surface.clientWidth - player.offsetHeight)) {
        return;
    }

    // assign new position
    player.style.left = x + 'px';
    player.style.top = y + 'px';

    // handle direction
    if (dr != 0) {
        player.style.transform = `scaleX(${dr})`;
    }
    if (isColliding(player, mushroom)) {
        audioCollectMushroom.play()
        mushroom.style.display = "none"
        characterSpeed = 20;


        let speedInterval = setInterval(function () {
            characterSpeed = 10;
        }, 5000)
        //clearInterval(speedInterval)

        setTimeout(setMushroom, 20000)
    }


    if (isColliding(player, rabbit)) {

        audioCellectItem.play()

        rabbit.style.display = "none"
        setTimeout(setRabbit, 500)
        scoreCounter++;

        score.innerHTML = `<p id="scoreText">${scoreCounter} Punkte</p>`
        document.getElementById('scoreText').style.animation = 'changeScore 2s'
    }
}

/***********************************
 * ANIMATE PLAYER
 * **********************************/
function animatePlayer() {
    audioWalking.play()
    if (spriteImgNumber < 4) { // switch to next sprite position
        spriteImgNumber++;
        let x = parseFloat(spriteImg.style.right);
        x += 66.0;
        spriteImg.style.right = x + "px";
    }
    else { // animation loop finished: back to start animation
        spriteImg.style.right = "66px";
        spriteImg.style.bottom = "7px"
        spriteImgNumber = 0;
    }

}


setRabbit()
/**************************************************
 * Setting an Item (Rabbit) on an random position 
 * ************************************************/
function setRabbit() {
    rabbit.style.display = "block"
    let randomdx = Math.floor(Math.random() * (((surface.clientWidth - 5) - rabbit.clientWidth) - 5 + 1)) + 5;
    let randomdy = Math.floor(Math.random() * (((surface.clientHeight - 5) - rabbit.clientHeight) - 5 + 1)) + 5;

    rabbit.style.left = `${randomdx}px`
    rabbit.style.top = `${randomdy}px`
    rabbit.style.opacity = "1"
}

setMushroom()
function setMushroom() {
    mushroom.style.display = "block"
    let randomdx = Math.floor(Math.random() * (((surface.clientWidth - 5) - mushroom.clientWidth) - 5 + 1)) + 5;
    let randomdy = Math.floor(Math.random() * (((surface.clientHeight - 5) - mushroom.clientHeight) - 5 + 1)) + 5;

    //let random = Math.floor(Math.random() * ((max - min)+1) + min)

    mushroom.style.left = `${randomdx}px`
    mushroom.style.top = `${randomdy}px`
    mushroom.style.opacity = "1"

}

/**
 * Checks intersection between two html elements
 * @param {HTMLElement} div1 - Reference to first html element 
 * @param {HTMLElement} div2 - Reference to second html element
 * @param {number} tolerance - Integer to change accuracy of collission (0: default, negative number: detect later, positive number: detect earlier) 
 * @returns {boolean} - true or false depending on collision
 */
function isColliding(div1, div2, tolerance = -20) {

    let d1OffsetTop = div1.offsetTop;
    let d1OffsetLeft = div1.offsetLeft;
    let d1Height = div1.clientHeight;
    let d1Width = div1.clientWidth;
    let d1Top = d1OffsetTop + d1Height;
    let d1Left = d1OffsetLeft + d1Width;

    let d2OffsetTop = div2.offsetTop;
    let d2OffsetLeft = div2.offsetLeft;
    let d2Height = div2.clientHeight;
    let d2Width = div2.clientWidth;
    let d2Top = d2OffsetTop + d2Height;
    let d2Left = d2OffsetLeft + d2Width;

    let distanceTop = d2OffsetTop - d1Top;
    let distanceBottom = d1OffsetTop - d2Top;
    let distanceLeft = d2OffsetLeft - d1Left;
    let distanceRight = d1OffsetLeft - d2Left;

    return !(tolerance < distanceTop || tolerance < distanceBottom || tolerance < distanceLeft || tolerance < distanceRight);
};

function clock() {
    timerseconds--;

    if (timerseconds < 10) {
        timer.innerHTML = `<p id="time">00:0${timerseconds}</p>`;
    }
    else if (timerseconds != 60) {
        timer.innerHTML = `<p id="time">00:${timerseconds}</p>`
    }

    if (timerseconds == 0) {
        winner()
    }
}

function localeStorage() {

    if (localStorage['playerCounter'] === null || localStorage['playerCounter'] === undefined || localStorage['playerCounter'] === NaN) {
        localStorage['playerCounter'] = 0;
    }

    playerScore = scoreCounter;
    playTime = new Date();

    if(playerName == "") {
        playerName = `Player${localStorage[`playerCounter`]}`
    }

    let result = {
        playerName: playerName,
        playerScore: playerScore,
        day: playTime.getDate(),
        month: playTime.getMonth() + 1,
        year: playTime.getFullYear(),
        hours: playTime.getHours(),
        minutes: playTime.getMinutes()
    };

    let person = {
        playername: username, 
        playerscore: score
    }

    if(localeStorage['allPlayers'] == null) {
        let persons = []
    }else {
        let persons = localeStorage['allPlayers'] 
    }

    persons.push(person)


    localeStorage['allPlayers'] = persons;


    localStorage[`playerCounter`] = parseInt(localStorage[`playerCounter`]) + 1
    localStorage[`playerScores${localStorage[`playerCounter`]}`] = JSON.stringify(result)
}

//After the time is out 
function winner() {
    localeStorage()

    audioWalking.pause()
    audioGameOver.play()
    box.style.opacity = "1"
    clearInterval(clockInterval)
    clearTimeout(gameLoopTimeOut)
    movePlayer(0, 0, 0)

    box.innerHTML =
        `<h2>Time is out</h2>

    <h3>Du hast ${scoreCounter} Punkte erreicht</h3>

    <div class="row">
    
        <div class="play">
            <a href="../index.html"> <img src="../img/returnButton.png" alt="PlayButton" class="icon""></a>
	    </div>

        <div class="play">
            <img src="../img/againButton.png" alt="PlayButton" class="icon" onclick="startGame()">
        </div>
    
    </div>`
}

function next() {

    document.getElementById('box').innerHTML = `
    <div id="form">
		<label for="name">Enter your name: 
			<br>
			<input type="text" placeholder="Mariandl" id="name">
		</label>
	</div>

    <div class="play">
		<img src="../img/playButton.png" alt="PlayButton" class="icon" onclick="startGame()">
	</div>
    `

}
