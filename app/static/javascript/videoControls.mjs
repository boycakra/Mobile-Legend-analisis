export function initializeVideoControls() {
    const video = document.querySelector("#video-container video");
    const timerDisplay = document.getElementById("timer-display");
    const skipBackwardButton = document.getElementById("skip-backward");
    const skipForwardButton = document.getElementById("skip-forward");

    function updateTimer() {
        const minutes = Math.floor(video.currentTime / 60);
        const seconds = Math.floor(video.currentTime % 60);
        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;
        timerDisplay.textContent = formattedTime;
    }

    video.addEventListener("timeupdate", updateTimer);

    skipBackwardButton.addEventListener("click", () => skipTime(-10));
    skipForwardButton.addEventListener("click", () => skipTime(10));

    function skipTime(seconds) {
        video.currentTime += seconds;
        updateTimer();
    }
}
