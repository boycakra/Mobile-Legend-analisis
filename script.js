document.addEventListener("DOMContentLoaded", function () {
    let marking = false;
    let currentPlayer = "";

    // Ambil ID dari image
    const imageDiv = document.querySelector("#image-container #image1");
    const imageDiv2 = document.querySelector("#image-container #image2");
    // const imageDiv = document.getElementById("image1");
    // const imageDiv2 = document.getElementById("image2");

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

    // Penangkap reaksi tombol uppercut
    function uppercutHandler(player) {
        console.log("Masuk Uppercut Handler");
        return function () {
            marking = true;
            currentPlayer = player;
            valueDisplays[player].innerHTML = "Value: Uppercut";
        };
    }

    function printMousePos(e) {
        const event = window.event;
        const test = document.createElement("div");
        test.setAttribute(
            "style",
            `position:absolute; left:${event.pageX}px; top:${event.pageY}px; background-color:red; color:red; width:10px; height:10px; z-index:20; font-size:2em; border-radius: 50%;`
        );
        document.body.appendChild(test);
    }

    // Tambahkan event listener ke elemen gambar
    document
        .getElementById("uppercut")
        .addEventListener("click", uppercutHandler("Player"));
    // Ambil lokasi table
    const tableBody1 = document.getElementById("mark-table-body");
    // kirim kordinat pada table
    imageDiv.addEventListener("click", function (event) {
        if (marking) {
            const rect = imageDiv.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            printMousePos(imageDiv);

            coordinateDisplays[
                currentPlayer
            ].innerHTML = `Coordinates: (${x.toFixed(2)}, ${y.toFixed(2)})`;
            marking = false;

            if (currentPlayer === "Player") {
                const newRow = tableBody1.insertRow();
                const Player1_cell1 = newRow.insertCell(0);
                const Player1_cell2 = newRow.insertCell(1);
                const Player1_cell3 = newRow.insertCell(2);

                Player1_cell1.innerHTML = `${x.toFixed(2)}, ${y.toFixed(2)}`;
                Player1_cell2.innerHTML = "Uppercut";
                Player1_cell3.innerHTML = currentPlayer;
            }
        }
    });

    // // Tambahkan event listener ke elemen gambar
    document
        .getElementById("uppercutplayer2")
        .addEventListener("click", uppercutHandler("Player2"));
    // Ambil lokasi table
    const tableBody2 = document.getElementById("mark-table-body-2");
    // kirim kordinat pada table
    imageDiv2.addEventListener("click", function (event) {
        if (marking) {
            const rect = imageDiv.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            printMousePos(imageDiv);

            coordinateDisplays[
                currentPlayer
            ].innerHTML = `Coordinates: (${x.toFixed(2)}, ${y.toFixed(2)})`;

            if (currentPlayer === "Player2") {
                const newRow = tableBody2.insertRow();

                const Player2_cell1 = newRow.insertCell(0);
                const Player2_cell2 = newRow.insertCell(1);
                const Player2_cell3 = newRow.insertCell(2);

                Player2_cell1.innerHTML = `${x.toFixed(2)}, ${y.toFixed(2)}`;
                Player2_cell2.innerHTML = "Uppercut";
                Player2_cell3.innerHTML = currentPlayer;
                marking = false;
            }
        }
    });
});
