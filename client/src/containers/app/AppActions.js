// actions used by the whole app

export const setUserToken = (token) => {
  return {
    type: 'SET-USER-TOKEN',
    token
  }
}