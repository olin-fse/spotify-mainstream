// new party container and logic
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FriendList from 'components/new-party/FriendList';
import PlaylistOptions from 'components/new-party/PlaylistOptions';
import Tracklist from 'components/playlist/Tracklist';
import * as actions from './NewPartyActions';

class NewParty extends Component {

  constructor(props) {
    super(props);

    // testing name object (will be pulling from database or state here)
    const users = [
      {name: 'Katie Hite', username: 'kghite', selected: false, favoriteArtist: '3XHO7cRUPCLOr6jwp8vsx5', token: 'BQDOnFZYnHXIVEGE2hmD5LQlQvsJ2BJuSw62l4QntKneX0yH_xyi1piACDHtmkW6yHoHeHfIfTIAUu6QqLtb0_eQTgM9TZUqTuDnBkYnX3iZxyMVRmQC6TUgJASAR-0k6NmgIOR3nxu7LLr5AEdwLrWQMr6il_S_8LtVFmU8LSAqVpszAktfIYCFnsGymb0jOw'},
      {name: 'Keenan Zucker', username: '1232057693', selected: false, favoriteArtist: '1WrqUPWlHN5FXCRcQgrkas', token: 'BQDOnFZYnHXIVEGE2hmD5LQlQvsJ2BJuSw62l4QntKneX0yH_xyi1piACDHtmkW6yHoHeHfIfTIAUu6QqLtb0_eQTgM9TZUqTuDnBkYnX3iZxyMVRmQC6TUgJASAR-0k6NmgIOR3nxu7LLr5AEdwLrWQMr6il_S_8LtVFmU8LSAqVpszAktfIYCFnsGymb0jOw'}  
    ];

    this.props.actions.getFriendList(users);
  }

  toggleFriend = (username) => {
    this.props.actions.toggleFriend(username);
  }

  createNewPlaylist = () => {
    let selectedUsers = this.props.state.friendList.filter(friend => {
      return friend.selected;
    });

    fetch('/api/v1/get-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        users: selectedUsers
      })
    })
    .then(res => res.json())
    .then(data => {
      this.props.actions.setPlaylistTracks(data);
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return (
      <div className="new-party">
        <h1>NEW PARTY!</h1>
        <h3>Select your friends and create a playlist</h3>
        <FriendList friendList={this.props.state.friendList} toggleFriend={this.toggleFriend}/>
        <PlaylistOptions />
        <button onClick={this.createNewPlaylist}>Create a Playlist with these friends!</button>
        <Tracklist tracks={this.props.state.playlistTracks}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.newParty
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewParty);
