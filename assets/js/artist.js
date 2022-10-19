let count = 0;

async function chargeApi() {
  let linkArtist = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=Nicola%20Lerra`);
  let responseText = await linkArtist.json();
  let musicArray = responseText.data;

  const albumOne = musicArray.slice(0, 4);
  const albumTwo = musicArray.slice(7, 9);
  const albumThree = musicArray[14];
  const albumFour = musicArray.slice(17, 19);

  let albumTot = albumOne.concat(albumTwo, albumThree, albumFour);

  console.log(albumTot);

  for (i = 0; i < albumTot.length; i++) {
    let trackList = document.querySelector("#contLCR");
    count++;
    console.log(count);
    console.log(trackList);
    trackList.innerHTML += ` <div class="leftTitle col-3">
                            <div id="numberTrack">${count}</div>
                            <div><img src="${albumTot[i].album.cover_xl}" class="card-img-top" /></div>
                            <div><h6 id="albumTitle">${albumTot[i].album.title}</h6></div>
                          </div>

                          <div class="centerViews col-5">
                            <h6 id="views">2.345.345</h6>
                          </div>

                          <div class="rightTime col-4">
                            <h6 id="timeMusic">2:35</h6>
                          </div>`;
  }
}
