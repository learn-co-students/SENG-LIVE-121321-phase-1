// why is const a good choice for declaring an array type variable?
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
    artist: 'Queen',
    duration: 222,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
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

// this function will take the array as an argument and return the next id.
const nextId = (array) => array[array.length - 1].id + 1;

// create a copy of an object so we can see its state at a particular point in time.
const copy = (obj) => JSON.parse(JSON.stringify(obj));


function formatDuration(duration) {
  const seconds = duration % 60; // duration - minutes * 60
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return `${hours ? (hours + ':') : ''}${minutes}:${seconds}`
}

// ✅ Accessing Data in Arrays

// this function should return the first element
function retrieveFirst(playlist) {
  return playlist[0]
}

// // 👟👟👟 uncomment the lines below to test

console.log('retrieveFirst', retrieveFirst(playlist))
console.log('playlist after retrieveFirst', copy(playlist))

// ✅ adding and removing values

function addSongToPlaylist(playlist, song) {
  return playlist.push(song)
}

// // 👟👟👟 uncomment the lines below to test

console.log('addSongToPlaylist',addSongToPlaylist(playlist, {
  name: "Georgia On My Mind",
  artist: 'Ray Charles',
  duration: 217,
  playCount: 0,
  youtubeLink: 'https://www.youtube.com/watch?v=ggGzE5KfCio'
})) 
console.log('playlist after addSongToPlaylist', copy(playlist))


function removeSongFromPlaylist(playlist, songId) {
  let songIndex = playlist.findIndex(song => song.id === songId)
  if (songIndex > -1) {
    return playlist.splice(songIndex, 1)[0]
  }
}

// // 👟👟👟 uncomment the lines below to test

console.log('removeSongFromPlaylist', removeSongFromPlaylist(playlist, 9))
console.log('playlist after removeSongFromPlaylist', copy(playlist))


// ✅ Iteration

function songsByArtist(playlist, artistName) {
  return playlist.filter(song => song.artist === artistName)
}

// // 👟👟👟 uncomment the lines below to test

console.log('songsByArtist', songsByArtist(playlist, "Queen")) // uncomment this to test
console.log('playlist after songsByArtist', playlist)

function calculatePlaylistDuration(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('calculatePlaylistDuration',calculatePlaylistDuration(playlist))
// console.log('playlist after calculatePlaylistDuration', playlist)


// what method of iteration should we use here?
function renameArtist(playlist, oldArtistName, newArtistName) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('renameArtist', renameArtist(playlist, "Prince", "The Artist Formerly Known As Prince"))
// console.log('playlist after renameArtist', playlist)


// // Let's discuss Pass by value vs pass by reference here
