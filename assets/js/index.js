let count = 0;
let audio = new Audio();
let titles = document.querySelectorAll("#title-song");
let authors = document.querySelectorAll("#author");
let navbarLeft = document.getElementById("navbar-left");
let navbarRight = document.getElementById("navbar-right");

async function chargeApi() {
  let linkArtist = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=Nicola%20Lerra`);
  let responseText = await linkArtist.json();
  let musicArray = responseText.data;

  const albumOne = musicArray.slice(0, 5);
  const albumTwo = musicArray.slice(11, 14);
  const albumThree = musicArray[21];
  const albumFour = musicArray.slice(22, 23);

  let albumTot = albumOne.concat(albumTwo, albumThree, albumFour);

  console.log(albumTot);

  for (i = 0; i < albumTot.length; i++) {
    let container = document.querySelector("#card-container");
    container.innerHTML += `<div class="card col-12">
   <a href=./album.html?id=${albumTot[i].album.id}><img id="play" src="${albumTot[i].album.cover_xl}" class="card-img-top" alt="...">
  <div class="card-body">
    <a href=./album.html?id=${albumTot[i].album.id}><h5 class="card-title">${albumTot[i].album.title}</h5></a>
    <a href=./artist.html?id=${albumTot[i].artist.id}><p class="card-text">${albumTot[i].artist.name}</p></a>
   </div>
  </div>`;
  }

  return;
}

// START PlAYER

let timer = 0;
let seconds = 0;
let minutes = 0;
let timer2 = 100;
let play = document.getElementById("play");
let pause = document.getElementById("pause");

let isPlay = false;

let trackSeconds = document.getElementById("track-seconds");
let trackDefault = document.getElementsByClassName("track-default")[0];

play.addEventListener("click", () => {
  isPlay = true;
  play.style.display = "none";
  pause.style.display = "inline";
  pauseTrackBarSeconds();
  pauseSeconds();
});

pause.addEventListener("click", () => {
  isPlay = false;
  play.style.display = "inline";
  pause.style.display = "none";
  intervalTrackBarSeconds;
  intervalSeconds;
});

function startTrackBarSeconds() {
  if (isPlay) {
    trackSeconds.style.width = `${timer}%`;
    trackDefault.style.width = `${timer2}%`;
    if (timer === 100) {
      pauseTrackBarSeconds();
    }
    timer++;
    timer2--;
  }
}
const intervalTrackBarSeconds = setInterval(startTrackBarSeconds, 1000);

function pauseTrackBarSeconds() {
  clearInterval(startTrackBarSeconds);
}

function startSeconds() {
  let currentSeconds = document.getElementById("current-seconds");
  currentSeconds.innerHTML = `${minutes}.${seconds}`;
  if (isPlay) {
    if (seconds === 59) {
      seconds = 0;
      minutes++;
    }
    if (minutes == 2) {
      pauseTrackBarSeconds();
    }
    seconds++;
  }
}

const intervalSeconds = setInterval(startSeconds, 1000);

function pauseSeconds() {
  clearInterval(startSeconds);
}
// END PLAYER

// START VOLUME
let oldXPos = 0;
let isDragging = false;

let volumeSet = document.getElementById("volume-set");
let volume = document.getElementsByClassName("volume")[0];
let mouseIsDown = false;

volume.addEventListener("mousedown", () => {
  mouseIsDown = true;
});

volume.addEventListener("mouseup", () => {
  mouseIsDown = false;
});

const volumeRangeWidth = volume.getBoundingClientRect().width;
volumeSet.addEventListener("mousemove", function volumeSlide(event) {
  if (mouseIsDown) {
    let x = event.offsetX;
    if (event.target.className == "volume-set") {
      x = Math.floor(x);
      if (x < 0) x = 0;
      if (x > volumeRangeWidth) x = volumeRangeWidth;
      volumeSet.style.width = x + 5 + "px";
    }
  }
});

// END VOLUME
chargeApi();
