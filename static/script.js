document.addEventListener("DOMContentLoaded", function () {
    let marking = false;
    let currentPlayer = "";
    let currentMove = "";
    let currentFormattedTime = "";

    // ...

    // Initialize arrays to store marks for both players
    const player1Marks = [];
    const player2Marks = [];

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
    
        circle.style.left = `${event.clientX + window.scrollX - 5}px`;
        circle.style.top = `${event.clientY + window.scrollY - 5}px`;
        circle.style.position = "absolute";
        circle.style.zIndex = 10;
        circle.style.width = "8px";
        circle.style.height = "8px";
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
    
        // Function to convert a table to a CSV string
    function tableToCSV(tableId) {
        const table = document.getElementById(tableId);
        const rows = Array.from(table.querySelectorAll('tr'));

        // Extract table headers
        const headers = Array.from(rows[0].querySelectorAll('th')).map(header => header.textContent);

        // Extract table data rows
        const dataRows = rows.slice(1).map(row => {
            return Array.from(row.querySelectorAll('td')).map(cell => cell.textContent);
        });

        // Create CSV content
        const csvContent = [headers, ...dataRows].map(row => row.join(',')).join('\n');

        return csvContent;
    }

        // Function to download a CSV file
    function downloadCSV(fileName, csvContent) {
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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

        // Event listener for "knock" button
    document.getElementById("knock").addEventListener("click", function () {
        if (marking && currentPlayer && currentMove) {
            markingCircleClass = `${currentMove}-knock-mark-circle`;
            valueDisplays[currentPlayer].innerHTML = `Value: knock ${currentMove}`;
            const time = timerDisplay.textContent;
            addDataToTable(time, currentPlayer, currentMove);
        }
    });

    // Event listener for "knock_out" button
    document.getElementById("knock_out").addEventListener("click", function () {
        if (marking && currentPlayer && currentMove) {
            markingCircleClass = `${currentMove}-knock-out-mark-circle`;
            valueDisplays[currentPlayer].innerHTML = `Value: knock_out ${currentMove}`;
            const time = timerDisplay.textContent;
            addDataToTable(time, currentPlayer, currentMove);
        }
    });

        // Event listener for Player 1 export button
    document.getElementById('export-player1').addEventListener('click', function () {
        const csvContent = tableToCSV('player1-table');
        downloadCSV('player1.csv', csvContent);
    });

    // Event listener for Player 2 export button
    document.getElementById('export-player2').addEventListener('click', function () {
        const csvContent = tableToCSV('player2-table');
        downloadCSV('player2.csv', csvContent);
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

            // Store the mark data in the array
            player1Marks.push({
                coordinates: percentageText,
                value: valueDisplays[currentPlayer].innerText.split(": ")[1],
                player: currentPlayer,
                time: currentFormattedTime,
            });

            // Render all marks for Player1
            renderMarks(player1Marks, tableBody1);
        }
    });

    // Event listener for image click (Player 2)
    imageDiv2.addEventListener("click", function (event) {
        if (marking && currentPlayer === "Player2") {
            const rect = imageDiv2.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const percentageText = printMousePos(event, imageDiv2, x, y);

            // Store the mark data in the array
            player2Marks.push({
                coordinates: percentageText,
                value: valueDisplays[currentPlayer].innerText.split(": ")[1],
                player: currentPlayer,
                time: currentFormattedTime,
            });

            // Render all marks for Player2
            renderMarks(player2Marks, tableBody2);
        }
    });

    function renderMarks(marks, tableBody) {
        // Clear the table body before rendering
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }

        // Render all marks in the array
        marks.forEach((mark) => {
            const newRow = tableBody.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);

            cell1.innerHTML = mark.coordinates;
            cell2.innerHTML = mark.value;
            cell3.innerHTML = mark.player;
            cell4.innerHTML = mark.time;
        });
    }
    
    // Add a timeupdate event listener to the video
    const video = document.querySelector("#video-container video");
    video.addEventListener("timeupdate", function () {
        updateTimer(video);
    });
});
