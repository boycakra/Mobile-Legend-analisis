// Variable to store the current state of the game
let currentFormattedTime = "";
let markingCircleClass = "";
let currentPlayer = "";
let currentMove = "";
let marking = false;

const addedCircles = [];
const player1Marks = [];
const player2Marks = [];

const video = document.getElementById("video");
const skipForwardButton = document.getElementById("skip-forward");
const skipBackwardButton = document.getElementById("skip-backward");
const imageDiv = document.getElementById("image1");
const imageDiv2 = document.getElementById("image2");

const valueDisplays = {
  Player: document.getElementById("value-display"),
  Player2: document.getElementById("value-display_player2"),
};

/**
 * Function to format the time in seconds to a string
 * 1. @access element table by team @params {Undo, Mid, Gold, Exp, Roamer, Jungle, Inisiasi}
 * 2. @access element image by team @params {image1, image2}
 * 3. @callback element value display by team @params {Mark Coordinate,	Value, Player, Team, Time}
 **/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Team Handler
  document
    .getElementById("Mid-lane")
    .addEventListener("click", boxingMoveHandler("Player", "Mid-lane"));
  document
    .getElementById("Exp-lane")
    .addEventListener("click", boxingMoveHandler("Player", "Exp-lane"));
  document
    .getElementById("Inisiasi")
    .addEventListener("click", boxingMoveHandler("Player", "Inisiasi"));
  document
    .getElementById("Roamer-lane")
    .addEventListener("click", boxingMoveHandler("Player", "Roamer-lane"));
  document
    .getElementById("gold-lane")
    .addEventListener("click", boxingMoveHandler("Player", "gold-lane"));
  document
    .getElementById("Jungler-line")
    .addEventListener("click", boxingMoveHandler("Player", "Jungler-line"));
  document
    .getElementById("Mid-laneplayer2")
    .addEventListener("click", boxingMoveHandler("Player2", "Mid-lane"));
  document
    .getElementById("Exp-lanep2")
    .addEventListener("click", boxingMoveHandler("Player2", "Exp-lane"));
  document
    .getElementById("Inisiasiplayer2")
    .addEventListener("click", boxingMoveHandler("Player2", "Inisiasi"));
  document
    .getElementById("Roamer-lanep2")
    .addEventListener("click", boxingMoveHandler("Player2", "Roamer-lane"));
  document
    .getElementById("gold-lanep2")
    .addEventListener("click", boxingMoveHandler("Player2", "gold-lane"));
  document
    .getElementById("Jungler-linep2")
    .addEventListener("click", boxingMoveHandler("Player2", "Jungler-line"));

  // 2. Event Handler
  document.getElementById("Kill").addEventListener("click", () => {
    if (marking && currentPlayer && currentMove) {
      markingCircleClass = `${currentMove}-Fail-mark-circle`;
      valueDisplays[currentPlayer].innerHTML = `Value: Kill ${currentMove}`;
    }
  });

  document.getElementById("assisted").addEventListener("click", () => {
    if (marking && currentPlayer && currentMove) {
      markingCircleClass = `${currentMove}-assisted-mark-circle`;
      valueDisplays[currentPlayer].innerHTML = `Value: assisted ${currentMove}`;
    }
  });

  document.getElementById("Death").addEventListener("click", () => {
    if (marking && currentPlayer && currentMove) {
      markingCircleClass = `${currentMove}-Death-mark-circle`;
      valueDisplays[currentPlayer].innerHTML = `Value: Death ${currentMove}`;
      const time = timerDisplay.textContent;
      addDataToTable(time, currentPlayer, currentMove);
    }
  });

  document.getElementById("Buff Merah").addEventListener("click", () => {
    if (marking && currentPlayer && currentMove) {
      markingCircleClass = `${currentMove}Buff-Merah-mark-circle`;
      valueDisplays[currentPlayer].innerHTML = `Value: Inner Tower Destroy ${currentMove}`;
      const time = timerDisplay.textContent;
      addDataToTable(time, currentPlayer, currentMove);
    }
  });

  document.getElementById("Buff biru").addEventListener("click", () => {
    if (marking && currentPlayer && currentMove) {
      markingCircleClass = `${currentMove}Buff-biru-mark-circle`;
      valueDisplays[currentPlayer].innerHTML = `Value: Base Tower Destroy ${currentMove}`;
      const time = timerDisplay.textContent;
      addDataToTable(time, currentPlayer, currentMove);
    }
  });

  document.getElementById("Lord").addEventListener("click", () => {
    if (marking && currentPlayer && currentMove) {
      markingCircleClass = `${currentMove}Buff-lord-mark-square`;
      valueDisplays[currentPlayer].innerHTML = `Value: Lord ${currentMove}`;
      const time = timerDisplay.textContent;
      addDataToTable(time, currentPlayer, currentMove);
    }
  });

  document.getElementById("Turtle").addEventListener("click", () => {
    if (marking && currentPlayer && currentMove) {
      const moveClassMap = {
        "Mid-lane": "mid-lane-turtle-mark-circle",
        "gold-lane": "gold-lane-turtle-mark-circle",
        "Exp-lane": "exp-lane-turtle-mark-circle",
        "Roamer-lane": "roamer-lane-turtle-mark-circle",
        "Jungler-line": "jungle-lane-turtle-mark-circle",
      };

      markingCircleClass = moveClassMap[currentMove] || "";
      valueDisplays[currentPlayer].innerHTML = `Value: turtle ${currentMove}`;
      const time = timerDisplay.textContent;
      addDataToTable(time, currentPlayer, currentMove);
    }
  });

  document.getElementById("undo-player1").addEventListener("click", () => {
    console.log("Undo Player 1 clicked");
    undoMark(player1Marks, tableBody1);
  });

  document.getElementById("undo-player2").addEventListener("click", () => {
    console.log("Undo Player 2 clicked");
    undoMark(player2Marks, tableBody2);
  });

  // 3. Another handler
  const tableBody1 = document.getElementById("mark-table-body");
  const tableBody2 = document.getElementById("mark-table-body-2");

  imageDiv.addEventListener("click", event => {
    if (marking && currentPlayer === "Player") {
      const rect = imageDiv.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const percentageText = printMousePos(event, imageDiv, x, y);

      player1Marks.push({
        coordinates: percentageText,
        value: valueDisplays[currentPlayer].innerText.split(": ")[1],
        player: currentPlayer,
        team: "Blue",
        time: "00:00",
      });

      renderMarks(player1Marks, tableBody1);
      renderCombinedMarks();
    }
  });

  imageDiv2.addEventListener("click", event => {
    if (marking && currentPlayer === "Player2") {
      const rect = imageDiv2.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const percentageText = printMousePos(event, imageDiv2, x, y);

      player2Marks.push({
        coordinates: percentageText,
        value: valueDisplays[currentPlayer].innerText.split(": ")[1],
        player: currentPlayer,
        team: "Red",
        time: "00:00",
      });

      renderMarks(player2Marks, tableBody2);
      renderCombinedMarks();
    }
  });
});

