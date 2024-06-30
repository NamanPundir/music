let now_play = document.querySelector(".now-play");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let prev_track = document.querySelector(".prev-track");
let for_track = document.querySelector(".for-track");
let playpause_btn = document.querySelector(".playpause-track");

let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

//Create new audio element
let current_track = document.createElement('audio');

//define the track that have to be played
let track_list = [
    {
        name: "kisi ki muskurahaton",
        artist: "Mukesh",
        image: "songs/goodtime icon.jpg",
        path: "songs/smile.mp3"
    },
    {
        name: "Naadaniyaan",
        artist: "Akshath",
        image: "songs/Nadaniyan.jpeg",
        path: "songs/naadaniyan.mp3"
    },
    {
        name: "Counting",
        artist: "Meme-yoen",
        image: "songs/counting.jpeg",
        path: "songs/japanese.mp3"
    },
];

function random_bg_color() {
    // lighter color
    let red = Math.floor(Math.random()* 256) + 64 ;
    let blue = Math.floor(Math.random()* 256) + 64 ;
    let green = Math.floor(Math.random()* 256) + 64 ;

let bgcolor = "rgb(" +red+ "," +blue+ "," +green+ ")";

document.body.style.background = bgcolor;
}

function loadtrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    current_track.src = track_list[track_index].path;
    current_track.load();

    track_art.style.background = "url(" +track_list[track_index].image+ ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_play.textContent = "PLAYING" +(track_index+1)+ "OF"+ track_list.length;

    updateTimer = setInterval(seekUpdate,1000);
    current_time.addEventListener("ended", forTrack);
    random_bg_color();
}

function resetValues() {
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

//load the first track in the tracklist
loadtrack(track_index);

function playTrack() {
    current_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    current_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';    
}

function playpauseTrack() {
    if(!isPlaying) playTrack();
    else pauseTrack();
}

function forTrack() {
    if(track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadtrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
       track_index -= 1; 
    }
    else track_index = track_list.length;
    loadtrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = current_track.duration * (seek_slider.value / 100);
    current_track.currentTime = seekto;
}

function setVolume() {
    current_track.volume = (volume_slider.value / 100);
}

function seekUpdate() {
    let seekPosition = 0 ;

    if(!isNaN(current_track.duration)){
        seekPosition = current_track.currentTime * (100 / current_track.duration);

        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(current_track.currentTime  / 60);
        let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
        let durationMinutes= Math.floor(current_track.duration / 60);
        let durationSeconds= Math.floor(current_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
        current_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes +":"+ durationSeconds;
    }
}
