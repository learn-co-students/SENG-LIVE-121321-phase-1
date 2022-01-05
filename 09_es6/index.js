// Behavior
function init() {
  // fetch songs for initial load
  getSongs()
    .then((songs) => {
      loadSongsIntoSidebar(songs);
      loadArtistChoices(songs)
      displayTotalDuration(songs);
    })
  // handle form submission for creating a new song
  document.querySelector('#newSong').addEventListener('submit', (event) => {
    event.preventDefault();
    const songData = {
      name: event.target.nameInput.value,
      artist: event.target.artistInput.value,
      duration: event.target.durationInput.value,
      youtubeLink: event.target.youtubeLinkInput.value,
      playCount: 0
    }
    createSong(songData)
      .then((savedSong) => {
        renderSong(savedSong);
        event.target.reset();
      })
  })
  document.querySelector('#filterByArtist').addEventListener('change', (e) => {
    const artist = e.target.value
    // get all songs by the artist and load them into the sidebar
    getSongs(artist)
      .then(songs => {
        loadSongsIntoSidebar(songs)
        displayTotalDuration(songs);
      })
  })
  // Add Submit Handler for new Comment Form
  // pull data out of form and pass to createComment
  // after promise resolves, pass response to renderComment and reset the form
  document.querySelector('#newComment').addEventListener('submit', (event) => {
    event.preventDefault();
    const commentData = {
      songId: event.target.dataset.songId,
      comment: event.target.commentInput.value,
    }
    createComment(commentData)
      .then(savedRecord => {
        renderComment(savedRecord)
        event.target.reset();
      })
  })

  const editSongForm = document.querySelector('#editSong');
  editSongForm.addEventListener('input', (e) => {
    const { name, value } = e.target;
    console.log('name:', name, 'value:', value);
    triggerSongAutoSave()
  })
  editSongForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })

  let queuedSongAutoSave;
  const triggerSongAutoSave = () => {
    window.clearTimeout(queuedSongAutoSave);
    queuedSongAutoSave = window.setTimeout(() => {
      const songId = editSongForm.dataset.songId;
      const songData = {
        name: document.getElementById('song-name').value,
        artist: document.getElementById('artist').value,
        playCount: parseInt(document.getElementById('play-count').value, 10)
      };
      updateSong(songId, songData)
        .then(renderSong)
    }, 300)
  }

  const deleteBtn = document.querySelector('#deleteSong');
  deleteBtn.addEventListener('click', (e) => {
    const songIdToDelete = deleteBtn.dataset.songId;
    deleteSong(songIdToDelete)
      .then(() => {
        document.querySelector(`#playlist li[data-id="${songIdToDelete}"]`).remove();
      })
      .then(() => {
        return getSongs();
      })
  })
}


document.addEventListener('DOMContentLoaded', init)

// Data

// accepts an artist as an argument (optional) returns a promise for all songs (by the artist if an argument is provided)
const getSongs = (artist = "") => {
  const url = artist ? `http://localhost:3000/songs?artist=${artist}` : 'http://localhost:3000/songs'
  return fetch(url)
    .then(response => response.json())
}

// accept an object containing song data as an argument and post it to the database
const createSong = (songData) => {
  return fetch('http://localhost:3000/songs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(songData)
  })
    .then(response => response.json())
}

const searchArtists = (artist) => {
  return fetch(`https://musicbrainz.org/ws/2/artist/?query=${encodeURI(artist)}&fmt=json`)
    .then(response => response.json())
    .then(artistInfo => {
      console.log('artistInfo', artistInfo)
      const artistId = artistInfo.artists[0].id
      return getInfoAboutArtist(artistId)
    })
}

const getInfoAboutArtist = (artistId) => {
  return fetch(`https://musicbrainz.org/ws/2/artist/${artistId}?inc=releases&fmt=json`)
    .then(response => response.json())
    .then(data => {
      console.log('artistData', data)
      return data.releases.map(r => `${r.title} (${r.date})`)
    })
}

  // Add update and delete song functions
  const updateSong = (songId, songData) => {
    return fetch(`http://localhost:3000/songs/${songId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(songData)
    })
      .then(res => res.json())
  }

  const deleteSong = (songId) => {
    return fetch(`http://localhost:3000/songs/${songId}`, {
      method: 'DELETE'
    })
  }


  const getComments = (song) => {
    return fetch(`http://localhost:3000/comments?songId=${song.id}`)
      .then(res => res.json())
  }
  // add in createComment
  const createComment = (commentData) => {
    return fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
      .then(res => res.json())
  }

  // 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
  // add in updateComment(commentId, commentData) and
  // deleteComment(commentId)
  const updateComment = (commentId, commentData) => {
    return fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })  
      .then(res => res.json())
  }
  
  const deleteComment = (commentId) => {
    return fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'DELETE'
    })  
      .then(res => res.json())
  }