function boxingMoveHandler(player, move) {
  return function () {
    marking = true;
    currentPlayer = player;
    currentMove = move;
    if (currentMove === "Mid-lane") {
      markingCircleClass = "lead-uppercut-mark-circle";
      valueDisplays[currentPlayer].innerHTML = "Value: Mid-lane";
    } else if (currentMove === "gold-lane") {
      markingCircleClass = "rear-uppercut-mark-circle";
      valueDisplays[currentPlayer].innerHTML = "Value: gold-lane";
    } else if (currentMove === "Exp-lane") {
      markingCircleClass = "croos-mark-innercircle";
      valueDisplays[currentPlayer].innerHTML = "Value: Exp-lane";
    } else if (currentMove === "Jungler-line") {
      markingCircleClass = "Jungler-line-mark-innercircle";
      valueDisplays[currentPlayer].innerHTML = "Value: Jungler-line";
    } else if (currentMove === "Roamer-lane") {
      markingCircleClass = "Roamer-lane-mark-innercircle";
      valueDisplays[currentPlayer].innerHTML = "Value: Roamer-lane";
    } else if (currentMove === "Inisiasi") {
      markingCircleClass = "Inisiasi-mark-circle";
      valueDisplays[currentPlayer].innerHTML = "Value: Inisiasi";
    }
  };
}

// Print mark
function printMousePos(event, element, relativeX, relativeY) {
  const circle = document.createElement("div");
  const imgWidth = element.offsetWidth;
  const imgHeight = element.offsetHeight;
  const percentageX = (relativeX / imgWidth) * 100;
  const percentageY = (relativeY / imgHeight) * 100;

  circle.style.left = `${event.clientX + window.scrollX - 5}px`;
  circle.style.top = `${event.clientY + window.scrollY - 5}px`;
  circle.style.position = "absolute";
  circle.style.zIndex = 50;
  circle.style.width = "16px";
  circle.style.height = "16px";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = "#FF0000";
  circle.classList.add(markingCircleClass);

  document.body.appendChild(circle);
  addedCircles.push(circle);

  return `(${percentageX.toFixed(2)}%, ${percentageY.toFixed(2)}%)`;
}

