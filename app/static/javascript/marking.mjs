const addedCircles = [];
const player1Marks = [];
const player2Marks = [];
let marking = false;
let currentPlayer = "";
let currentMove = "";
let currentFormattedTime = "";
let markingCircleClass = "";

export function initializeMarking() {
    const valueDisplays = {
        Player: document.getElementById("value-display"),
        Player2: document.getElementById("value-display_player2"),
    };
    const timerDisplay = document.getElementById("timer-display");

    // Add event listeners for moves
    addMoveListeners(valueDisplays);

    // Add event listeners for actions
    addActionListeners(valueDisplays, timerDisplay);

    // Add mouse click event listeners for marking
    addMouseClickListeners(valueDisplays);
}

function addMoveListeners(valueDisplays) {
    const moves = [
        "Mid-lane",
        "Exp-lane",
        "Inisiasi",
        "Roamer-lane",
        "gold-lane",
        "Jungler-line",
    ];
    moves.forEach(move => {
        document
            .getElementById(move)
            .addEventListener("click", boxingMoveHandler("Player", move));
        document
            .getElementById(move + "player2")
            .addEventListener("click", boxingMoveHandler("Player2", move));
    });
}

function boxingMoveHandler(player, move) {
    return function () {
        marking = true;
        currentPlayer = player;
        currentMove = move;
        // Update markingCircleClass and valueDisplays based on move
        // ...
    };
}

function addActionListeners(valueDisplays, timerDisplay) {
    document
        .getElementById("Kill")
        .addEventListener("click", () =>
            handleAction("Kill", valueDisplays, timerDisplay)
        );
    document
        .getElementById("assisted")
        .addEventListener("click", () =>
            handleAction("assisted", valueDisplays, timerDisplay)
        );
    document
        .getElementById("Death")
        .addEventListener("click", () =>
            handleAction("Death", valueDisplays, timerDisplay)
        );
    // Add other action listeners...
}

function handleAction(action, valueDisplays, timerDisplay) {
    if (marking && currentPlayer && currentMove) {
        markingCircleClass = `${currentMove}-${action}-mark-circle`;
        valueDisplays[
            currentPlayer
        ].innerHTML = `Value: ${action} ${currentMove}`;
        const time = timerDisplay.textContent;
        addDataToTable(time, currentPlayer, currentMove);
    }
}

function addMouseClickListeners(valueDisplays) {
    const imageDiv = document.querySelector("#image-container #image1");
    const imageDiv2 = document.querySelector("#image-container #image2");

    imageDiv.addEventListener("click", event =>
        markPosition(event, imageDiv, valueDisplays, "Player")
    );
    imageDiv2.addEventListener("click", event =>
        markPosition(event, imageDiv2, valueDisplays, "Player2")
    );
}

function markPosition(event, imageDiv, valueDisplays, player) {
    if (marking && currentPlayer === player) {
        const rect = imageDiv.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const circle = createCircle(x, y, markingCircleClass);
        imageDiv.appendChild(circle);
        addedCircles.push(circle);
        // Add data to player marks array
        if (player === "Player") {
            player1Marks.push({ x, y, move: currentMove, action: currentMove });
        } else {
            player2Marks.push({ x, y, move: currentMove, action: currentMove });
        }
    }
}

function createCircle(x, y, className) {
    const circle = document.createElement("div");
    circle.className = className;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    return circle;
}
