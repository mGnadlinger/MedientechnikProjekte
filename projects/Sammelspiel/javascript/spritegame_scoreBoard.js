
let scoreLines = []; 


for (let i = 1; i <= parseInt(localStorage['playerCounter']); i++) {
    scoreLines.push(JSON.parse(localStorage[`playerScores${i}`]));
}

scoreLines.sort((a, b) => b.playerScore - a.playerScore);

console.log(scoreLines)

showScore();

function showScore() {
    for (let i = 2; i < scoreLines.length+2 || i == 11; i++) {
      document.getElementById(`div${i}`).innerHTML = 
      `<div class="column1">${i-1}</div><div class="column2">${scoreLines[i-2].playerName}</div> <div class="column3">${scoreLines[i-2].playerScore}</div> <div class="column4">${scoreLines[i-2].day}.${scoreLines[i-2].month}.${scoreLines[i-2].year} ${scoreLines[i-2].hours}:${scoreLines[i-2].minutes}</div></div>`
        
    }
}
