const searchSong = async () => {
  const searchText = document.getElementById("search-field").value;
  const url = `https://api.lyrics.ovh/suggest/${searchText}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displaySongs(data.data);
  } catch (error) {
    errorDisplay();
  }
};
const displaySongs = (songs) => {
  let songsContainer = document.getElementById("song-container");
  songsContainer.innerHTML = "";
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
            <source src="${song.preview}" type="audio/ogg">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>
    `;
    songsContainer.appendChild(songDiv);
  });
  const searchText = (document.getElementById("search-field").value = "");
};
const getLyric = async (artist, title) => {
  const lyricUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  try {
    const response = await fetch(lyricUrl);
    const data = await response.json();
    displayLyric(data.lyrics);
  } catch (error) {
    errorDisplay();
  }
};
const displayLyric = (lyrics) => {
  const lyricsDiv = document.getElementById("song-lyrics");
  lyricsDiv.innerText = lyrics;
};
const errorDisplay = () => {
  const errorDiv = document.getElementById("error-msg");
  errorDiv.innerText = "Something went Wrong!!!!";
};
