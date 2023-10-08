document.addEventListener("DOMContentLoaded", function () {
    let marking = false;
    let currentPlayer = "";
    let markingCircleClass = "mark-circle"; // By default
    let currentMove = "";
    let currentFormattedTime = ""; 

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
    function updateTimer(video) {
        const minutes = Math.floor(video.currentTime / 60);
        const seconds = Math.floor(video.currentTime % 60);
        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        timerDisplay.textContent = formattedTime;

        currentFormattedTime = formattedTime; // Add this line
    }
    // Add the timer display element
    const timerDisplay = document.getElementById("timer-display");

    function printMousePos(event, element, relativeX, relativeY) { 
        const circle = document.createElement("div");
        
        const imgWidth = element.offsetWidth;
        const imgHeight = element.offsetHeight;
        
        // Calculate the percentage values based on relative coordinates
        const percentageX = (relativeX / imgWidth) * 100;
        const percentageY = (relativeY / imgHeight) * 100;
    
        circle.style.left = `${event.clientX + window.scrollX - 10}px`;
        circle.style.top = `${event.clientY + window.scrollY - 10}px`;
        circle.style.position = "absolute";
        circle.style.zIndex = 20;
        circle.style.width = "20px";
        circle.style.height = "20px";
        circle.style.borderRadius = "50%";
    
        // Add the appropriate class to the circle element based on markingCircleClass
        circle.classList.add(markingCircleClass);
    
        document.body.appendChild(circle);
        
        return `(${percentageX.toFixed(2)}%, ${percentageY.toFixed(2)}%)`;
    }
    

    function boxingMoveHandler(player, move) {
        return function () {
            marking = true;
            currentPlayer = player;
            currentMove = move;
            // Set the initial markingCircleClass and valueDisplays based on the currentMove
            if (currentMove === "leaduppercut") {
                markingCircleClass = "lead-uppercut-mark-circle";
                valueDisplays[currentPlayer].innerHTML = "Value: leaduppercut";
            } else if (currentMove === "rearuppercut") {
                markingCircleClass = "rear-uppercut-mark-circle";
                valueDisplays[currentPlayer].innerHTML = "Value: rearuppercut";
            }
            else if (currentMove === "cross") {
                markingCircleClass = "croos-mark-innercircle";
                valueDisplays[currentPlayer].innerHTML = "Value: cross";
            }
            else if (currentMove === "rearhook") {
                markingCircleClass = "rearhook-mark-innercircle";
                valueDisplays[currentPlayer].innerHTML = "Value: rearhook";
            }
            else if (currentMove === "leadhook") {
                markingCircleClass = "leadhook-mark-innercircle";
                valueDisplays[currentPlayer].innerHTML = "Value: leadhook";
            }
            else if (currentMove === "jab") {
                markingCircleClass = "jab-mark-circle";
                valueDisplays[currentPlayer].innerHTML = "Value: jab";
            }
        };
    }

    // Button click listeners for Player 1
    document.getElementById("leaduppercut").addEventListener("click", boxingMoveHandler("Player", "leaduppercut"));
    document.getElementById("cross").addEventListener("click", boxingMoveHandler("Player", "cross"));
    document.getElementById("jab").addEventListener("click", boxingMoveHandler("Player", "jab"));
    document.getElementById("leadhook").addEventListener("click", boxingMoveHandler("Player", "leadhook"));
    document.getElementById("rearuppercut").addEventListener("click", boxingMoveHandler("Player", "rearuppercut"));
    document.getElementById("rearhook").addEventListener("click", boxingMoveHandler("Player", "rearhook"));

    // Button click listeners for Player 2
    document.getElementById("leaduppercutplayer2").addEventListener("click", boxingMoveHandler("Player2", "leaduppercut"));
    document.getElementById("crossp2").addEventListener("click", boxingMoveHandler("Player2", "cross"));
    document.getElementById("jabplayer2").addEventListener("click", boxingMoveHandler("Player2", "jab"));
    document.getElementById("leadhookp2").addEventListener("click", boxingMoveHandler("Player2", "leadhook"));
    document.getElementById("rearuppercutp2").addEventListener("click", boxingMoveHandler("Player2", "rearuppercut"));
    document.getElementById("rearhookp2").addEventListener("click", boxingMoveHandler("Player2", "rearhook"));

    // Event listener for "miss" button
    document.getElementById("miss").addEventListener("click", function () {
        if (marking && currentPlayer && currentMove) {
            markingCircleClass = `${currentMove}-Fail-mark-circle`;
            valueDisplays[currentPlayer].innerHTML = `Value: miss ${currentMove}`;
        }
    });

    // Event listener for "block" button
    document.getElementById("block").addEventListener("click", function () {
        if (marking && currentPlayer && currentMove) {
            markingCircleClass = `${currentMove}-block-mark-circle`;
            valueDisplays[currentPlayer].innerHTML = `Value: block ${currentMove}`;
        }
    });

    // Ambil lokasi table
    const tableBody1 = document.getElementById("mark-table-body");
    const tableBody2 = document.getElementById("mark-table-body-2");

    // Event listener for image click (Player 1)
    imageDiv.addEventListener("click", function (event) {
        if (marking && currentPlayer === "Player") {
            const rect = imageDiv.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            const percentageText = printMousePos(event, imageDiv, x, y);

            coordinateDisplays[currentPlayer].innerHTML = `Coordinates: ${percentageText}`;

            marking = false;

            // Add data to table for Player
             // Record the current video time
            const newRow = tableBody1.insertRow();
            const Player1_cell1 = newRow.insertCell(0);
            const Player1_cell2 = newRow.insertCell(1);
            const Player1_cell3 = newRow.insertCell(2);
            const Player1_cell4 = newRow.insertCell(3);
            const currentTime =  currentFormattedTime;
              // Update the "Time" column in the table
            Player1_cell1.innerHTML = percentageText;
            Player1_cell2.innerHTML = valueDisplays[currentPlayer].innerText.split(": ")[1];
            Player1_cell3.innerHTML = currentPlayer;
            Player1_cell4.innerHTML = `${currentTime}`;
            
        }
    });

    // Event listener for image click (Player 2)
    imageDiv2.addEventListener("click", function (event) {
        if (marking && currentPlayer === "Player2") {
            const rect = imageDiv2.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const percentageText = printMousePos(event, imageDiv2, x, y);

            coordinateDisplays[currentPlayer].innerHTML = `Coordinates: ${percentageText}`;

            marking = false;

            // Add data to table for Player2
            const newRow = tableBody2.insertRow();
            const Player2_cell1 = newRow.insertCell(0);
            const Player2_cell2 = newRow.insertCell(1);
            const Player2_cell3 = newRow.insertCell(2);
            const Player2_cell4 = newRow.insertCell(3);
            const currentTime = currentFormattedTime;

            Player2_cell1.innerHTML = percentageText;
            Player2_cell2.innerHTML = valueDisplays[currentPlayer].innerText.split(": ")[1];
            Player2_cell3.innerHTML = currentPlayer;
            Player2_cell4.innerHTML = `${currentTime}`;
        }
    });
    // Add a timeupdate event listener to the video
    const video = document.querySelector("#video-container video");
    video.addEventListener("timeupdate", function () {
        updateTimer(video);
    });
});
