let count = 0;

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

  // console.log(albumTot);

  for (i = 0; i < albumTot.length; i++) {
    let container = document.querySelector("#sectionAlbum");
    container.innerHTML += `<div class="card col-3">
   <a href=./album.html?id=${albumTot[i].album.id}><img id="play" src="${albumTot[i].album.cover_xl}" class="card-img-top" alt="...">
  <div class="card-body">
    <a href=./album.html?id=${albumTot[i].album.id}><h5 class="card-title">${albumTot[i].album.title}</h5></a>
    <a href=./artist.html?id=${albumTot[i].artist.id}><p class="card-text">${albumTot[i].artist.name}</p></a>
   </div>
  </div>`;
  }

  const searchBar = document.getElementById("searchbar");
  searchBar.addEventListener("keyup", (e) => {
    document.querySelector("#sectionAlbum").innerHTML = "";
    const searchString = e.target.value;
    albumTot.filter((song) => {
      filter = song.title.toLowerCase().includes(searchString.toLowerCase());
      if (filter) {
        document.querySelector("#sectionAlbum").innerHTML += `<div class="card col-3">
   <a href=./album.html?id=${song.album.id}><img id="play" src="${song.album.cover_xl}" class="card-img-top" alt="...">
  <div class="card-body">
    <a href=./album.html?id=${song.album.id}><h5 class="card-title">${song.album.title}</h5></a>
    <a href=./artist.html?id=${song.artist.id}><p class="card-text">${song.artist.name}</p></a>
   </div>
  </div>`;
      }
    });
  });
}
chargeApi();