// Display

  const renderSong = (song) => {
    const existingLi = document.querySelector(`#playlist li[data-id="${song.id}"]`);
    const li = existingLi || document.createElement('li');
    li.dataset.id = song.id;
    li.className = "flex justify-between p-2 pr-4 cursor-pointer";
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
    durationEl.textContent = song.duration;
    if (!existingLi) {
      const target = document.querySelector('#playlist');
      target.append(li);
    }
    return li;
  }

  const loadSongsIntoSidebar = (songs) => {
    document.querySelector('#playlist').innerHTML = "";
    songs.forEach(renderSong)
    loadSongIntoPlayer(songs[0])
  }

  const displayTotalDuration = (songs) => {
    document.querySelector('#totalDuration').textContent = calculateDuration(songs);
  }

  const addSong = (song) => {
    renderSong(song);
    return song;
  }

  const removeSongFromPlaylist = (songId) => {
    document.querySelector(`#playlist li[data-id="${songId}"]`).remove()
    return songToRemove;
  }

  const loadSongIntoPlayer = (song) => {
    document.querySelectorAll('#playlist li').forEach(li => {
      li.classList.remove('bg-gray-100')
    })
    const selectedLi = document.querySelector(`#playlist li[data-id="${song.id}"]`);
    selectedLi.classList.add('bg-gray-100')
    document.querySelector('#song-name').value = song.name;
    document.querySelector('#artist').value = song.artist;
    document.querySelector('#play-count').value = song.playCount;
    document.querySelector('#player-frame').src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
    searchArtists(song.artist)
      .then(populateReleases)
    
    // Add a data attribute to the newComment form
    // to track the songId of the selected song
    // We'll use this from within the submit event
    // handler to ensure that the comment is 
    // associated with the song that is loaded into
    // the player.
    document.querySelector('#editSong').dataset.songId = song.id;
    document.querySelector('#deleteSong').dataset.songId = song.id;
    document.querySelector('#newComment').dataset.songId = song.id;
    // clear out the comments list and load comments for this song into the comments part of the DOM
    document.querySelector('#comments').innerHTML = "";
    getComments(song)
      .then(renderComments)
  }

  const loadArtistChoices = (playlist) => {
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

  const populateReleases = (releases) => {
    const target = document.querySelector('#releases');
    target.innerHTML = "";
    const list = releases.forEach(release => {
      const li = document.createElement('li');
      li.textContent = release;
      target.append(li)
    })
  }

  // define a function renderComment for 
  // rendering a single comment from a 
  // peristed record passed as an argument
  const renderComment = (record) => {
    const target = document.querySelector('#comments');
    const p = document.createElement('p');
    p.className = "flex justify-between";
    p.innerHTML = `
    <input class="w-5/6" />
    <button><i class="fas fa-trash-alt"></i></button>
    `
    const input = p.querySelector('input');
    const deleteBtn = p.querySelector('button');
    input.value = record.comment;
    // 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
    // add event listeners for updating or deleting a comment
    input.addEventListener('input', (e) => {
      updateComment(record.id, {comment: e.target.value})
    })
    deleteBtn.addEventListener('click', (e) => {
      deleteComment(record.id)
        .then(() => p.remove())
    })
    target.append(p);
  }

  // define a function renderComments for
  // clearing out the comments and fill in the
  // div with the retrieved comments from the API
  // passing them to renderComment 
  const renderComments = (comments) => {
    const target = document.querySelector('#comments');
    target.innerHTML = "";
    comments.forEach(renderComment)
  }

// helper functions
const formatDuration = (duration) => {
  const seconds = duration % 60; // duration - minutes * 60
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return `${hours ? (hours + ':') : ''}${minutes}:${seconds < 10 ? ('0'+ seconds) : seconds}`
}

const formattedDurationToSeconds = (formattedDuration) => {
  const [seconds, minutes, hours] = formattedDuration.split(':').map(num => parseInt(num)).reverse();
  return seconds + (minutes ? minutes * 60 : 0) + (hours ? hours * 3600 : 0);
}

const extractVideoID = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    alert("Could not extract video ID.");
  }
}

const calculateDuration = (songs) => {
  const totalDuration = songs.reduce((total, song) => {
    return total + formattedDurationToSeconds(song.duration)
  }, 0)
  return formatDuration(totalDuration)
}