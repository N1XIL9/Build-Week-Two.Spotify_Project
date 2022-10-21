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
