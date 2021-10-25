const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressSpan = document.querySelector('.progress-span');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.querySelector('.play-btn');
const volumeBtn = document.querySelector('.volume-btn');
const volumeLine = document.querySelector('.volume-line');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen-btn');

playBtn.addEventListener('click', function(){
    if (video.paused) {
        video.play();
        playBtn.src = "/images/pause.png";
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        playBtn.src = "/images/play.png";
        playBtn.setAttribute('title', 'Play');
    }
})
video.addEventListener('ended', function(){
    playBtn.src = "/images/play.png";
    playBtn.setAttribute('title', 'Play');
});
volumeBtn.addEventListener('click', function(){
    if (video.volume) {
        endVolume = video.volume;
        video.volume = 0;
        volumeBtn.src = "/images/mute.png";
        volumeBtn.setAttribute('title', 'Unmute');
        volumeBar.style.width = 0;
    } else {
        video.volume = endVolume;
        volumeBtn.src = "/images/sound.png";
        volumeBtn.setAttribute('title', 'Mute');
        volumeBar.style.width = `${endVolume * 100}%`;

    }
});
let endVolume = 1;
volumeLine.addEventListener('click', function(e){
    
    let volume = e.offsetX / volumeLine.offsetWidth;
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    
    if (volume < 0.1) {
        volume = 0;
        volumeBtn.src = "/images/mute.png";
        volumeBtn.setAttribute('title', 'Unmute');

    }
    if (volume > 0.9) {
        volume = 1;
        volumeBtn.src = "/images/sound.png";
        volumeBtn.setAttribute('title', 'Mute');
    }
    endVolume = volume;
})
function openFullscreen(e) {
    if (e.requestFullscreen) {
        e.requestFullscreen();
    } else if (e.webkitRequestFullscreen) {
        e.webkitRequestFullscreen();
    } else if (e.msRequestFullscreen) {
        
        elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}


fullscreenBtn.addEventListener('click', toggleFullscreen);

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}

let fullscreen = false;

function toggleFullscreen() {
    !fullscreen ? openFullscreen(player) : closeFullscreen();
    fullscreen = !fullscreen;
}

video.addEventListener('timeupdate', spanUpdate);
video.addEventListener('canplay', spanUpdate);

function showTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}: ${seconds}`;
}

function spanUpdate() {
    //console.log('currentTime', video.currentTime, 'duration', video.duration);
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${showTime(video.currentTime)} /`;
    duration.textContent = `${showTime(video.duration)}`;

}

progressSpan.addEventListener('click', function(e){
    const newTime = e.offsetX / progressSpan.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
});
speed.addEventListener('change', function(){
    video.playbackRate = speed.value;
});
