async function getSongs() {
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

let songs = getSongs();
console.log(songs);