// Function to combine and render marks from both players
function renderCombinedMarks() {
  const combinedMarks = [...player1Marks, ...player2Marks];
  combinedMarks.sort((a, b) => a.time.localeCompare(b.time));
  renderMarks(combinedMarks, document.getElementById("match-table-body"));
}

// Download data table
function tableToCSV(tableId) {
  const table = document.getElementById(tableId);
  const rows = Array.from(table.querySelectorAll("tr"));
  const headers = Array.from(rows[0].querySelectorAll("th")).map(header => header.textContent);
  const dataRows = rows
    .slice(1)
    .map(row => Array.from(row.querySelectorAll("td")).map(cell => cell.textContent));
  const csvContent = [headers, ...dataRows].map(row => row.join(",")).join("\n");
  return csvContent;
}

// Download result data
function downloadCSV(fileName, csvContent) {
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function updateTimer(video) {
  const minutes = Math.floor(video.currentTime / 60);
  const seconds = Math.floor(video.currentTime % 60);
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  timerDisplay.textContent = formattedTime;
  currentFormattedTime = formattedTime;
}

const timerDisplay = document.getElementById("timer-display");

// Modify renderMarks function to accept the target table body
function renderMarks(marks, tableBody) {
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  marks.forEach(mark => {
    const newRow = tableBody.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.innerHTML = mark.coordinates ?? "Coordinates here";
    cell2.innerHTML = mark.value ?? "Value here";
    cell3.innerHTML = mark.player && "Player here";
    cell4.innerHTML = mark.team ?? "Team here";
    cell5.innerHTML = mark.time ?? "Time here";
  });
}

function removeTableEntry(mark, tableBody) {
  const rowIndex = Array.from(tableBody.children).findIndex(row => {
    const cellCoordinates = row.cells[0].innerText;
    const cellTime = row.cells[3].innerText;
    return cellCoordinates === mark.coordinates && cellTime === mark.time;
  });

  if (rowIndex !== -1) {
    tableBody.deleteRow(rowIndex);
  }

}

video.addEventListener("timeupdate", function () {
  updateTimer(video);
});

skipBackwardButton.addEventListener("click", function () {
  skipTime(-10);
});

skipForwardButton.addEventListener("click", function () {
  skipTime(10);
});

function skipTime(seconds) {
  video.currentTime += seconds;
  updateTimer(video);
}

video.addEventListener("timeupdate", function () {
  updateTimer(video);
});

function undoMark(playerMarks, tableBody) {
  if (playerMarks.length > 0) {
    const lastMark = playerMarks.pop();
    removeTableEntry(lastMark, tableBody);
    if (addedCircles.length > 0) {
      const lastCircle = addedCircles.pop();
      lastCircle.parentNode.removeChild(lastCircle);
    }
    renderMarks(playerMarks, tableBody);
  }
}

// function removeLastCircle() {
//   if (addedCircles.length > 0) {
//     const lastCircle = addedCircles.pop();
//     lastCircle.parentNode.removeChild(lastCircle);
//   }
// }


document.getElementById("export-player1").addEventListener("click", function () {
  const csvContent = tableToCSV("player1-table");
  downloadCSV("player1.csv", csvContent);
});

document.getElementById("export-player2").addEventListener("click", function () {
  const csvContent = tableToCSV("player2-table");
  downloadCSV("player2.csv", csvContent);
});

// Function to handle various actions based on key
function handleShortcut(key) {
  switch (key) {
    case "z":
    case "Z":
      // "Z" key is pressed, perform Mid-lane action
      boxingMoveHandler("Player", "Mid-lane")();
      break;
    case "x":
    case "X":
      // "Z" key is pressed, perform Mid-lane action
      boxingMoveHandler("Player", "gold-lane")();
      break;
    case "c":
    case "C":
      // "Z" key is pressed, perform Mid-lane action
      boxingMoveHandler("Player", "Exp-lane")();
      break;
    case "v":
    case "V":
      // "Z" key is pressed, perform Mid-lane action
      boxingMoveHandler("Player", "Roamer-lane")();
      break;
    case "b":
    case "B":
      // "Z" key is pressed, perform Mid-lane action
      boxingMoveHandler("Player", "Jungler-line")();
      break;
    case "a":
    case "A":
      // "K" key is pressed, perform Kill action
      if (marking && currentPlayer && currentMove) {
        markingCircleClass = `${currentMove}-Fail-mark-circle`;
        valueDisplays[currentPlayer].innerHTML = `Value: Kill ${currentMove}`;
      }
      break;
    case "s":
    case "S":
      // "K" key is pressed, perform Kill action
      if (marking && currentPlayer && currentMove) {
        markingCircleClass = `${currentMove}-assisted-mark-circle`;
        valueDisplays[currentPlayer].innerHTML = `Value: assisted ${currentMove}`;
      }
      break;
    case "d":
    case "D":
      // "K" key is pressed, perform Kill action
      if (marking && currentPlayer && currentMove) {
        markingCircleClass = `${currentMove}-Death-mark-circle`;
        valueDisplays[currentPlayer].innerHTML = `Value: Death ${currentMove}`;
      }
      break;
    case "f":
    case "F":
      // "K" key is pressed, perform Kill action
      if (marking && currentPlayer && currentMove) {
        markingCircleClass = `${currentMove}-Buff-Merah-mark-circle`;
        valueDisplays[currentPlayer].innerHTML = `Value: Buff Merah ${currentMove}`;
      }
      break;
    case "g":
    case "G":
      // "K" key is pressed, perform Kill action
      if (marking && currentPlayer && currentMove) {
        markingCircleClass = `${currentMove}Buff-Merah-mark-circle`;
        valueDisplays[currentPlayer].innerHTML = `Value: Buff Merah ${currentMove}`;
      }
      break;
    case "h":
    case "H":
      // "K" key is pressed, perform Kill action
      if (marking && currentPlayer && currentMove) {
        markingCircleClass = `${currentMove}Buff-biru-mark-circle`;
        valueDisplays[currentPlayer].innerHTML = `Value: Buff-biru ${currentMove}`;
      }
      break;
    case "j":
    case "J":
      // "K" key is pressed, perform Kill action
      if (marking && currentPlayer && currentMove) {
        markingCircleClass = `${currentMove}Buff-lord-mark-square`;
        valueDisplays[currentPlayer].innerHTML = `Value: Lord ${currentMove}`;
      }
      break;

    case "k":
    case "K":
      // "M" key is pressed, perform Turtle action
      if (marking && currentPlayer && currentMove) {
        const moveClassMap = {
          "Mid-lane": "mid-lane-turtle-mark-circle",
          "gold-lane": "gold-lane-turtle-mark-circle",
          "Exp-lane": "exp-lane-turtle-mark-circle",
          "Roamer-lane": "roamer-lane-turtle-mark-circle",
          "Jungler-line": "jungle-lane-turtle-mark-circle",
        };

        markingCircleClass = moveClassMap[currentMove] || "";
        valueDisplays[currentPlayer].innerHTML = `Value: Turtle ${currentMove}`;
        const time = timerDisplay.textContent;
        addDataToTable(time, currentPlayer, currentMove);
      }
      break;

    case "q":
    case "Q":
      // "Q" key is pressed, perform Mid-lane action for Player 2
      boxingMoveHandler("Player2", "Mid-lane")();
      break;
    case "w":
    case "W":
      // "W" key is pressed, perform gold-lane action for Player 2
      boxingMoveHandler("Player2", "gold-lane")();
      break;
    case "e":
    case "E":
      // "E" key is pressed, perform Exp-lane action for Player 2
      boxingMoveHandler("Player2", "Exp-lane")();
      break;
    case "r":
    case "R":
      // "R" key is pressed, perform Roamer-lane action for Player 2
      boxingMoveHandler("Player2", "Roamer-lane")();
      break;
    case "t":
    case "T":
      // "T" key is pressed, perform Jungler-line action for Player 2
      boxingMoveHandler("Player2", "Jungler-line")();
      break;
    // Add more cases for other shortcuts as needed
    // For example:
    // case "x":
    //     // "X" key is pressed, perform another action
    //     // ...
    //     break;
    default:
      // Do nothing for other keys
      break;
  }
}

// Event listener for keydown event
document.addEventListener("keydown", function (event) {
  const key = event.key;
  handleShortcut(key);
});

// Event listener for export button
document.getElementById("export-Match").addEventListener("click", function () {
  const csvContent = tableToCSV("match-table");
  downloadCSV("combined-marks.csv", csvContent);
});
