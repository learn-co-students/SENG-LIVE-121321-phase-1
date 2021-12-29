let playlist;
// helper functions
function formatDuration(duration) {
  const seconds = duration % 60; // duration - minutes * 60
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return `${hours ? (hours + ':') : ''}${minutes}:${seconds < 10 ? ('0'+ seconds) : seconds}`
}

function formattedDurationToSeconds(formattedDuration) {
  const [seconds, minutes, hours] = formattedDuration.split(':').map(num => parseInt(num)).reverse();
  return seconds + (minutes ? minutes * 60 : 0) + (hours ? hours * 3600 : 0);
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function extractVideoID(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    alert("Could not extract video ID.");
  }
}

// DOM Manipulation (Display)
function renderSong(song) {
  const li = document.createElement('li');
  li.className = "flex justify-between p-2 pr-4 cursor-pointer";
  li.dataset.id = song.id;
  li.innerHTML = `
  <div>
    <span class="song font-semibold"></span>
    <span class="artist"></span>
  </div>
  <div class="duration text-gray-400"></div>`;
  li.addEventListener('click', (e) => {
    loadSongIntoPlayer(song);
  })
  const songEl = li.querySelector('.song');
  const artistEl = li.querySelector('.artist');
  const durationEl = li.querySelector('.duration')
  songEl.textContent = song.name;
  artistEl.textContent = `by ${song.artist}`;
  durationEl.textContent = formatDuration(song.duration);
  document.querySelector('#playlist').append(li);
  return li;
}

function loadSongsIntoSidebar(songs) {
  document.querySelector('#playlist').innerHTML = "";
  songs.forEach(renderSong)
  loadSongIntoPlayer(songs[0])
}

function addSong(song) {
  renderSong(song);
  return song;
}

function removeSongFromPlaylist(songId) {
  document.querySelector(`#playlist li[data-id="${songId}"]`).remove()
  return songToRemove;
}

function loadSongIntoPlayer(song) {
  document.querySelectorAll('#playlist li').forEach(li => {
    li.classList.remove('bg-gray-100')
  })
  const selectedLi = document.querySelector(`#playlist li[data-id="${song.id}"]`);
  selectedLi.classList.add('bg-gray-100')
  document.querySelector('#song-name').textContent = song.name;
  document.querySelector('#artist').textContent = song.artist;
  document.querySelector('#play-count').textContent = song.playCount === 1 ? '1 play' : `${song.playCount} plays`;
  document.querySelector('#player-frame').src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
  searchArtists(song.artist)
    .then(populateReleases)
}

function loadArtistChoices(playlist) {
  const artistSelect = document.querySelector('#filterByArtist');
  artistSelect.innerHTML = `<option value="">Filter by artist</option>`;
  const artists = playlist.reduce((artistsArray, song) => {
    if (artistsArray.indexOf(song.artist) === -1) {
      artistsArray.push(song.artist);
    }
    return artistsArray
  }, []);
  artists.forEach(artist => {
    const option = document.createElement('option');
    option.value = artist;
    option.textContent = artist;
    artistSelect.append(option);
  });
}

function populateReleases(releases) {
  const target = document.querySelector('#releases');
  target.innerHTML = "";
  const list = releases.forEach(release => {
    const li = document.createElement('li');
    li.textContent = release;
    target.append(li)
  })
}

// Data

// accepts an artist as an argument (optional) returns a promise for all songs (by the artist if an argument is provided)
function getSongs(artist = "") {
  const url = artist ? `http://localhost:3000/songs?artist=${artist}` : 'http://localhost:3000/songs'
  return fetch(url)
    .then(response => response.json())
}

// accept an object containing song data as an argument and post it to the database
function createSong(songData) {
  return fetch('http://localhost:3000/songs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(songData)
  })
    .then(response => response.json())
}

function searchArtists(artist) {
  return fetch(`https://musicbrainz.org/ws/2/artist/?query=${encodeURI(artist)}&fmt=json`)
    .then(response => response.json())
    .then(artistInfo => {
      const artistId = artistInfo.artists[0].id
      return getInfoAboutArtist(artistId)
    })
}

function getInfoAboutArtist(artistId) {
  return fetch(`https://musicbrainz.org/ws/2/artist/${artistId}?inc=releases&fmt=json`)
    .then(response => response.json())
    .then(data => {
      return data.releases.map(r => `${r.title} (${r.date})`)
    })
}


// Behavior (Event Handlers)

document.addEventListener('DOMContentLoaded', () => {
  // on page load, fetch all songs
  getSongs()
    .then((songs) => {
      loadSongsIntoSidebar(songs);
      loadArtistChoices(songs)
    })
  // upon form submission persist song to database
  document.querySelector('#newSong').addEventListener('submit', (e) => {
    e.preventDefault();
    const songDataFromForm = {
      name: e.target.nameInput.value,
      artist: e.target.artistInput.value,
      youtubeLink: e.target.youtubeLinkInput.value,
      duration: formattedDurationToSeconds(e.target.durationInput.value)
    };
    songDataFromForm.playCount = 0;
    createSong(songDataFromForm)
      .then(savedSong => {
        addSong(savedSong);
        e.target.reset();
      })
  })
  // When a new artist is selected, load their songs from the database
  document.querySelector('#filterByArtist').addEventListener('change', (e) => {
    const artist = e.target.value
    getSongs(artist)
      .then(songs => {
        loadSongsIntoSidebar(songs)
      })
  })
})
