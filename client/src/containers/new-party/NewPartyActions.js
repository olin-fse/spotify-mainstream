// new party actions

// select one of the friends from the list
export const selectFriend = (friendId) => {
  return {
    type: 'SELECT-FRIEND',
    friendId
  }
}

export const getFriendList = (friendList) => {
  console.log(friendList);
  return {
    type: 'GET-FRIEND-LIST',
    friendList
  }
}