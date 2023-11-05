const boxes = Array.from(document.getElementsByClassName('box'));
const restart_btn = document.getElementById('restart-btn');
restart_btn.addEventListener('click', Restart);
const headerText = document.getElementById('header-text');
const areas = [null, null, null, null, null, null, null, null, null];
const o_text = "O";
const x_text = "X";
let currentPlayer = o_text;
let winBoxIds = [];

function bindClickEvent() {
    boxes.forEach(box => {
        box.addEventListener('click', handleBoxClick);
    });
}

bindClickEvent();

function handleBoxClick(e) {
    if (winBoxIds.length > 0) {
        return;
    }
    const id = e.target.id;
    if (!areas[id]) {
        areas[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;

        if (hasPlayerWon(currentPlayer)) {
            headerText.innerHTML = `Player ${currentPlayer} has won!`;
            headerText.style.background = 'aqua';
            changeWinBoxesBg();
        } else if (areas.every(area => area !== null)) {
            headerText.innerHTML = "It's a draw!";
            headerText.style.background = 'aqua';
        } else {
            currentPlayer = currentPlayer === o_text ? x_text : o_text;
        }
    }
}

function hasPlayerWon(cPlayer) {
    if (areas[0] === cPlayer) {
        if (areas[1] === cPlayer && areas[2] === cPlayer) {
            winBoxIds = [0, 1, 2];
            return true;
        }
        if (areas[3] === cPlayer && areas[6] === cPlayer) {
            winBoxIds = [0, 3, 6];
            return true;
        }
        if (areas[4] === cPlayer && areas[8] === cPlayer) {
            winBoxIds = [0, 4, 8];
            return true;
        }
    }
    if (areas[4] === cPlayer) {
        if (areas[1] === cPlayer && areas[7] === cPlayer) {
            winBoxIds = [4, 1, 7];
            return true;
        }
        if (areas[2] === cPlayer && areas[6] === cPlayer) {
            winBoxIds = [4, 2, 6];
            return true;
        }
        if (areas[3] === cPlayer && areas[5] === cPlayer) {
            winBoxIds = [4, 3, 5];
            return true;
        }
    }
    if (areas[8] === cPlayer) {
        if (areas[7] === cPlayer && areas[6] === cPlayer) {
            winBoxIds = [8, 7, 6];
            return true;
        }
        if (areas[5] === cPlayer && areas[2] === cPlayer) {
            winBoxIds = [8, 5, 2];
            return true;
        }
    }
    return false;
}

function changeWinBoxesBg() {
    winBoxIds.forEach(id => {
        boxes[id].style.backgroundColor = 'gold';
        boxes[id].style.cursor = 'not-allowed';
    })
}

function Restart() {
    winBoxIds = [];
    areas.forEach((val, index) => {
        areas[index] = null;
    });
    boxes.forEach(box => {
        box.innerHTML = '';
        box.style.background = '';
        box.style.cursor = 'pointer';
    });
    headerText.innerHTML = "Let's Play!";
    headerText.style.background = "";
    currentPlayer = o_text;
}