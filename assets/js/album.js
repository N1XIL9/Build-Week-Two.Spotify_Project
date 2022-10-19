window.onload = async () => {
    let res = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/292131562");
    let albumArray = await res.json();
    console.log(albumArray);

    document.querySelector("#album-cover").innerHTML = `
    <img src="${albumArray.cover}" alt="" id="cover-img" class="shadow" />
    <div id="album-info" class="ps-4 mt-5 text-dark">
        <p>ALBUM</p>
        <h1 id="album-name-album">${albumArray.title}</h1>
        <p>
            <img src="https://img.freepik.com/premium-vector/hipster-frofile-hat-with-glasses_6229-762.jpg?w=2000" alt="" class="rounded img-fluid" width="20px" />
            <span class="artist-name">${albumArray.artist.name} - ${albumArray.release_date.substring(0, 4)} - ${albumArray.nb_tracks}, ${(albumArray.duration / 60).toFixed(0)} min </span>
        </p>
    </div>`;

    for (let t of albumArray.tracks.data) {
        let trackDiv = document.querySelector("#track-list-album");
        trackDiv.innerHTML += `
        <div class="title-head text-light row mx-2 mt-4 track-div-box">
                            <div class="col row justify-content-start ">
                                <div class="col-2">
                                    <h6>${albumArray.tracks.data.indexOf(t) + 1}</h6>
                                </div>
                    
                                <div class="col">
                                    <div class="col">${t.title}</div>
                                    <div class="col text-white-50">${t.artist.name}</div>
                                </div>
                            </div>
                            <div class="col-2 text-center text-white-50">${t.rank}</div>
                            <div class="col-2 text-center text-white-50">${(t.duration / 60).toFixed(1)} min </div>
                        </div>`;
    }
};
