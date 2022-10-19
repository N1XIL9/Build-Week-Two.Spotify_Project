let count = 0;

let queryString = new URLSearchParams(window.location.search);

async function chargeApi() {
  let linkArtist = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=Nicola%20Lerra`);
  let responseText = await linkArtist.json();
  let musicArray = responseText.data;

  const albumOne = musicArray.slice(0, 5);
  const albumTwo = musicArray.slice(7, 9);
  const albumThree = musicArray[14];
  const albumFour = musicArray.slice(17, 19);

  let albumTot = albumOne.concat(albumTwo, albumThree, albumFour);

  console.log(albumTot);

  for (i = 0; i < albumTot.length; i++) {
    let container = document.querySelector("#contLCR");
    count++;
    // console.log(count);
    // console.log(container);
    container.innerHTML += ` <div class="leftTitle col-6">
                            <div id="numberTrack">${count}</div>
                            <div><a href=./album.html?id=${albumTot[i].artist.id}> <img src="${albumTot[i].album.cover_xl}" class="card-img-top"/></a></div>
                            <div><h6 id="albumTitle">${albumTot[i].album.title}</h6></div>
                          </div>

                          <div class="centerViews col-3">
                            <h6 id="views">${albumTot[i].rank}</h6>
                          </div>

                          <div class="rightTime col-2">
                            <h6 id="timeMusic">${albumTot[i].duration}</h6>
                          </div>`;
  }
}
chargeApi();
