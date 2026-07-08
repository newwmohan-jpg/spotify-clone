
async function Songs() {
    let a = await fetch("songs/songs.json")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let As = div.getElementsByTagName("a");
    let songs = []
    for (let index = 0; index < As.length; index++) {
        const element = As[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }

    }
    return songs
}


let songName = "";
let currSong = new Audio();
let isplaying = false;
let playBar = document.querySelector(".hiddenPlay");
function play() {
    currSong.play();
    isplaying = true;
    playBar.style.display = "block";
    plays.src = "icons/icons8-pause-50.png";
    // sName.innerText = songName.slice(0,-4);
    // aName.innerText = 
}
function pause() {
    currSong.pause();
    isplaying = false;
    plays.src = "icons/play.png";
}
let indexes = 0;
let card = document.querySelectorAll(".poster");
let allSongs = [];


card.forEach((element, index) => {
    element.addEventListener("click", async () => {
        allSongs = await Songs();
        songName = element.dataset.song;

        let matchedSrc = allSongs.find(url => decodeURIComponent(url).endsWith(songName));


        if (!matchedSrc) {
            console.warn("No match found for:", songName);
            return;
        }

        if (indexes == index && isplaying) {
            pause();
        } else {
            currSong.src = matchedSrc;
            sName.innerText = songName.slice(0, -4);
            aName.innerText = element.querySelector(".credits").innerText;
            play();
        }
        indexes = index;
    });
});




plays.addEventListener("click", () => {
    if (isplaying) {
        pause();
    }
    else {
        play();
    }
})

next.addEventListener("click", async () => {
    let Allsong = await Songs();
    if (indexes < card.length - 1) {
        currSong.src = Allsong[indexes + 1];
        let songUrl = currSong.src;
        songName = (songUrl.replaceAll("%20", " ")).split('/').pop();

        sName.innerText = songName.slice(0, -4);
        card.forEach(element => {
            if (sName.innerText == element.querySelector(".title").innerText) {
                aName.innerText = element.querySelector(".credits").innerText;
            }

        });

        play();
        indexes++;
    }
    else {
        indexes = 0;
        currSong.src = Allsong[indexes];
        play();
    }
})

prev.addEventListener("click", async () => {
    let Allsong = await Songs();
    if (indexes > 0) {
        currSong.src = Allsong[indexes - 1];
          let songUrl = currSong.src;
        songName = (songUrl.replaceAll("%20", " ")).split('/').pop();

        sName.innerText = songName.slice(0, -4);
        card.forEach(element => {
            if (sName.innerText == element.querySelector(".title").innerText) {
                aName.innerText = element.querySelector(".credits").innerText;
            }

        });
        play();
        indexes--;
    }
    else {
        indexes = card.length - 1;
        currSong.src = Allsong[indexes];
        play();
    }
})

let currentTimeEl = document.getElementById("currentTime");
let totalDurationEl = document.getElementById("totalDuration");
let seekbar = document.getElementById("seekbar");

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

currSong.addEventListener("loadedmetadata", () => {
    totalDurationEl.innerText = formatTime(currSong.duration);
    seekbar.max = currSong.duration;
});

currSong.addEventListener("timeupdate", () => {
    currentTimeEl.innerText = formatTime(currSong.currentTime);
    seekbar.value = currSong.currentTime;
});

seekbar.addEventListener("input", () => {
    currSong.currentTime = seekbar.value;
});
const menuBtn = document.getElementById("menuBtn");
const box1 = document.querySelector(".box1");

menuBtn.addEventListener("click", () => {
    box1.classList.toggle("open");
});











