# Lecture 8 CRUD with Fetch - PATCH and DELETE requests

## Music Library Application Summary

- Behavior
  - initial page load
    - fetches songs and
      - loads them into the sidebar
      - loads the artist choices for filter by artist
      - displays the total duration of songs
  - new song form submission
    - prevent default behavior
    - extract song data from form
    - use `createSong` to post song to database 
    - invoke `renderSong` to add the newly saved song to the sidebar
    - reset the new song form
  - new comment form submission
    - prevent default behavior
    - extract comment data from form
    - use `createComment` to post comment to database
    - invoke `renderComment` to add the newly saved comment to the page
    - reset the new comment form.
  - clicking on a song in the sidebar
    - invoke `loadSongIntoPlayer` with the appropriate song passed as an argument
  - selecting an artist to filter by
    - pull the selected artist value out of the selected option
    - invoke `getSongs` with that artist as an argument
    - use `loadSongsIntoSidebar` to load those fetched songs into the sidebar.
    - pass those same songs to `displayTotalDuration` to update the duration based on the filtered songs.
- Data
  - `getSongs(artist="")`
    - takes an optional artist (string) as an argument
    - if an argument is passed
      - fetches all songs by the artist passed as an argument
    - if no argument is passed
      - fetches all songs stored in the database
    - returns a promise for the JSON parsed body of the response
  - `createSong(songData)`
    - takes in `songData` (object) as an argument
    - sends a `POST` request to the database to persist the song
    - includes the JSON stringified `songData` as the body of the request
    - specifies a `Content-Type` header of `application/json` to indicate that the body of the request is a JSON formatted string
    - returns a promise for the JSON parsed body of the Response
  - `searchArtists(artist)` 
    - takes an `artist` (string) as an argument.
    - makes a `GET` request to the musicbrainz API to retrieve artists matching the artist passed as an argument
    - takes the first matching artist retrieved (the one that's the best match) and passes its id to `getInfoAboutArtist`
  - `getInfoAboutArtist(artistId)`
    - takes an `artistId` (number) as an argument
    - makes a `GET` request to the musicbrainz API to retrieve other releases by that artist.
    - parses the body of the response as JSON
    - maps over the returned array to construct an array of strings containing the title and date of each release.
    - returns a promise for the array of releases (strings)
- Display
  - `renderSong(song)`
    - takes a song object as an argument and returns an `li` element for display within the sidebar. This method also appends the element into the sidebar.
  - `loadSongsIntoSidebar(songs)`
    - takes the contents of the `songs` parameter and renders all of the songs as `li` elements, using `renderSong` to add each of them to the playlist `ul` element in the sidebar.
  - `displayTotalDuration(songs)`
    - takes an array of `songs` as an argument and uses the `calculateDuration(songs)` function to calculate the total duration of the songs.
    - adds the total duration to the bottom of the song list in the sidebar.
  - `addSong(song)`
    - takes a `song` as an argument and passes it to `renderSong(song)` adding it to the playlist `ul` element in the sidebar`.
  - `removeSongFromPlaylist(songId)`
    - takes the `songId` as an argument and finds the `song` within the sidebar that matches the `songId` (found by the data-id attribute)
    - removes its `li` element from the DOM.
  - `loadSongIntoPlayer(song)`
    - takes a song as an argument and loads its details into the player.
    - replaces the data attribute for the the new comment form to have the newly loaded song's songId.
    - passes the song's artist to the `searchArtists` function to load that songs artist from musibrainz
    - uses `populateReleases` to load the artist's other releases into the dropdown in the releases section.
    - replaces the visible comments with comments belonging to the selected song.
  - `loadArtistChoices(playlist)`
    - takes a `playlist` of songs as an argument and adds option tags to the `filterByArtist` select tag.
  - `populateReleases(releases)`
    - clears out the list of releases
    - populates the list of releases with releases belonging to the artist of the selected song. 
  - `renderComment(record)`
    - takes a stored comment `record` (object) as an argument
    - creates a `p` tag and populates it with an input containing the comment stored in the database
    - **TODO**: Adds event listeners for updating the comment text or deleting the comment
  - `renderComments(comments)`
    - takes `comments` (array) as an argument
    - iterates over the array and renders each comment with the `renderComment` function.
- Helper functions
  - `formatDuration(duration)`
    - takes a `duration` integer as an argument and returns a string formatted version
  - `formattedDurationToSeconds(formattedDuration)`
    - takes a string formatted duration as an argument and returns a `duration` integer in seconds.
  - `extractVideoID(url)`
    - helper method that takes a youtube url from a user and extracts the YouTube VideoID.

## Editing Content

- Edit Form
- Inline inputs to display content

We can have an edit form for a song that is a separate from our displayed song.
Or, we can display our songs using inputs without borders so they don't appear as inputs until clicking on one of them.

Instead of displaying the information within an `h2` element, we can use an `input` tag. This will allow our users to click upon the element and edit its content.

Say we start with this markup:

```html
<h2 id="song-name" class="text-2xl p-2">No Song Selected</h2>
<div class="relative" style="padding-top: 56.25%">
  <iframe id="player-frame" class="absolute inset-0 w-full h-full" frameborder="0" /></iframe>
</div>
<div class="flex justify-between mt-2">
  <span id="artist"></span> 
  <span id="play-count"></span>
</div>
```

We can update it to this:

```html
<form id="editSong">
  <h2 class="text-2xl p-2 flex justify-between">
    <input id="song-name" class="w-5/6" value="No Song Selected" />
    <button id="deleteSong">
      <i class="fas fa-trash-alt"></i>
    </button>
  </h2>
  <div class="relative" style="padding-top: 56.25%">
    <iframe id="player-frame" class="absolute inset-0 w-full h-full" frameborder="0" /></iframe>
  </div>
  <div class="flex justify-between mt-2">
    <input id="artist" class="w-3/4" /> 
    <span>plays: <input id="play-count" class="w-8" type="number" /></span>
  </div>
</form>
```

This won't work for the iframe, sadly, but should work for the name, artist and play count. Before we hook things up, though, we need to rework the function that loads the content into these DOM containers. Now that they're inputs, we'll need to use the `value` property instead of `textContent`.

```js
const loadSongIntoPlayer = (song) => {
  document.querySelector('#song-name').textContent = song.name;
  document.querySelector('#artist').textContent = song.artist;
  document.querySelector('#play-count').textContent = song.playCount === 1 ? '1 play' : `${song.playCount} plays`;
  document.querySelector('#player-frame').src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
  document.querySelectorAll('#playlist li').forEach(li => {
    li.classList.remove('bg-gray-100')
  })
  document.querySelector('#newComment').dataset.songId = song.id;
  // clear out the comments list and load comments for this song into the comments part of the DOM
  document.querySelector('#comments').innerHTML = "";
  getComments(song)
    .then(renderComments)
}
```

We will also want to add the songId as a data attribute of the form when we load the song into the player. The function will become this:

```js
const loadSongIntoPlayer = (song) => {
  document.querySelector('#song-name').value = song.name;
  document.querySelector('#artist').value = song.artist;
  document.querySelector('#play-count').value = song.playCount;
  document.querySelector('#player-frame').src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
  document.querySelectorAll('#playlist li').forEach(li => {
    li.classList.remove('bg-gray-100')
  })
  document.querySelector('#editSong').dataset.songId = song.id;
  document.querySelector('#newComment').dataset.songId = song.id;
  // clear out the comments list and load comments for this song into the comments part of the DOM
  document.querySelector('#comments').innerHTML = "";
  getComments(song)
    .then(renderComments)
}
```

This covers the display portion of our 3 pillars approach, leaving behavior and data remaining. This time we're working backwards, starting with the display logic then moving to the data and finally hooking up the event listeners/handlers to handle behavior.

### Data

```js
function updateSong(songId, songData) {
  return fetch(`http://localhost:3000/songs/${songId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(songData)
  })
    .then(res => res.json())
}
```

### Behavior

In this case, the behavior we're tracking is users interacting with the inputs within our form. 

But, since we're editing inline, and the content doesn't look like a form, it would be better if we could trigger auto-saves so that our changes are persisted without having to press a save button or hit enter to submit the form.

In order to do this, we can add a different kind of event listener to our form: `input`. This way, whenever the value of our input tag changes, a `patch` request will be sent automatically to update our API with the new value.


```js
const editSongForm = document.querySelector('#editSong')
editSongForm.addEventListener('input', (e) => {
  triggerSongAutoSave()
})

const triggerSongAutoSave = () => {
  const songId = editSongForm.dataset.songId;
  const songData = {
    name: document.getElementById('song-name').value,
    artist: document.getElementById('artist').value,
    playCount: parseInt(document.getElementById('play-count').value, 10)
  };
  updateSong(songId, songData)
    .then(renderSong)
}
```

Let's try this out in the browser now, we can see in our network tab that patch requests are triggered every time we update the name or artist  of a song, but we've got a bug:

Every time we change one of the values and the patch goes through, another copy of the song is added to the playlist in the sidebar.

Let's fix it!

### Fixing Duplicate renders upon song update
 This one happens because `renderSong` is creating a new list item for the updated song instead of updating the existing list item. We can fix this by changing the first line of the function where we define the `li` constant.

```js
const li = document.createElement('li');
```

Currently, this line of code will always create a new list item. Instead, we want to first check if we have a list item tag for this song already. The way we can do that is by taking a look one line down in the method:

```js
li.dataset.id = song.id;
```

The `renderSong` function creates the list item and assigns the song's id as a data attribute. This will allow us to query the DOM to see if we've already rendered an `existingLi` for this song before creating a new one. If we assign the `li` constant to the `existingLi` element, then all subsequent lines in the method will update the existing DOM node rather than a brand new one. When we called the `append` method later on, no duplicate is added if the appended node is already a child of the target node.

We can use the attribute selector to query the DOM for an existing li.

```js
const existingLi = document.querySelector(
  `#playlist li[data-song-id="${song.id}"]`
) 
const li = existingLi || document.createElement('li')
```

If we try it now, we'll notice that the edited `li` element gets moved to the bottom of the list. We want it to update, but we don't want it to move!

To fix this, let's try only doing the `target.append(li)` code if we don't already have an `existingLi`.

```js
if (!existingLi) {
  const target = document.querySelector('#playlist');
  target.append(li);
}
```

After the update, our `renderSong` function looks like this:

```js
function renderSong(song) {
  const existingLi = document.querySelector(
    `#playlist li[data-song-id="${song.id}"]`
  ) 
  const li = existingLi || document.createElement('li')
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
```

Now, if we visit our application in the browser, we can update the name of a song in the main content area and see the song's name update within the sidebar in response!


I'm going to show you a simple example of debouncing, because I think it's pretty cool. I've also included a couple of links below if you'd like to explore further with a more practical and reusable `debounce` function. For now, we're going to do the least amount possible to get this technique working.

This is how the `triggerSongAutoSave` function currently looks:

```js
function triggerSongAutoSave() {
  const songId = editSongForm.dataset.songId;
  const songData = {
    name: document.getElementById('song-name').value,
    artist: document.getElementById('artist').value,
    playCount: parseInt(document.getElementById('play-count').value, 10)
  };
  updateSong(songId, songData)
    .then(renderSong)
}
```

What we want to do is to declare a timeout variable outside the scope of this function. We'll call it `queuedSongAutoSave`.
These are our steps:
- create `queuedSongAutoSave` outside the function
- clear the previous `queuedSongAutoSave` every time the function is called
- reassign `queuedSongAutoSave` to another timeout to trigger the API/DOM update

The goal is to ensure that a user pauses in their typing briefly before we actually go through with updating the API & the DOM.

```js
let queuedSongAutoSave;
function triggerSongAutoSave() {
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
```

- [Debouncing on freecodecamp](https://www.freecodecamp.org/news/javascript-debounce-example/)
- [Debouncing in JS on dev.to](https://dev.to/abhishekjain35/debouncing-in-javascript-276j)


## Deleting Songs from the Playlist

### Display

Add a button with a trash icon inside to the header that will delete the song from the playlist.

```js
<h2 class="text-2xl p-2 flex justify-between">
  <input id="song-name" class="w-5/6" value="No Song Selected" />
  <button id="deleteSong">
    <i class="fas fa-trash-alt"></i>
  </button>
</h2>
```

We'll add the song's id to the button so that when we click on the button, we can retrieve the id we need to delete.
```js
document.querySelector('#deleteSong').dataset.songId = song.id;
```

We want to add the class to highlight the selected song within loadSongIntoPlayer
```js
document.querySelector(`#playlist li[data-id="${song.id}"]`).classList.add('bg-gray-100')
```

### Data

```js
function deleteSong(songId) {
  return fetch(`http://localhost:3000/songs/${songId}`, {
    method: 'DELETE'
  })
}
```


### Behavior

```js
document.getElementById('deleteSong').addEventListener('click', (e) => {
  let nextSelectedSong;
  const songIdToDelete = document.querySelector('#deleteSong').dataset.songId;
  getSongs()
    .then(songs => {
      const index = songs.findIndex(song => song.id == songIdToDelete)
      if (songs.length - 1 === index) {
        nextSelectedSong = songs[index - 1]
      } else {
        nextSelectedSong = songs[index + 1]
      }
    })
    .then(() => deleteSong(songIdToDelete))
    .then(() => {
      document.querySelector(`#playlist li[data-song-id="${songIdToDelete}"]`).remove();
      loadSongIntoPlayer(nextSelectedSong)
    })
  console.log('delete button clicked')
})
```

## Exercise

- Within the `renderComment` function, add event listeners to handle updating and deleting comments.
- Add functions called `updateComment` and `deleteComment` that both return promises.
    - `updateComment` will accept both its `id` and the commentData (an object with a comment property) as arguments. It sends a PATCH request using the `id` in the url and the comment in the body.
    - `deleteComment` will accept a `commentId` as an argument that will send a DELETE request to delete the comment from the database.
- Within the event handler in `renderComment` for clicking on the delete button, chain on a .then to deleteComment and remove the comment node from the DOM.