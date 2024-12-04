let counter = 1;
let htmlString = '';

addRow();
addRow();
addRow()

function addRow() {
    htmlString += `<div class="flex-container">`;
    for (let j = 0; j < 3; j++) {
        htmlString += `<div><img src="https://picsum.photos/500?random=${counter}" alt="galeriebild"></div>`
        counter++;
    }
    htmlString += `</div>`

    document.getElementById('content').innerHTML += htmlString;
    htmlString = ''
}


