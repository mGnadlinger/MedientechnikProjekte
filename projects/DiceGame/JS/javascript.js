//globale Variablen 
var livesOfPlayer1;
var damageOfPlayer1;
let livesOfPlayer2;
let damageOfPlayer2;
let playerName1 = '';
let playerName2 = '';
let dicePlayer1 = 0;
let dicePlayer2 = 0;
let result1;
let result2;

//Leben und Angriff der verschiedenen Personen 
function mario() {
    newOutput(10, 3);
}

function peach() {
    newOutput(13, 2);
}

function luigi() {
    newOutput(15, 1);
}

function bowser() {
    newOutput(5, 4);
}

//speichert den Namen und die Auswahl der Charaktere der Spieler 
function newOutput(lives, damage) {
    if (playerName1 == '' && document.getElementById('name_player1').value != '') {
        playerName1 = document.getElementById('name_player1').value;
        if (playerName1 == "Miriam" || playerName1 == "miriam") {
            document.getElementById('peachimage').innerHTML = '<img src="./Images/Toad.webp" alt="Toad" class="characterPicture">';
            document.getElementById('peachName').innerHTML = 'Toad';
            document.getElementById('luigiimage').innerHTML = '<img src="./Images/Toadette.webp" alt="Toadette" class="characterPicture">';
            document.getElementById('luigiName').innerHTML = 'Toadette';
            document.getElementById('marioimage').innerHTML = '<img src="./Images/Yoshi.webp" alt="Yoshi" class="characterPicture">';
            document.getElementById('marioName').innerHTML = 'Yoshi';
            document.getElementById('bowserimage').innerHTML = '<img src="./Images/Buu_Huu.webp" alt="Buu Huu" class="characterPicture">';
            document.getElementById('bowserName').innerHTML = 'Buu Huu';
        } 
        document.getElementById('playerHeadline').innerHTML = 'Player 2:';
        document.getElementById('inputName').innerHTML =
            '<h3 id="playerHeadline">Player 2:</h3>' +
            '<input type="text" name="name_player2" id="name_player2" class="playerNames">';
        livesOfPlayer1 = lives;
        damageOfPlayer1 = damage;

    } if (playerName2 == '' && document.getElementById('name_player2').value != '') {
        playerName2 = document.getElementById('name_player2').value;
        livesOfPlayer2 = lives;
        damageOfPlayer2 = damage;
        game();
    }
}

//gibt das Spiel aus 
function game() {
    //Blendet alle unnötigen Elemente von der Characterauswahl aus
    document.getElementById('characters').style.display = "none";
    document.getElementById('chooseHeadline').style.display = "none";
    document.getElementById('inputName').style.display = "none";

    console.log("1: " + dicePlayer1);
    console.log("2: " + dicePlayer2);

    //Lässt Spieler 1 würfeln
    if (dicePlayer1 == 0 && dicePlayer2 == 0) {
        console.log("Hallo P1");
        document.getElementById('diceBoxPlayer').style.display = "inline";
        document.getElementById('diceBoxPlayer').innerHTML = '<h2 id="headline">' + playerName1 + ', click to dice</h2>';
        document.getElementById('diceBoxPlayer').innerHTML +=
            '<div id="cube1"><img src="Images/Wuerfel.png" alt="Fragezeichen-Würfel" class="cubeimage" onclick="diceCube1()"></div>';
    }
    //Lässt Spieler 2 würfeln 
    if (dicePlayer1 != 0 && dicePlayer2 == 0) {
        console.log("Hallo P2");
        document.getElementById('headline').innerHTML = playerName2 + ', click to dice';
        document.getElementById('diceBoxPlayer').innerHTML +=
            '<div id="cube2"><img src="Images/Wuerfel.png" alt="Fragezeichen-Würfel" class="cubeimage" onclick="diceCube2()"></div>';
    }
    score();

}

//gibt den random gewürfelten Würfel aus (Player1)
function diceCube1() {
    console.log("dice1");
    dicePlayer1 = newDice();
    document.getElementById('cube1').innerHTML = '<img src="./Images/cubes/PinClipart_cube_' + dicePlayer1 + '.png"id="cubePlayer1">';
    game();
}
//gibt den random gewürfelten Würfel aus (Player2)
function diceCube2() {
    console.log("dice2");
    dicePlayer2 = newDice();
    document.getElementById('cube2').innerHTML = '<img src="./Images/cubes/PinClipart_cube_' + dicePlayer2 + '.png" id="cubePlayer2">';
    result();
}

