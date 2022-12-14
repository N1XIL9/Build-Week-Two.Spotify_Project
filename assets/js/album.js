window.onload = async () => {
  let queryString = new URLSearchParams(window.location.search);
  let id = queryString.get("id");

  let res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`);
  let albumArray = await res.json();
  console.log(albumArray);

  function secToMin(n) {
    return new Date(n * 1000).toISOString().substr(14, 5);
  }

  document.querySelector("#album-cover").innerHTML = `
            
            <img src="${albumArray.cover}" alt="" id="cover-img" class="shadow m-4 " />
           
            <div id="album-info" class="ps-4 mt-5 text-dark">
                <p class=" d-none d-sm-block">ALBUM</p>
                <h1 id="album-name-album">${albumArray.title}</h1>
                <p>
                    <img src="https://img.freepik.com/premium-vector/hipster-frofile-hat-with-glasses_6229-762.jpg?w=2000" alt="" class="rounded img-fluid" width="20px" />
                    <span class="artist-name">
                    <a href=./artist.html?id=${albumArray.artist.id}>${albumArray.artist.name}</a> - ${albumArray.release_date.substring(0, 4)} - ${albumArray.nb_tracks}, ${secToMin(albumArray.duration)} min</span>
                </p>
            </div>`;

  document.querySelector("#navbar-left").innerHTML = `
    <img id="player-cover-b" src="${albumArray.cover_small}" alt="music" />
                    <div class="play-back">
                        <p id="title-song"></p>
                        <p id="author"><a href=./artist.html?id=${albumArray.artist.id}>${albumArray.artist.name}</a></p>
                    </div>
                    <i id="heart-bg-player"class="bi bi-heart" onclick="changeClass()"></i>`;

  for (let t of albumArray.tracks.data) {
    let trackDiv = document.querySelector("#track-list-album");

    trackDiv.innerHTML += `
        <div class="track-div-box text-light row mx-2 my-2">
                            <div class="col row justify-content-start ">
                                <div class="col-1">
                                    <h6 class="text-white-50">${albumArray.tracks.data.indexOf(t) + 1}</h6>
                                </div>
                    
                                <div class="col links-of-list">
                                    <div class="col song-to-play "><a class="song-name" onclick="myFunction('${t.title}','${t.preview}')">${t.title}</a></div>
                                    <div class="col song-to-play text-white-50"><a href=./artist.html?id=${t.artist.id}>${t.artist.name}</a></div>
                                </div>
                            </div>

                            <div class="col-2 text-center text-white-50 d-none d-sm-block">${t.rank}</div>

                            <div class="col-2 text-center text-white-50 d-none d-sm-block">${secToMin(t.duration)} min </div>
                            
                            <i class="col-2 bi bi-three-dots-vertical text-white-50 d-block d-sm-none"></i>
        </div>`;
  }
};

function myFunction(nome, preview) {
  document.getElementById("title-song").innerHTML = nome;
}

let changeClass = function () {
  document.getElementById("heart").classList.toggle("bi-heart");
  document.getElementById("heart").classList.toggle("bi-heart-fill");
  document.getElementById("heart-btm").classList.toggle("bi-heart");
  document.getElementById("heart-btm").classList.toggle("bi-heart-fill");
  document.getElementById("heart-bg-player").classList.toggle("bi-heart");
  document.getElementById("heart-bg-player").classList.toggle("bi-heart-fill");
};
