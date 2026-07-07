
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
    return songs
}



let currSong = new Audio();
let isplaying = false;
let playBar = document.querySelector(".hiddenPlay");
function play() {
    currSong.play();
    isplaying = true;
    playBar.style.display = "contents";
    plays.src = "icons8-pause-50.png";
}
function pause() {
    currSong.pause();
    isplaying = false;
    plays.src = "play.png";
}
let indexes = 0;
let card = document.querySelectorAll(".poster");
card.forEach((element, index) => {
    element.addEventListener("click", async () => {
        let Allsong = await Songs()

        if (isplaying) {
            pause();
        }
        else {
            currSong.src = Allsong[index];
            play();
        }
        indexes = index;

    })
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
    if (indexes < card.length()) {
        currSong.src = Allsong[indexes + 1];
        play();
        indexes++;
    }
    else {
        indexes = 0;
        currSong.src = Allsong[indexes];
        play();
    }
})












