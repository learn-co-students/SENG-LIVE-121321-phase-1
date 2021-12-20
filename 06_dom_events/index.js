const playlist = [
  {
    id: 1,
    name: "What'd I Say",
    artist: 'Ray Charles',
    duration: 255,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=HAjeSS3kktA'
  },
  {
    id: 2,
    name: 'Sweet Dreams',
    artist: 'The Eurythmics',
    duration: 216,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=qeMFqkcPYcg'
  },
  {
    id: 3,
    name: 'Cry Me a River',
    artist: 'Justin Timberlake',
    duration: 290,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=DksSPZTZES0'
  },
  {
    id: 4,
    name: 'With a Little Help from my Friends',
    artist: 'Joe Cocker',
    duration: 289,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=a3LQ-FReO7Q'
  },
  {
    id: 5,
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: 359,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
  },
  {
    id: 6,
    name: 'Somebody To Love',
    artist: 'Queen',
    duration: 309,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=kijpcUv-b8M'
  },
  {
    id: 7, 
    name: 'Another One Bites the Dust',
    // name: '<style>@keyframes x{}</style><img style="animation-name:x" onanimationend="alert(1)"/>Another One Bites the Dust',
    artist: 'Queen',
    duration: 222,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=eqyUAtzS_6M'
  },
  {
    id: 8,
    name: 'Purple Rain',
    artist: 'Prince',
    duration: 477,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=TvnYmWpD_T8'
  }
]

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

function renderSong(song) {
  const li = document.createElement('li');
  li.className = "flex justify-between p-2 pr-4 cursor-pointer";
  li.dataset.id = song.id;
  li.innerHTML = `
  <div>
    <span class="song font-semibold"></span>
    <span class="artist text-gray-400"></span>
  </div>
  <div class="duration text-gray-400"></div>`;
  const songEl = li.querySelector('.song');
  const artistEl = li.querySelector('.artist');
  const durationEl = li.querySelector('.duration')
  songEl.textContent = song.name;
  artistEl.textContent = `by ${song.artist}`;
  durationEl.textContent = formatDuration(song.duration);
  document.querySelector('#playlist').append(li);
  return li;
}

function loadPlaylistToSidebar(playlist) {
  document.querySelector('#playlist').innerHTML = "";
  playlist.forEach(renderSong)
}

loadPlaylistToSidebar(playlist);

function addSongToPlaylist(playlist, song) {
  song.id = nextId(playlist);
  song.playCount = 0;
  playlist.push(song);
  renderSong(song)
  return song;
}

function removeSongFromPlaylist(playlist, songId) {
  const foundSongIndex = playlist.findIndex(song => song.id === songId)
  if (foundSongIndex !== -1) {
    const songToRemove = playlist.splice(foundSongIndex, 1)[0];
    document.querySelector(`#playlist li[data-id="${songId}"]`).remove()
    return songToRemove;
  } else {
    alert('Song not found!')
  }
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

function loadSongIntoPlayer(song) {
  document.querySelector('#song-name').textContent = song.name;
  document.querySelector('#artist').textContent = song.artist;
  document.querySelector('#play-count').textContent = song.playCount === 1 ? '1 play' : `${song.playCount} plays`;
  document.querySelector('#player-frame').src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
}

function songsByArtist(playlist, artist) {
  const target = document.querySelector('#playlist')
  target.innerHTML = '';
  const songsByArtist = playlist.filter(song => song.artist === artist)
  loadPlaylistToSidebar(songsByArtist)
}
