layout()

function layout() {
    let htmlString = '';
    let numberArray = [];

    while (numberArray.length < 24) {
        let number = randomNumber(1, 24);

        if (!numberArray.includes(number)) {
            htmlString +=
                `<div class="div${number}">
                    <div class="door" id="door${number}" onclick="loadDoor(${number})">
                        <h3>${number}</h3>
                    </div>
                </div>`;
            numberArray.push(number);
        }
    }

    document.querySelector('#parent').innerHTML = htmlString;

    numberArray.forEach((number, index) => {
        let element = document.querySelector(`.div${number}`);
        let elementDoor = document.querySelector(`#door${number}`);
        let row = Math.floor(index / 6) + 1;
        let col = (index % 6) + 1;
        element.style.gridArea = `${row} / ${col} / ${row + 1} / ${col + 1}`;
        elementDoor.style.marginTop = `${(Math.random() * (2.3 - 0.1 + 1)) + 0.1}vw`
    });
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let doorAudio = new Audio("./audio/jingle-bells.mp3")

function loadDoor(dayId) {

    doorAudio.play();

    fetch(`./api/adventskalender.php?day=${dayId}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.code === 200) {

                let doorElement = document.querySelector(`#door${dayId}`);
                doorElement.style.animation = `doorAnimationForward 1.5s forwards`;

                setTimeout(function () {
                    document.querySelector('.overlay').style.display = `block`
                    document.querySelector('.overlay').style.zIndex = `200`
                }, 1000);


                output(data.doorContent);
            } else {
                document.querySelector('.content').innerHTML += "<h2>Fehler beim Laden des gewählten Türchens</h2>";
            }
        })
        .catch((error) => {
            console.log("Fehler:", error);
        });
}

function output(data) {

    setTimeout(function () {
        document.querySelector(`#door${data[0].day}`).style.display = 'none'
        document.querySelector(`#door${data[0].day}`).style.background = `rgba(0, 0, 0, 0.5)`;


        let htmlString = '';
        htmlString += `
    <div id="section1" class="gsap_scrollReveal">
        <div id="header">
                <div class="headerdiv1">${data[0].day}</div>
                    <div class="headerdiv3" onclick="back('door${data[0].day}')">
                        <img src="./img/icons8-links-100.png" alt="">
                    </div>
                <h2 class="headerdiv2">(Merry Christmas)</h2>
        </div>       
    </div>`;


        htmlString += `
    <div id="section2" class="gsap_scrollReveal">
        <p class="countdown-text">Noch <b>${data[0].daysUntilChristmas}</b> Tage bis Weihnachten</p>
    </div>`;


        htmlString += `
        <div id="section3" class="gsap_scrollReveal">
            <div class="quote">
                <p> "${data[0].quote}"</p>
            </div>
        </div>`;

        const quiz = data[0].quiz;
        htmlString += `
    <div id="section4" class="gsap_scrollReveal quiz-section">
        <h3>${quiz.question}</h3>
        <div class="answers">`;

        for (let i = 0; i < quiz.answers.length; i++) {
            const answer = quiz.answers[i];
            const isCorrect = answer === quiz.correctAnswer;

            htmlString +=
                `<div class="answer" data-correct="${isCorrect}" data-question='${JSON.stringify(data)}' onclick="checkAnswer(this)">
                ${answer}
            </div>`
        }

        htmlString += `
        </div>
    </div>`;

        htmlString += `
        <div id="section5" class="gsap_scrollReveal">
            <div id="errorMessage">
                
            </div>
        </div>`;

        document.querySelector('.doorContent').innerHTML = htmlString;


    }, 1000);


    // INIT GSAP SCROLL PLUGIN
    gsap.registerPlugin(ScrollTrigger);

    // SHOW CONTENT
    window.onload = () => {
        document.querySelector('#content').style.opacity = 1;
    }

    let sections = document.querySelectorAll('.gsap_scrollReveal');

    for (let i = 0; i < sections.length; i++) {
        generateScrollAnimation(i, sections);
    }
}


function generateScrollAnimation(i, sections) {
    let element = sections[i];

    /* SET START KEY FRAME */
    if (i % 2 === 0) {
        gsap.set(element, {
            x: '-20%',
            scale: 0,
            opacity: 0
        });
    } else {
        gsap.set(element, {
            x: '20%',
            scale: 0,
            opacity: 0
        });
    }

    /* SET END KEY FRAME */
    gsap.to(element, {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
            trigger: element,
            start: '30% 80%',
        }
    });
}


function checkAnswer(element) {
    element.onclick = null;
    const correct = element.dataset.correct === "true";
    const questionData = JSON.parse(element.getAttribute('data-question'));
    if (correct) {
        element.classList.add('correct');
        document.querySelector('#errorMessage').innerHTML = `<p>Richtig! <br> ${questionData[0].quiz.correctAnswerSentence} </p>`

        let answers = document.getElementsByClassName('answer');
        for (let i = 0; i < answers.length; i++) {
            answers[i].onclick = null;
            answers[i].style.cursor = 'auto'
        }

    } else {
        element.classList.add('incorrect');
        document.querySelector('#errorMessage').innerHTML = `<p>Falsch! Probier es doch noch einmal </p>`
    }
}

function back(doorId) {
    let doorElement = document.querySelector(`#${doorId}`);
    doorElement.style.animation = `doorAnimationBackward 1.5s forwards`;
    doorElement.style.display = 'flex'
    document.querySelector('.overlay').style.display = "none";
    document.querySelector('.door').style.display = "block"
}