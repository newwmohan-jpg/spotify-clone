async function Songs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
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
    return songs;
}

function extractWords(text) {
    return decodeURIComponent(text)
        .toLowerCase()
        .replace(/\.[a-z0-9]+$/i, "")
        .split(/[\s_\-\/]+/)
        .filter(Boolean);
}

function findBestSong(title, songUrls) {
    const titleWords = extractWords(title);
    let bestUrl = null;
    let bestScore = 0;

    for (const url of songUrls) {
        const filename = url.substring(url.lastIndexOf("/") + 1);
        const fileWords = new Set(extractWords(filename));
        const score = titleWords.filter(w => fileWords.has(w)).length;
        if (score > bestScore) {
            bestScore = score;
            bestUrl = url;
        }
    }
    return bestUrl;
}

let card = document.querySelectorAll(".song");
let playbtn = document.querySelector("#plays");
let currsong = new Audio();
let isplaying = false;
let allSongs = [];
let playBar = document.querySelector(".hiddenPlay")

async function init() {
    allSongs = await Songs();
}
init();

function pauseSong() {
    currsong.pause();
    isplaying = false;
    playbtn.src = "play.png";
}
function playSong() {
    currsong.play();
    isplaying = true;
    playbtn.src = "icons8-pause-50.png";
}

card.forEach(e => {
    e.addEventListener("click", () => {
        let title = e.querySelector(".title");
        let matchedUrl = findBestSong(title.innerHTML, allSongs);
        
        if (!matchedUrl) {
            console.warn("No matching song found for:", title.innerHTML);
            return;
        }

        if (currsong.src === matchedUrl && isplaying) {
            pauseSong();

        } else {
            playBar.style.display = "contents";
            currsong.src = matchedUrl;
            playSong();

        }

    });
});

plays.addEventListener("click", () => {
    if (isplaying) {
       pauseSong();

    }
    else {
        playSong();
    }
})

// next.addEventListener("click",()=>{
  
// currsong = 
    
// })
