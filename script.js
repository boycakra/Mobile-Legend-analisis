document.addEventListener('DOMContentLoaded', function() {
    let marking = false;
    let currentPlayer = "";

    const imageDiv = document.getElementById('image');
    const coordinateDisplays = {
        Player: document.getElementById('coordinate-display'),
        Player2: document.getElementById('coordinate-display_player2')
    };
    const valueDisplays = {
        Player: document.getElementById('value-display'),
        Player2: document.getElementById('value-display_player2')
    };
    const tableBody = document.getElementById('mark-table-body');

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

            coordinateDisplays[currentPlayer].innerHTML = `Coordinates: (${x}, ${y})`;

            const newRow = tableBody.insertRow();
            newRow.insertCell(0).innerHTML = `${x.toFixed(2)}, ${y.toFixed(2)}`;
            newRow.insertCell(1).innerHTML = 'Uppercut';
            newRow.insertCell(2).innerHTML = currentPlayer;

            marking = false;
        }
    });
});
