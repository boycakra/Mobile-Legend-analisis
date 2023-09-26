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
        const x = event.clientX + window.scrollX - 10;
        const y = event.clientY + window.scrollY - 10;
    
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.style.position = 'absolute';
        circle.style.zIndex = 20;
        circle.style.width = '20px';
        circle.style.height = '20px';
        circle.style.borderRadius = '50%';
    
        // Add the appropriate class to the circle element based on markingCircleClass
        circle.classList.add(markingCircleClass);
    
        document.body.appendChild(circle);
    }
    

    function leaduppercutHandler(player) {
        return function () {
            marking = true;
            currentPlayer = player;
            markingCircleClass = 'mark-circle';
            valueDisplays[player].innerHTML = "Value: leaduppercut";
        };
    }

    function leadhookHandler(player) {
        return function () {
            marking = true;
            currentPlayer = player;
            markingCircleClass = 'leadhook-mark-innercircle';
            valueDisplays[player].innerHTML = "Value: leadhook";
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

    function crossHandler(player) {
        return function () {
            marking = true;
            currentPlayer = player;
            markingCircleClass = 'croos-mark-innercircle';
            valueDisplays[player].innerHTML = "Value: cross";
        };
    }
    function rearuppercutHandler(player) {
        return function () {
            marking = true;
            currentPlayer = player;
            markingCircleClass = 'rear-uppercut-mark-circle';
            valueDisplays[player].innerHTML = "Value: rearuppercut";
        };
    }
    
    function rearhookHandler(player) {
        return function () {
            marking = true;
            currentPlayer = player;
            markingCircleClass = 'rearhook-mark-innercircle';
            valueDisplays[player].innerHTML = "Value: rearhook";
        };
    }
    function updateTimer(video) {
        const minutes = Math.floor(video.currentTime / 60);
        const seconds = Math.floor(video.currentTime % 60);
        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        timerDisplay.textContent = formattedTime;
    }

    

    // Button click listeners for Player 1
    document.getElementById('leaduppercut').addEventListener('click', leaduppercutHandler('Player'));
    document.getElementById('cross').addEventListener('click', crossHandler('Player'));
    document.getElementById('jab').addEventListener('click', jabHandler('Player'));
    document.getElementById('leadhook').addEventListener('click', leadhookHandler('Player'));
    document.getElementById('rearuppercut').addEventListener('click', rearuppercutHandler('Player'));
    document.getElementById('rearhook').addEventListener('click', rearhookHandler('Player'));


    // Button click listeners for Player 2
    document.getElementById('leaduppercutplayer2').addEventListener('click', leaduppercutHandler('Player2'));
    document.getElementById('crossp2').addEventListener('click', crossHandler('Player2'));
    document.getElementById('jabplayer2').addEventListener('click', jabHandler('Player2'));
    document.getElementById('leadhookp2').addEventListener('click', leadhookHandler('Player2'));
    document.getElementById('rearuppercutp2').addEventListener('click', rearuppercutHandler('Player2'));
    document.getElementById('rearhookp2').addEventListener('click', rearhookHandler('Player2'));

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
