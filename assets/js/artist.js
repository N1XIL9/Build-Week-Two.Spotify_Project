let count = 0;

let queryString = new URLSearchParams(window.location.search);
let id = queryString.get("id");

async function chargeApi() {
  let linkArtist = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`);
  let responseText = await linkArtist.json();

  let linkArtistDet = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${responseText.name}`);
  let responseTextD = await linkArtistDet.json();
  let musicArray = responseTextD.data;

  console.log(musicArray);

  const albumOne = musicArray.slice(0, 5);
  const albumTwo = musicArray.slice(7, 9);
  const albumThree = musicArray[14];
  const albumFour = musicArray.slice(17, 19);

  let albumTot = albumOne.concat(albumTwo, albumThree, albumFour);

  // console.log(albumTot);

  for (i = 0; i < albumTot.length; i++) {
    let container = document.querySelector("#contLCR");
    count++;
    // console.log(count);
    // console.log(container);
    container.innerHTML += ` <div class="leftTitle col-6">
                              <div id="numberTrack">${count}</div>
                              <div><a href=./album.html?id=${albumTot[i].album.id}> <img src="${albumTot[i].album.cover_xl}" id="card-img-top"/></a></div>
                              <div><a href=./album.html?id=${albumTot[i].album.id}> <h6 id="albumTitle">${albumTot[i].album.title}</h6></a></div>
                            </div>

                          <div class="centerViews col-3">
                            <h6 id="views">${albumTot[i].rank}</h6>
                          </div>

                          <div class="rightTime col-2">
                            <h6 id="timeMusic">${albumTot[i].duration}</h6>
                          </div>`;
  }

  let bg = document.getElementById("container-artist");
  bg.style.backgroundImage = `url('${responseText.picture_big}')`;
  console.log(bg);

  let titleArti = document.querySelector("#titleArt");
  titleArti.innerText = `${responseText.name}`;

  let bflat = new Audio();
  bflat.src = "../assets/sound/A way of life.mp3";
  function PlaySound() {
    bflat.play();
  }
  PlaySound();
}
chargeApi();

// * START TRACKBAR

let timer = 0;
let timer2 = 100;
let pause = document.getElementById("pause");
let play = document.getElementById("play");
let playAds = document.getElementById("play-ads");
let isPlay = false;
let seconds = 0;
let minutes = 0;
let trackSeconds = document.getElementById("track-seconds");
let trackDefault = document.getElementsByClassName("track-default")[0];

playAds.addEventListener("click", playFunction);
play.addEventListener("click", playFunctionNavbar);
pause.addEventListener("click", pauseFunction);

function playFunction() {
  if (isPlay) {
    pauseFunction();
    resetTrackBarSeconds();
  }

  navbarLeft.style.opacity = 1;
  navbarRight.style.opacity = 1;
  play.style.display = "none";
  pause.style.display = "inline";
  pauseTrackBarSeconds();
  pauseSeconds();
  selectSongPlay(previewImg);
  isPlay = true;
}

function playFunctionNavbar() {
  if (isPlay) {
    pauseFunction();
    resetTrackBarSeconds();
  }
  navbarLeft.style.opacity = 1;
  navbarRight.style.opacity = 1;
  play.style.display = "none";
  pause.style.display = "inline";
  pauseTrackBarSeconds();
  pauseSeconds();
  audio.play();
  isPlay = true;
}

function pauseFunction() {
  isPlay = false;
  play.style.display = "inline";
  pause.style.display = "none";
  audio.pause();
  intervalTrackBarSeconds;
  intervalSeconds;
}

function selectSongPlay(eventClick) {
  previewImg[previewImg.length - 1].src = buonasalvePlaylistFETCH[0].album.cover;
  titles[titles.length - 1].innerHTML = buonasalvePlaylistFETCH[0].title_short;
  authors[authors.length - 1].innerHTML = buonasalvePlaylistFETCH[0].artist.name;
  let linkMp3 = eventClick[0].parentElement.children[3].innerHTML;
  audio.src = linkMp3;
  audio.play();
}

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

function resetTrackBarSeconds() {
  trackSeconds.style.width = `0%`;
  trackDefault.style.width = `100%`;
  timer = 0;
  timer2 = 100;
  seconds = 0;
  minutes = 0;
}
const intervalTrackBarSeconds = setInterval(startTrackBarSeconds, 300);

function pauseTrackBarSeconds() {
  clearInterval(startTrackBarSeconds);
}

function startSeconds() {
  let currentSeconds = document.getElementById("current-seconds");
  currentSeconds.innerHTML = `${minutes}.${seconds}`;
  if (isPlay) {
    // if (seconds === 59) {
    //   seconds = 0;
    //   minutes++;
    // }
    // if (minutes == 2) {
    //   pauseTrackBarSeconds();
    // }

    if (seconds == 30) {
      pauseTrackBarSeconds();
      resetTrackBarSeconds();
      seconds = 0;
      isPlay = false;
    }
    seconds++;
  }
}

const intervalSeconds = setInterval(startSeconds, 1000);

function pauseSeconds() {
  clearInterval(startSeconds);
}
// ! END TRACK BAR

// * START VOLUME
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
      if (x < 10) {
        x = 10;
        audio.volume = 0.1;
      }
      if (x > volumeRangeWidth) x = volumeRangeWidth;
      volumeSet.style.width = x + 5 + "px";
      audio.volume = `${0}.${x}`;
    }
  }
});

let volumeOnOff = document.getElementById("volume-icon");
let audioOn = false;
volumeOnOff.addEventListener("click", () => {
  if (audioOn) {
    audio.volume = 1;
    volumeOnOff.classList.toggle("fa-volume-up");
    volumeOnOff.classList.toggle("fa-volume-off");
    audioOn = false;
  } else {
    audio.volume = 0;
    volumeOnOff.classList.toggle("fa-volume-up");
    volumeOnOff.classList.toggle("fa-volume-off");
    audioOn = true;
  }
});

// ! END VOLUME
