
//Spielereingabe 
let sources = [
    ['./Images/Characters (1).webp', '#6e2fbc', './Images/DeadBodys (1).webp'],
    ['./Images/Characters (2).webp', '#c51210', './Images/DeadBodys (2).webp'],
    ['./Images/Characters (3).webp', '#38ffdf', './Images/DeadBodys (3).webp'],
    ['./Images/Characters (4).webp', '#62401e', './Images/DeadBodys (4).webp'],
    ['./Images/Characters (5).webp', '#132ed5', './Images/DeadBodys (5).webp'],
    ['./Images/Characters (6).webp', '#10812a', './Images/DeadBodys (6).webp'],
    ['./Images/Characters (7).webp', '#54ef3a', './Images/DeadBodys (7).webp'],
    ['./Images/Characters (8).webp', '#f37d0f', './Images/DeadBodys (8).webp'],
    ['./Images/Characters (9).webp', '#ef54bc', './Images/DeadBodys (9).webp']
];
let currentPosition1 = 0;
let currentPosition2 = 0;
let nameOfPlayer1 = '';
let nameOfPlayer2 = '';
let counter = 0;


//Anzeige der Slideshow
document.getElementById('img1').src = sources[currentPosition1][0];
document.getElementById('img2').src = sources[currentPosition2][0];


//beim Klicken wird der nächste Charakter angezeigt 
function nextPlayer1() {
    if (currentPosition1 == 0) {
        currentPosition1 = sources.length - 1;
    } else {
        currentPosition1--;
    }
    document.getElementById('img1').src = sources[currentPosition1][0];
}
function nextPlayer2() {
    if (currentPosition2 == 0) {
        currentPosition2 = sources.length - 1;
    } else {
        currentPosition2--;
    }
    document.getElementById('img2').src = sources[currentPosition2][0];
}

//beim Klicken wird der letzte Charakter angezeigt 
function previousPlayer1() {
    if (currentPosition1 == sources.length - 1) {
        currentPosition1 = 0;
    } else {
        currentPosition1++;
    }
    document.getElementById('img1').src = sources[currentPosition1][0];
}
function previousPlayer2() {
    if (currentPosition2 == sources.length - 1) {
        currentPosition2 = 0;
    } else {
        currentPosition2++;
    }
    document.getElementById('img2').src = sources[currentPosition2][0];
}

//Namenseingabe 

//bei Enter werden die Werte gespeichert
document.addEventListener('keyup', function (event) {
    if (event.key == "Enter") {
        if (nameOfPlayer1 == '' || nameOfPlayer2 == '') {
            saveNames();
        }
    }
});

function saveNames() {
    if (document.getElementById('player1Name').value != '' && nameOfPlayer1 == '') {
        counter++;
        nameOfPlayer1 = document.getElementById('player1Name').value;
        document.getElementById('player1').innerHTML = nameOfPlayer1;
        document.getElementById('player1Name').value = '';
        document.getElementById('player1Name').style.display = "none";

        document.getElementById('next1').style.backgroundColor = "black";
        document.getElementById('previous1').style.backgroundColor = "black";


        document.getElementById('chooseCharacter1').style.color = "black";

    }
    else if (document.getElementById('player2Name').value != '' && nameOfPlayer2 == '') {
        counter++;
        nameOfPlayer2 = document.getElementById('player2Name').value;
        document.getElementById('player2').innerHTML = nameOfPlayer2;
        document.getElementById('player2Name').value = '';

        document.getElementById('player2Name').remove();
        document.getElementById('next2').style.backgroundColor = "black";
        document.getElementById('previous2').style.backgroundColor = "black";
        document.getElementById('chooseCharacter2').style.color = "black";
    }
    if (nameOfPlayer1 != '' && nameOfPlayer2 != '') {
        document.getElementById('player1Name').remove();
        document.getElementById('next1').remove();
        document.getElementById('previous1').remove();
        document.getElementById('next2').remove();
        document.getElementById('previous2').remove();

        document.getElementById('chooseCharacter2').style.color = "black";
    }

    if (counter == 2) {
        //document.getElementById('box1').style.animation = 'leftSlide 2s forwards'
        //document.getElementById('box2').style.animation = 'rightSlide 2s forwards'
        setTimeout(function () {
            showgrid();
        }, 1000);
    }
}


//GAME 
let gameMatrix = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];

let currentPlayer = 1;
let winner = 0;
let sum = 0;
let boxCounter = 0;
let overallScore1 = 0;
let overallScore2 = 0;
let dings = true; 

//Audios
let clickAudio = new Audio("./Audio/ClickSound.mp3");
let victoryAudio = new Audio("./Audio/VictorySound.mp3");
let drawAudio = new Audio("./Audio/DrawSound.mp3");
let newGameAudio = new Audio("./Audio/GameStartSound.mp3");


