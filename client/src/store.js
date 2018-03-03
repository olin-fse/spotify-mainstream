// Store goes here that should combine all of the component stores

import { combineReducers, createStore } from 'redux';
import app from 'containers/app/AppReducers';
import login from 'containers/login/LoginReducers';
import newParty from 'containers/new-party/NewPartyReducers';
import playlist from 'containers/playlist/PlaylistReducers';

const rootReducer = combineReducers({
    app,
    login,
    newParty,
    playlist
});

export default (initialState) => {
    return createStore(rootReducer, initialState);
};