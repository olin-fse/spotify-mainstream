// new party actions

// select one of the friends from the list
export const toggleFriend = (username) => {
  return {
    type: 'TOGGLE-FRIEND',
    username
  }
}

export const getFriendList = (friendList) => {
  return {
    type: 'GET-FRIEND-LIST',
    friendList
  }
}