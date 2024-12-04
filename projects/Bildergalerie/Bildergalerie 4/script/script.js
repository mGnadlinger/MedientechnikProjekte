let counter = 1;
let htmlString = '';


for (let i = 1; i <= 24; i++) {
    document.getElementById('head').innerHTML += `<link rel="preload" href="https://picsum.photos/500?random=${(i)}" as="image"></link>`
    counter++;
}

function showGrid(boxNumber, imgNumber) {
    htmlString = `<div class="box${boxNumber} boxes" id="box${boxNumber}">`
    for (let i = 1; i <= imgNumber; i++) {
        htmlString += `<div class="box${boxNumber}_img${i}"><img src="https://picsum.photos/500?random=${counter+i}" alt="Galeriebild"></div>`
        counter++;
    }
    htmlString += `</div>`
    document.getElementById('content').innerHTML = htmlString;
}

collage()

function collage() {
    let string = ''

string += `<div class="box1 boxes" onclick="showGrid(1,7)">`
for (let j = 1; j < 8; j++) {
    string += `<div class="box1_img${j}"><img src="https://picsum.photos/500?random=${(counter++)}" alt="Galeriebild"></div>` 
}
string += `</div>`


string += `<div class="box2 boxes" onclick="showGrid(2,8)">`
for (let j = 1; j < 9; j++) {
    string += `<div class="box2_img${j}"><img src="https://picsum.photos/500?random=${(counter++)}" alt="Galeriebild"></div>` 
}
string += `</div>`


string += `<div class="box3 boxes" onclick="showGrid(3,9)">`
for (let j = 1; j < 10; j++) {
    string += `<div class="box3_img${j}"><img src="https://picsum.photos/500?random=${(counter++)}" alt="Galeriebild"></div>` 
}
string += `</div>`   

document.getElementById('row').innerHTML = string;
counter = 1;
}