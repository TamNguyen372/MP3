const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");

const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");

const rangeBar = document.querySelector(".range");

const musicName = document.querySelector(".music-name");
const musicImage = document.querySelector(".music-thumb img");
const musicThumbnail = document.querySelector(".music-thumb");
const playRepeat = document.querySelector(".play-repeat");


let isRepeat = true;
let indexSong = 0;
let isPlaying = true;
let isStatus = false;

//const musics = ['rolypoly.mp3', 'telephone.mp3', 'thamvienngoai.mp3'];
const musics = [{
            id: 1,
            title: "Roly Poly",
            file: "rolypoly.mp3",
            image: "https://upload.wikimedia.org/wikipedia/vi/thumb/9/91/T-araRolyPolyRegular.png/220px-T-araRolyPolyRegular.png"
        },
        {
            id: 2,
            title: "Telephone",
            file: "telephone.mp3",
            image: "https://th.bing.com/th/id/OIP.GtESyF0Zfn9DywZjWvSCdgHaH5?w=180&h=192&c=7&r=0&o=5&pid=1.7"
        },
        {
            id: 3,
            title: "Tham vien ngoai",
            file: "thamvienngoai.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/04/14/c/3/3/b/1618371787716_640.jpg"
        }
    ]
    //

let repeatCount = 0;
playRepeat.addEventListener("click", function() {

    if (isRepeat) {

        isRepeat = false;
        playRepeat.removeAttribute("style");
    } else {

        isRepeat = true;
        playRepeat.style.color = "#ffb86c";
    }
    console.log("isRepeat", isRepeat);
});
nextBtn.addEventListener("click", function() {
    changeSong(1);
});
prevBtn.addEventListener("click", function() {
    changeSong(-1);
});
//

song.addEventListener("ended", handleEndedSong);

function handleEndedSong() {
    repeatCount++;
    if (isRepeat && repeatCount === 1) {
        //handle repeat song
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }


}

function changeSong(dir) {
    if (dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        //prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    //song.setAttribute("src", `./music/${musics[indexsong].file}`);
    playPause();
};

playBtn.addEventListener("click", playPause);
//
function playPause() {

    if (isPlaying) {
        musicThumbnail.classList.add("is-playing");

        song.play();
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
        playBtn.innerHTML = '<ion-icon name = "pause-circle"></ion-icon>';
    } else {
        musicThumbnail.classList.remove("is-playing");
        song.pause();
        isPlaying = true;
        playBtn.innerHTML = '<ion-icon name = "play"></ion-icon>';
        clearInterval(timer);
    }

}
//
function displayTimer() {

    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    console.log("rangeBar");
    remainingTime.textContent = formatTimer(currentTime);

    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}
//

function formatTimer(number) {

    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes:minutes}:${seconds < 10 ? '0' + seconds: seconds}`;
}

displayTimer();
let timer = setInterval(displayTimer, 500);

//
rangeBar.addEventListener("change", handleChangeBar);

function handleChangeBar() {
    song.currentTime = rangeBar.value;
}
//
function init(indexsong) {

    song.setAttribute("src", `./music/${musics[indexsong].file}`);
    musicImage.setAttribute("src", musics[indexsong].image);
    musicName.textContent = musics[indexsong].title;
}
displayTimer();
init(indexSong);