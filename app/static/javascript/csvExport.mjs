export function exportToCSV() {
    const csvData = [];
    const headerRow = ["Time", "Player", "Move", "Action"];
    csvData.push(headerRow);

    // Add data from player marks arrays
    player1Marks.forEach(mark => {
        const row = [currentFormattedTime, "Player", mark.move, mark.action];
        csvData.push(row);
    });
    player2Marks.forEach(mark => {
        const row = [currentFormattedTime, "Player2", mark.move, mark.action];
        csvData.push(row);
    });

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "marks.csv";
    link.click();
}