//zeigt das Spieltfeld an
function showgrid() {

    document.getElementById('grid').innerHTML =
    `<div class="gridRow">
    <div class="box" id="box1" onclick="game(this, 0,0)"></div>
    <div class="box" id="box2" onclick="game(this, 0,1)"></div>
    <div class="box" id="box3" onclick="game(this, 0,2)"></div>
    </div>
    
    <div class="gridRow">
    <div class="box" id="box4" onclick="game(this, 1,0)"></div>
    <div class="box" id="box5" onclick="game(this, 1,1)"></div>
    <div class="box" id="box6" onclick="game(this, 1,2)"></div>
    </div>
    
    <div class="gridRow">
    <div class="box" id="box7" onclick="game(this, 2,0)"></div>
    <div class="box" id="box8" onclick="game(this, 2,1)"></div>
    <div class="box" id="box9" onclick="game(this, 2,2)"></div>
    </div>`;


    isTurnPlayer1 = true;
    console.log(isTurnPlayer1);
    document.getElementById('grid').style.animation = 'fadeIn 2s'
    document.getElementById('img1').style.animation = 'scale 1.5s forwards'
}

//Beim Klick auf ein Feld wird dieses entsprechend verändert 
function game(element, row, col) {
    if (winner == 0 && currentPlayer == 1 && gameMatrix[row][col] != 1 && gameMatrix[row][col] != 10) {
        clickAudio.currentTime = 0;
        clickAudio.play();
        element.style.backgroundColor = sources[currentPosition1][1];
        element.innerHTML = `<img src="./Images/X.png" class="icon" alt="X">`
        gameMatrix[row][col] = 1;
        currentPlayer = currentPlayer +1;
        boxCounter = boxCounter +1;

        document.getElementById('img2').style.animation = 'scale 1.5s forwards'
        document.getElementById('img1').style.animation = 'none'
        checkWinner()
    } else if (winner == 0 && currentPlayer == 2 && gameMatrix[row][col] != 1 && gameMatrix[row][col] != 10) {
        clickAudio.currentTime = 0;
        clickAudio.play();
        element.style.backgroundColor = sources[currentPosition2][1];
        element.innerHTML = `<img src="./Images/O.png" class="icon" alt="O">`
        gameMatrix[row][col] = 10;
        currentPlayer = currentPlayer -1;
        boxCounter = boxCounter +1;

        document.getElementById('img1').style.animation = 'scale 1.5s forwards'
        document.getElementById('img2').style.animation = 'none'
        checkWinner()
    }else if (gameMatrix[row][col] == 1 || gameMatrix[row][col] == 10) {
        document.getElementById('message').style.animation = 'none';
        document.getElementById('message').offsetWidth; // Trigger reflow
        document.getElementById('message').style.animation = 'fadeInAndOut 6s forwards';
        checkWinner()
    }
    
    
}   

//Überprüft, wer das Spiel gewonnen hat

function checkWinner() {
    if (gameMatrix[0][0] + gameMatrix[0][1] + gameMatrix[0][2] == 3 ||
        gameMatrix[1][0] + gameMatrix[1][1] + gameMatrix[1][2] == 3 ||
        gameMatrix[2][0] + gameMatrix[2][1] + gameMatrix[2][2] == 3 ||
        gameMatrix[0][0] + gameMatrix[1][0] + gameMatrix[2][0] == 3 ||
        gameMatrix[0][1] + gameMatrix[1][1] + gameMatrix[2][1] == 3 ||
        gameMatrix[0][2] + gameMatrix[1][2] + gameMatrix[2][2] == 3 ||
        gameMatrix[0][0] + gameMatrix[1][1] + gameMatrix[2][2] == 3 ||
        gameMatrix[2][0] + gameMatrix[1][1] + gameMatrix[0][2] == 3
    ) {
        overallScore1++;
        winner = 1; 
        console.log("Winner" + winner)       
        setTimeout(() => {
            showWinner()
        }, 500);  
        document.getElementById('img1').style.animation = 'none'
        document.getElementById('img2').style.animation = 'none'
    }
    else if (gameMatrix[0][0] + gameMatrix[0][1] + gameMatrix[0][2] == 30 ||
        gameMatrix[1][0] + gameMatrix[1][1] + gameMatrix[1][2] == 30 ||
        gameMatrix[2][0] + gameMatrix[2][1] + gameMatrix[2][2] == 30 ||
        gameMatrix[0][0] + gameMatrix[1][0] + gameMatrix[2][0] == 30 ||
        gameMatrix[0][1] + gameMatrix[1][1] + gameMatrix[2][1] == 30 ||
        gameMatrix[0][2] + gameMatrix[1][2] + gameMatrix[2][2] == 30 ||
        gameMatrix[0][0] + gameMatrix[1][1] + gameMatrix[2][2] == 30 ||
        gameMatrix[2][0] + gameMatrix[1][1] + gameMatrix[0][2] == 30

    ) {
        overallScore2++;
        winner = 2;
        setTimeout(() => {
            showWinner()
        }, 500);  
        document.getElementById('img1').style.animation = 'none'
        document.getElementById('img2').style.animation = 'none'
    }

    if (boxCounter == 9 && winner == 0) {
        draw()
    }
}

