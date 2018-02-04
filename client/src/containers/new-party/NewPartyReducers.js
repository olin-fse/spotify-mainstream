// new party reducers

export default function newParty(state={}, action) {
  console.log('new-party reducer');
  switch (action.type) {
    // add a friend to the state of selected friends
    case 'SELECT-FRIEND':
      return {
        ...state, 
        selectedFriends: [...state.selectedFriends, action.friendId] 
      }

    case 'GET-FRIEND-LIST':
      console.log('get friend list reducer');
      return {
        ...state, friendList: action.friendList
      }

    default:
      return state;
  }
}