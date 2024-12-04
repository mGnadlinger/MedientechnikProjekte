let sources = [
    "img/city1.jpg",
    "img/city2.jpg",
    "img/city3.jpg",
    "img/city4.jpg",
    "img/city5.jpg",
    "img/city6.jpg",
    "img/city7.jpg",
    "img/city8.jpg",
    "img/city9.jpg",
    "img/city10.jpg",
    "img/city11.jpg",
    "img/city12.jpg",
    "img/city13.jpg",
    "img/city14.jpg",
    "img/city15.jpg"
]
let sourceCounter = 0;
let htmlString = '';

for (let i = 0; i < 5; i++) {
    htmlString += `<div class="flex-container">`;
    for (let j = 0; j < 3; j++) {
        htmlString += `<div><img src="${sources[sourceCounter]}" alt="galeriebild"></div>`
        sourceCounter++; 
    }
    htmlString += `</div>`

}

document.getElementById('content').innerHTML = htmlString ; 
