document.addEventListener('DOMContentLoaded', function() {
    let marking = false;
    let currentPlayer = "";

    const imageDiv = document.getElementById('image');
    const imageDiv2 = document.getElementById('image2')
    const coordinateDisplays = {
        Player: document.getElementById('coordinate-display'),
        Player2: document.getElementById('coordinate-display_player2')
    };
    const valueDisplays = {
        Player: document.getElementById('value-display'),
        Player2: document.getElementById('value-display_player2')
    };
    const tableBody = document.getElementById('mark-table-body');
    const tableBody2 = document.getElementById('mark-table-body2');

    function uppercutHandler(player) {
        return function() {
            marking = true;
            currentPlayer = player;
            valueDisplays[player].innerHTML = "Value: Uppercut";
        }
    }

    document.getElementById('uppercut').addEventListener('click', uppercutHandler('Player'));
    document.getElementById('uppercutplayer2').addEventListener('click', uppercutHandler('Player2'));

    imageDiv.addEventListener('click', function(event) {
        if (marking) {
            const rect = imageDiv.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const circle = document.createElement('div');
            circle.classList.add('mark-circle');
            circle.style.left = `${x - 10}px`;
            circle.style.top = `${y - 10}px`;
            imageDiv.appendChild(circle);

            coordinateDisplays[currentPlayer].innerHTML = `Coordinates: (${x.toFixed(2)}, ${y.toFixed(2)})`;
            if (currentPlayer === 'Player1') {
                const newRow = tableBody.insertRow();
                const Player1_cell1 = newRow.insertCell(0);
                const Player1_cell2 = newRow.insertCell(1);
                const Player1_cell3 = newRow.insertCell(2);

                Player1_cell1.innerHTML = `${x.toFixed(2)}, ${y.toFixed(2)}`;
                Player1_cell2.innerHTML = 'Uppercut';
                Player1_cell3.innerHTML = currentPlayer;

            }
        }
    });

    // Tambahkan event listener ke elemen gambar
    imageDiv2.addEventListener('click', function(event) {
        if (marking) {
            const rect = imageDiv.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const circle = document.createElement('div');
            circle.classList.add('mark-circle');
            circle.style.left = `${x - 10}px`;
            circle.style.top = `${y - 10}px`;
            imageDiv.appendChild(circle);

            coordinateDisplays[currentPlayer].innerHTML = `Coordinates: (${x.toFixed(2)}, ${y.toFixed(2)})`;
            if (currentPlayer === 'Player2') {
              const newRow = tableBody.insertRow();


              const Player2_cell1 = newRow.insertCell(0);
              const Player2_cell2 = newRow.insertCell(1);
              const Player2_cell3 = newRow.insertCell(2);

              Player2_cell1.innerHTML = `${x.toFixed(2)}, ${y.toFixed(2)}`;
              Player2_cell2.innerHTML = 'Uppercut';
              Player2_cell3.innerHTML = currentPlayer;
              marking = false;
            }
        }
    });
});

