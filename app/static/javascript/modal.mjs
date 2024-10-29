export function initializeModal() {
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const closeModalBtn2 = document.getElementById("closeModalBtn2");
    const modalBackground = document.getElementById("modalBackground");

    // Function to open modal
    openModalBtn.addEventListener("click", () => {
        modalBackground.classList.remove("hidden");
        modalBackground.classList.add("flex");
    });

    // Function to close modal
    closeModalBtn.addEventListener("click", () => {
        modalBackground.classList.add("hidden");
        modalBackground.classList.remove("flex");
    });

    closeModalBtn2.addEventListener("click", () => {
        modalBackground.classList.add("hidden");
        modalBackground.classList.remove("flex");
    });

    // Close modal when clicking on the background
    modalBackground.addEventListener("click", e => {
        if (e.target === modalBackground) {
            modalBackground.classList.add("hidden");
            modalBackground.classList.remove("flex");
        }
    });
}
