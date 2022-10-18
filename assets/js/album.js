// async function loadAlbum() {
//     const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062.json");

//     console.log(response);

//     const listText = await response.json();

//     const artist = await listText.json();

//     document.querySelector("#album-name").textContent = listText.title;

//     document.getElementById("cover-img").style.backgroundImage = listText.cover_medium;

//     document.getElementById("artist-name-info").textContent = `${artist.name} . ${listText.release_date} . ${artist.name} . ${listText.artist.name} `;

//     console.log(listText);
//     return listText;
// }

// window.onload = () => {
//     loadAlbum();
// };
