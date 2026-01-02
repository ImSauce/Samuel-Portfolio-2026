const featuredVideo = document.getElementById("featuredVideo");
const videoContainer = document.querySelector(".carousel-slide.featured");

// ====================
// VOLUME CONTROL
// ====================
const volumeControl = document.createElement("div");
volumeControl.classList.add("video-volume-control");
volumeControl.innerHTML = `
    <i class="bi bi-volume-up" id="volumeIcon"></i>
    <input type="range" min="0" max="1" step="0.01" value="1" id="videoVolume">
`;
videoContainer.appendChild(volumeControl);

const slider = volumeControl.querySelector("#videoVolume");
const volumeIcon = volumeControl.querySelector("#volumeIcon");

// initial volume
featuredVideo.volume = parseFloat(slider.value);

// update slider highlight
function updateSliderHighlight(val) {
    slider.style.setProperty("--volume-percentage", val * 100 + "%");
}
updateSliderHighlight(featuredVideo.volume);

// update volume & icon
slider.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    featuredVideo.volume = val;
    updateSliderHighlight(val);

    if (val === 0) volumeIcon.className = "bi bi-volume-mute";
    else if (val < 0.5) volumeIcon.className = "bi bi-volume-down";
    else volumeIcon.className = "bi bi-volume-up";
});

// auto-hide volume control
let volumeHideTimeout;
function showVolumeControl() {
    volumeControl.classList.add("visible");
    clearTimeout(volumeHideTimeout);
    volumeHideTimeout = setTimeout(() => {
        volumeControl.classList.remove("visible");
    }, 1000);
}
videoContainer.addEventListener("mousemove", showVolumeControl);
videoContainer.addEventListener("touchstart", showVolumeControl);
showVolumeControl();

// ====================
// PLAY/PAUSE BUTTON
// ====================
const playPauseBtn = document.createElement("div");
playPauseBtn.classList.add("play-pause-btn");
videoContainer.appendChild(playPauseBtn);

// update icon based on video state
function updatePlayPauseIcon() {
    if (featuredVideo.paused) playPauseBtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
    else playPauseBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`;
}

// initialize icon correctly
updatePlayPauseIcon();

// toggle play/pause
playPauseBtn.addEventListener("click", () => {
    if (featuredVideo.paused) featuredVideo.play();
    else featuredVideo.pause();
    updatePlayPauseIcon();
});

// sync icon on play/pause events
featuredVideo.addEventListener("play", updatePlayPauseIcon);
featuredVideo.addEventListener("pause", updatePlayPauseIcon);

// auto-hide play button
let playHideTimeout;
function showPlayBtn() {
    playPauseBtn.classList.add("visible");
    clearTimeout(playHideTimeout);
    playHideTimeout = setTimeout(() => {
        playPauseBtn.classList.remove("visible");
    }, 1000);
}
videoContainer.addEventListener("mousemove", showPlayBtn);
videoContainer.addEventListener("touchstart", showPlayBtn);
showPlayBtn();

// ====================
// LOADING SPINNER
// ====================
const spinner = document.createElement("div");
spinner.classList.add("video-spinner");
spinner.innerHTML = `<i class="bi bi-arrow-repeat spin-icon"></i>`; // green & spinning
videoContainer.appendChild(spinner);
spinner.style.display = "block";

// hide spinner when video is ready or playing
function hideSpinner() {
    spinner.style.display = "none";
}
featuredVideo.addEventListener("loadeddata", hideSpinner);
featuredVideo.addEventListener("canplay", hideSpinner);
featuredVideo.addEventListener("playing", hideSpinner);

// error fallback
featuredVideo.addEventListener("error", () => {
    spinner.innerHTML = "⚠️ Failed to load video";
});