//gibt die derzeitigen Ergebnisse aus 
function score() {
    document.getElementById('scoreBox').style.display = "block",

        document.getElementById('scoreBox').innerHTML +=
        `<div id="scoreOfPlayer1" class="score">
        <h2 id="nameOfPlayer1">${playerName1}</h2>
        <div class="row">
            <div id="LivesPlayer1">
                <p id="Player1Lives">${livesOfPlayer1}</p>
            </div>
            <img src="./Images/GreenMushroom.png" alt="Grüner Pilz aus Mario" class="Item">
        </div>
        <div class="row">
            <p id="damageOfPlayer1">${damageOfPlayer1}</p>
            <img src="./Images/Kugelwilli.webp" alt="Kugelwilli aus Mario" class="Item">
        </div>
    </div>

    <div id="scoreOfPlayer2" class="score">
        <h2 id="nameOfPlayer2">${playerName2}</h2>
        <div class="row">
            <div id="LivesPlayer2">
                <p id="Player2Lives">${livesOfPlayer2}</p>
            </div>
            <img src="./Images/GreenMushroom.png" alt="Grüner Pilz aus Mario" class="Item">
        </div>
        <div class="row">
            <p id="damageOfPlayer2">${damageOfPlayer2}</p>
            <img src="./Images/Kugelwilli.webp" alt="Kugelwilli aus Mario" class="Item">
        </div>
    </div>`;
}

//ermittelt die Ergebnisse der Runde und gibt diese aus 
function result() {
    //Spieler 1 hat gewonnen 
    if (dicePlayer1 > dicePlayer2) {
        document.getElementById('cubePlayer1').style.boxShadow = "0px 0px 1.7em 1.7em rgb(252, 210, 33)";
        document.getElementById('cubePlayer1').style.borderRadius = "40px";


        livesOfPlayer2 -= damageOfPlayer1;
        console.log("player2 " + livesOfPlayer2);

        if (livesOfPlayer2 < 0) {
            livesOfPlayer2 = 0;
        }

        score();

        dicePlayer1 = 0;
        dicePlayer2 = 0;

        document.getElementById('headline').innerHTML = `<p id="winnertext">${playerName1} won this round</p>`;

        setTimeout(function () {
            if (livesOfPlayer1 > 0 && livesOfPlayer2 > 0) {
                document.getElementById('diceBoxPlayer').innerHTML = '';
                game();

            } else {
                endresult();
            }
        }, "4000");
    }

    //Spieler 2 hat gewonnen
    if (dicePlayer1 < dicePlayer2) {

        document.getElementById('cubePlayer2').style.boxShadow = "0px 0px 1.7em 1.7em rgb(252, 210, 33)";
        document.getElementById('cubePlayer2').style.borderRadius = "40px";

        livesOfPlayer1 -= damageOfPlayer2;
        console.log("player1 " + livesOfPlayer1);

        if (livesOfPlayer1 < 0) {
            livesOfPlayer1 = 0;
        }

        score();

        dicePlayer1 = 0;
        dicePlayer2 = 0;

        document.getElementById('headline').innerHTML = `<p id="winnertext">${playerName2} won this round</p>`;

        setTimeout(function () {
            if (livesOfPlayer1 > 0 && livesOfPlayer2 > 0) {
                document.getElementById('diceBoxPlayer').innerHTML = '';
                game();

            } else {
                endresult();
            }
        }, "4000");
    }

    //Die Runde geht unentschieden aus 
    if (dicePlayer1 == dicePlayer2 && dicePlayer1 != 0) {
        dicePlayer1 = 0;
        dicePlayer2 = 0;

        document.getElementById('headline').innerHTML = '<p id="winnertext">Nobody won this round</p>';

        setTimeout(function () {
            if (livesOfPlayer1 > 0 && livesOfPlayer2 > 0) {
                document.getElementById('diceBoxPlayer').innerHTML = '';
                game();
            }
        }, "4000");
    }
}

//Gibt das Endergebniss aus 
function endresult() {
    //Spieler 1 hat das Spiel gewonnen - Ausgabe
    if (livesOfPlayer1 <= 0) {
        document.getElementById('content').innerHTML =
            `<div id="winner"> <h2> ${playerName2} is the 
        <h2><b><span style="color: #009cda;">W</span><span style="color: #fcd000;">i</span><span
        style="color: #e71e07;">n</span><span style="color: #42b132;">n</span><span
        style="color: #fcd000;">e</span><span style="color: #e71e07;">r</span></b></h2></div>

        <a href="game.html">
                <div id="startbutton"><p>Start a new game</p></div>
        </a>`;

    }
    //Spieler 2 hat das Spiel gewonnen - Ausgabe
    if (livesOfPlayer2 <= 0) {
        document.getElementById('content').innerHTML =
            `<div id="winner"> <h2> ${playerName1} is the 
        <b><span style="color: #009cda;">W</span><span style="color: #fcd000;">i</span><span
        style="color: #e71e07;">n</span><span style="color: #42b132;">n</span><span
        style="color: #fcd000;">e</span><span style="color: #e71e07;">r</span></b></h2></div>

        <a href="game.html">
                <div id="startbutton"><p>Start a new game</p></div>
        </a>`;
    }
}

//Random Würfelzahl generieren 
function newDice() {
    let randomNumber = Math.random(); /*0...-1*/
    randomNumber = randomNumber * 6; /*0....-21*/
    randomNumber = Math.floor(randomNumber); /*1,2,3,4,5.... 21*/
    randomNumber++;
    return randomNumber;
}