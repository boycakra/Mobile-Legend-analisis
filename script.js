document.addEventListener("DOMContentLoaded", function () {
    let marking = false;
    let currentPlayer = "";

    // Ambil ID dari image
    const imageDiv = document.querySelector("#image-container");
    // const imageDiv = document.getElementById("image");
    // const imageDiv2 = document.getElementById("image2");

    // Tampilkan hasil titik kordinat
    const coordinateDisplays = {
        Player: document.getElementById("coordinate-display"),
        // Player2: document.getElementById("coordinate-display_player2"),
    };

    // Tampilkan value
    const valueDisplays = {
        Player: document.getElementById("value-display"),
        // Player2: document.getElementById("value-display_player2"),
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
            console.info(rect);
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            console.table(x, y);

            const circle = document.createElement("div");
            circle.classList.add("mark-circle");
            circle.style.left = `${x - 10}px`;
            circle.style.top = `${y - 10}px`;
            imageDiv.parentElement.appendChild(circle);

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
    // document
    //     .getElementById("uppercutplayer2")
    //     .addEventListener("click", uppercutHandler("Player2"));
    // // Ambil lokasi table
    // const tableBody2 = document.getElementById("mark-table-body-2");
    // // kirim kordinat pada table
    // imageDiv2.addEventListener("click", function (event) {
    //     if (marking) {
    //         const rect = imageDiv.getBoundingClientRect();
    //         const x = event.clientX - rect.left;
    //         const y = event.clientY - rect.top;

    //         const circle = document.createElement("div");
    //         circle.classList.add("mark-circle");
    //         circle.style.left = `${x - 10}px`;
    //         circle.style.top = `${y - 10}px`;
    //         imageDiv.appendChild(circle);

    //         coordinateDisplays[
    //             currentPlayer
    //         ].innerHTML = `Coordinates: (${x.toFixed(2)}, ${y.toFixed(2)})`;

    //         if (currentPlayer === "Player2") {
    //             const newRow = tableBody2.insertRow();

    //             const Player2_cell1 = newRow.insertCell(0);
    //             const Player2_cell2 = newRow.insertCell(1);
    //             const Player2_cell3 = newRow.insertCell(2);

    //             Player2_cell1.innerHTML = `${x.toFixed(2)}, ${y.toFixed(2)}`;
    //             Player2_cell2.innerHTML = "Uppercut";
    //             Player2_cell3.innerHTML = currentPlayer;
    //             marking = false;
    //         }
    //     }
    // });
});
