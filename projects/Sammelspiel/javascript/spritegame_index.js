let left  = true;
let spriteImgNumber = 0; // current animation part of sprite image
let gameSpeed = 20; // game loop refresh rate (pictures per second)
let characterSpeed = 20; // move offset in PX
let rabbit = document.getElementById("rabbitAnimation")
let wolf = document.getElementById("spriteImg")
let player = document.getElementById("wolfPlayer")
let dashboard = document.getElementById("dashboard")

player.style.left = '1300px'; // starting position
player.style.top = '250px'; // starting position
player.style.opacity = '1'; // show player
wolf.style.right = '4px'; // starting animation
wolf.style.transform = "rotateY(180deg)"


gameLoop()
function gameLoop() {
    if (!left) {
        movePlayer((-1) * characterSpeed, 0, 1);
        animatePlayer();
    }
    if (left) {
        movePlayer(characterSpeed, 0, -1)
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

    // assign new position
    player.style.left = x + 'px';
    player.style.top = y + 'px';

    // handle direction
    if (dr != 0) {
        player.style.transform = `scaleX(${dr})`;
    }
    
}

/***********************************
 * ANIMATE PLAYER
 * **********************************/
function animatePlayer() {
 
    if (spriteImgNumber < 4) { // switch to next sprite position
        spriteImgNumber++;
        let x = parseFloat(spriteImg.style.right);
        x += 66.0;
        spriteImg.style.right = x + "px";
    }
    else { // animation loop finished: back to start animation
        spriteImg.style.right = "4px";
        spriteImg.style.bottom = "7px"
        spriteImgNumber = 0;
    }

}

setRabbit()
function setRabbit(){
        if(left) {
            rabbit.style.left = "10px"
            rabbit.style.transform = "rotateY(180deg)"
            left = false; 
        }
        else if(!left) {
            rabbit.style.left = `${dashboard.clientWidth - rabbit.offsetWidth-10}px`
            rabbit.style.transform = "rotateY(0deg)"
            left = true;
        }

    gameLoopTimeOut = setTimeout(setRabbit, 4000); // async recursion
}