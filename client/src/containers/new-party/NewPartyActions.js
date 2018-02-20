// new party actions

// select one of the friends from the list
export const toggleFriend = (username) => {
  return {
    type: 'TOGGLE-FRIEND',
    username
  }
}

// get all of the users from the DB
export const getFriendList = (friendList) => {
  return {
    type: 'GET-FRIEND-LIST',
    friendList
  }
}

export const setPlaylistTracks = (tracks) => {
  return {
    type: 'SET-PLAYLIST-TRACKS',
    tracks
  }
}