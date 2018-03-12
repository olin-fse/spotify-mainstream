// reducers used by the whole app

const defaultState = {
  userToken: '',
}
export default function app(state=defaultState, action) {
  switch (action.type) {
    // toggle if the friend is selected or not
    case 'SET-USER-TOKEN':
      return {
        ...state, userToken: action.token
      }

    default:
      return state;
  }
}