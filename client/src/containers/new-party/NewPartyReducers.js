// new party reducers
const defaultState = {
  friendList: []
}

export default function newParty(state=defaultState, action) {
  switch (action.type) {
    // toggle if the friend is selected or not
    case 'TOGGLE-FRIEND':
      const newState = {
        ...state, 
        friendList : state.friendList.map(user => {
          if (user.username === action.username) return {...user, selected: !user.selected}
          return user;
        })
      }
      return newState;

    case 'GET-FRIEND-LIST':
      return {
        ...state, friendList: action.friendList
      }

    default:
      return state;
  }
}