//Zeigt an wer gewonne hat 
function showWinner() {

    //alert("ldf") 
      
    victoryAudio.play()
    document.getElementById('slide').style.display = 'none'
    document.getElementById('winnerBox').style.display = "block"

    document.getElementById('scorePlayer1').style.display = "block"
    document.getElementById('scorePlayer2').style.display = "block"

    if (winner == 1) {
        document.getElementById('winnerBox').innerHTML =
            `<div class="row"><h2>${nameOfPlayer1} wins!</h2></div>
        <div class="row">
            <img id="winner" src="${sources[currentPosition1][0]}" alt="Dead Among Us Body">
            <img id="loser" src="${sources[currentPosition2][2]}" alt="Dead Among Us Body">
        </div>`
        console.log("Player 1 " + overallScore1)
        document.getElementById('scorePlayer1').innerHTML = `<p>${nameOfPlayer1}: ${overallScore1} Points</p>`;
        document.getElementById('scorePlayer2').innerHTML = `<p>${nameOfPlayer2}: ${overallScore2} Points</p>`;
    }
    if (winner == 2) {
        document.getElementById('winnerBox').innerHTML =
            `<div class="row"><h2>${nameOfPlayer2} wins!</h2></div>
        <div class="row">
            <img id="loser"src="${sources[currentPosition1][2]}" alt="Dead Among Us Body">
            <img id="winner"src="${sources[currentPosition2][0]}" alt="Among Us Body">
        </div>`
        console.log("Player 2: " + overallScore1)
        document.getElementById('scorePlayer1').innerHTML = `<p>${nameOfPlayer1}: ${overallScore1} Points</p>`;
        document.getElementById('scorePlayer2').innerHTML = `<p>${nameOfPlayer2}: ${overallScore2} Points</p>`;
    
    }
    document.getElementById('winner').style.animation = 'scale 1.5s forwards'

    setTimeout(function () {
        document.getElementById('newGame').style.display = 'block'
        document.getElementById('reset').style.display = 'block'
    }, 2000)
}
//Zeigt an das es unentschieden steht
function draw() {
    drawAudio.play()
    document.getElementById('slide').style.display = 'none'
    document.getElementById('winnerBox').style.display = "block"

    document.getElementById('winnerBox').innerHTML =
        `<div class="row"><h2>Draw! Nobody won!</h2></div>
        <div class="row">
            <img src="${sources[currentPosition1][0]}" alt="Among Us Body">
            <img src="${sources[currentPosition2][0]}" alt="Among Us Body">
        </div>`

    setTimeout(function () {
        document.getElementById('newGame').style.display = 'block'
        document.getElementById('reset').style.display = 'block'
    }, 2000)
}

//Gibt ein neues Spiel aus
function newGame() {
    newGameAudio.play()
    document.getElementById('slide').style.display = 'flex'
    document.getElementById('winnerBox').style.display = "none"
    document.getElementById('newGame').style.display = "none"
    document.getElementById('reset').style.display = "none"

    document.getElementById('message').style.display = 'none';

    gameMatrix = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];
    boxCounter = 0;
    winner = 0;

    document.getElementById('grid').innerHTML =
        `<div class="gridRow">
    <div class="box" id="box1" onclick="game(this, 0,0)"></div>
    <div class="box" id="box2" onclick="game(this, 0,1)"></div>
    <div class="box" id="box3" onclick="game(this, 0,2)"></div>
    </div>
    
    <div class="gridRow">
    <div class="box" id="box4" onclick="game(this, 1,0)"></div>
    <div class="box" id="box5" onclick="game(this, 1,1)"></div>
    <div class="box" id="box6" onclick="game(this, 1,2)"></div>
    </div>
    
    <div class="gridRow">
    <div class="box" id="box7" onclick="game(this, 2,0)"></div>
    <div class="box" id="box8" onclick="game(this, 2,1)"></div>
    <div class="box" id="box9" onclick="game(this, 2,2)"></div>
    </div>`

}