import { initializeVideoControls } from "./videoControls.mjs";
import { initializeMarking } from "./marking.mjs";
import { exportToCSV } from "./csvExport.mjs";
import { initializeModal } from "./modal.mjs";
import { initializePasswordToggle } from "./passwordToggle.mjs";

document.addEventListener("DOMContentLoaded", () => {
    exportToCSV();
    initializeVideoControls();
    initializeMarking();
    initializeModal();
    initializePasswordToggle();
});
