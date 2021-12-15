// why is const a good choice for declaring an array type variable?
const playlist = [
  {
    id: 1,
    name: 'Sweet Dreams',
    artist: 'The Eurythmics',
    duration: 216,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=qeMFqkcPYcg'
  },
  {
    id: 2,
    name: 'Cry Me a River',
    artist: 'Justin Timberlake',
    duration: 290,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=DksSPZTZES0'
  },
  {
    id: 3,
    name: 'With a Little Help from my Friends',
    artist: 'Joe Cocker',
    duration: 289,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=a3LQ-FReO7Q'
  },
  {
    id: 4,
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: 359,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
  },
  {
    id: 5,
    name: 'Somebody To Love',
    artist: 'Queen',
    duration: 309,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=kijpcUv-b8M'
  },
  {
    id: 6,
    name: 'Another One Bites the Dust',
    artist: 'Queen',
    duration: 222,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
  },
  {
    id: 7,
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

}

// // 👟👟👟 uncomment the lines below to test

// console.log('retrieveFirst', retrieveFirst(playlist))
// console.log('playlist after retrieveFirst', playlist)

// ✅ adding and removing values

function addSongToBeginningOfPlaylist(playlist, song) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('addSongToBeginningOfPlaylist', addSongToBeginningOfPlaylist(playlist, {
//   name: "What'd I Say",
//   artist: 'Ray Charles',
//   duration: 255,
//   playCount: 0,
//   youtubeLink: 'https://www.youtube.com/watch?v=HAjeSS3kktA'
// })) 
// console.log('playlist after addSongToBeginningOfPlaylist', playlist)

function addSongToEndOfPlaylist(playlist, song) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('addSongToEndOfPlaylist',addSongToEndOfPlaylist(playlist, {
//   name: "Georgia On My Mind",
//   artist: 'Ray Charles',
//   duration: 217,
//   playCount: 0,
//   youtubeLink: 'https://www.youtube.com/watch?v=ggGzE5KfCio'
// })) 
// console.log('playlist after addSongToEndOfPlaylist', playlist)

function removeLastSongFromPlaylist(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('removeLastSongFromPlaylist', removeLastSongFromPlaylist(playlist))
// console.log('playlist after removeLastSongFromPlaylist', playlist)

function removeFirstSongFromPlaylist(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('removeFirstSongFromPlaylist', removeFirstSongFromPlaylist(playlist))
// console.log('playlist after removeFirstSongFromPlaylist', playlist)

// ✅ Iteration

function logSongNames(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// logSongNames(playlist) 
// console.log('playlist after logSongNames', playlist)

function calculatePlaylistDuration(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('calculatePlaylistDuration',calculatePlaylistDuration(playlist))
// console.log('playlist after calculatePlaylistDuration', playlist)


function songsByArtist(playlist, artist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('songsByArtist', songsByArtist(playlist, "Queen")) // uncomment this to test
// console.log('playlist after songsByArtist', playlist)

// what method of iteration should we use here?
function renameArtist(playlist, oldArtistName, newArtistName) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('renameArtist', renameArtist(playlist, "Prince", "The Artist Formerly Known As Prince"))
// console.log('playlist after renameArtist', playlist)


// // Let's discuss Pass by value vs pass by reference here



