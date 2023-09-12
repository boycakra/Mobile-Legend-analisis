document.addEventListener("DOMContentLoaded", function () {
    let marking = false;
    let currentPlayer = "";
    let markingCircleClass = "mark-circle"; // By default

    // Ambil ID dari image
    const imageDiv = document.querySelector("#image-container #image1");
    const imageDiv2 = document.querySelector("#image-container #image2");

    // Tampilkan hasil titik kordinat
    const coordinateDisplays = {
        Player: document.getElementById("coordinate-display"),
        Player2: document.getElementById("coordinate-display_player2"),
    };

    // Tampilkan value
    const valueDisplays = {
        Player: document.getElementById("value-display"),
        Player2: document.getElementById("value-display_player2"),
    };
    // Add the timer display element
    const timerDisplay = document.getElementById("timer-display");

    function printMousePos(event, element) {
        const circle = document.createElement("div");
    
        // Using clientX and clientY to get coordinates relative to viewport
        const x = event.clientX; 
        const y = event.clientY;
    
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.style.position = 'absolute';
        circle.style.zIndex = 20;
        circle.style.width = '20px';
        circle.style.height = '20px';
        circle.style.borderRadius = '50%';
    
        // Apply the appropriate class styles based on markingCircleClass
        if (markingCircleClass === 'mark-circle') {
            circle.style.background = 'red';
        } else if (markingCircleClass === 'jab-mark-circle') {
            circle.style.background = 'blue';
        } else if (markingCircleClass === 'mark-innercircle') {
            circle.style.background = 'radial-gradient(circle, red 40%, transparent 40%)';
            circle.style.border = '2px solid red';
        }
        else if (markingCircleClass === 'jabf-mark-innercircle') {
            circle.style.background = 'radial-gradient(circle, blue 40%, transparent 40%)';
            circle.style.border = '2px solid blue';
        }
    
        document.body.appendChild(circle);
    }
    

    function uppercutHandler(player) {
        return function () {
            marking = true;
            currentPlayer = player;
            markingCircleClass = 'mark-circle';
            valueDisplays[player].innerHTML = "Value: Uppercut";
        };
    }

    function jabfHandler(player) {
        return function () {
            marking = true;
            currentPlayer = player;
            markingCircleClass = 'jabf-mark-innercircle';
            valueDisplays[player].innerHTML = "Value: Jabf";
        };
    }

    function jabHandler(player) {
        return function () {
            marking = true;
            currentPlayer = player;
            markingCircleClass = 'jab-mark-circle';
            valueDisplays[player].innerHTML = "Value: Jab";
        };
    }

    function uppercutfHandler(player) {
        return function () {
            marking = true;
            currentPlayer = player;
            markingCircleClass = 'mark-innercircle';
            valueDisplays[player].innerHTML = "Value: UppercutF";
        };
    }
    function updateTimer(video) {
        const minutes = Math.floor(video.currentTime / 60);
        const seconds = Math.floor(video.currentTime % 60);
        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        timerDisplay.textContent = formattedTime;
    }

    // Button click listeners for Player 1
    document.getElementById('uppercut').addEventListener('click', uppercutHandler('Player'));
    document.getElementById('UppercutF').addEventListener('click', uppercutfHandler('Player'));
    document.getElementById('jab').addEventListener('click', jabHandler('Player'));
    document.getElementById('jabf').addEventListener('click', jabfHandler('Player'));

    // Button click listeners for Player 2
    document.getElementById('uppercutplayer2').addEventListener('click', uppercutHandler('Player2'));
    document.getElementById('UppercutFp2').addEventListener('click', uppercutfHandler('Player2'));
    document.getElementById('jabplayer2').addEventListener('click', jabHandler('Player2'));
    document.getElementById('jabfp2').addEventListener('click', jabfHandler('Player2'));

    // Ambil lokasi table
    const tableBody1 = document.getElementById("mark-table-body");
    const tableBody2 = document.getElementById("mark-table-body-2");

    // Event listener for image click (Player 1)
    imageDiv.addEventListener("click", function (event) {
        if (marking && (currentPlayer === "Player")) {
            const rect = imageDiv.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            printMousePos(event, imageDiv);

            coordinateDisplays[currentPlayer].innerHTML = `Coordinates: (${x.toFixed(2)}, ${y.toFixed(2)})`;
            marking = false;

            // Add data to table for Player
            const newRow = tableBody1.insertRow();
            const Player1_cell1 = newRow.insertCell(0);
            const Player1_cell2 = newRow.insertCell(1);
            const Player1_cell3 = newRow.insertCell(2);

            Player1_cell1.innerHTML = `${x.toFixed(2)}, ${y.toFixed(2)}`;
            Player1_cell2.innerHTML = valueDisplays[currentPlayer].innerText.split(": ")[1];
            Player1_cell3.innerHTML = currentPlayer;
        }
    });

    // Event listener for image click (Player 2)
    imageDiv2.addEventListener("click", function (event) {
        if (marking && (currentPlayer === "Player2")) {
            const rect = imageDiv2.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            printMousePos(event, imageDiv2);

            coordinateDisplays[currentPlayer].innerHTML = `Coordinates: (${x.toFixed(2)}, ${y.toFixed(2)})`;
            marking = false;

            // Add data to table for Player2
            const newRow = tableBody2.insertRow();
            const Player2_cell1 = newRow.insertCell(0);
            const Player2_cell2 = newRow.insertCell(1);
            const Player2_cell3 = newRow.insertCell(2);

            Player2_cell1.innerHTML = `${x.toFixed(2)}, ${y.toFixed(2)}`;
            Player2_cell2.innerHTML = valueDisplays[currentPlayer].innerText.split(": ")[1];
            Player2_cell3.innerHTML = currentPlayer;
        }
    });
    // Add a timeupdate event listener to the video
    const video = document.querySelector("#video-container video");
    video.addEventListener("timeupdate", function () {
        updateTimer(video);
    });
});
