document.addEventListener('DOMContentLoaded', function() {
    let marking = false;
    const imageDiv = document.getElementById('image');
    const coordinateDisplay = document.getElementById('coordinate-display');
    const valueDisplay = document.getElementById('value-display');
    const tableBody = document.getElementById('mark-table-body'); // Add this line

    document.getElementById('uppercut').addEventListener('click', function() {
        marking = true;
        valueDisplay.innerHTML = "Value: Uppercut"; // The value of the mark
    });

    imageDiv.addEventListener('click', function(event) {
        if (marking) {
            const rect = imageDiv.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const circle = document.createElement('div');
            circle.style.width = '20px'; 
            circle.style.height = '20px';
            circle.style.borderRadius = '50%';
            circle.style.background = 'red';
            circle.style.position = 'absolute';
            circle.style.left = x - 10 + 'px'; 
            circle.style.top = y - 10 + 'px';
            imageDiv.appendChild(circle);

            coordinateDisplay.innerHTML = `Coordinates: (${x}, ${y})`;
            marking = false;

            // Add the code to update the table
            const newRow = tableBody.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            cell1.innerHTML = x.toFixed(2) + ', ' + y.toFixed(2);
            cell2.innerHTML = 'Uppercut';
        }
    });
});

