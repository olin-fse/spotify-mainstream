// new party container and logic
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './NewParty.sass';
import FriendList from 'components/new-party/FriendList';
import PlaylistOptions from 'components/new-party/PlaylistOptions';
import * as actions from './NewPartyActions';

class NewParty extends Component {

  constructor(props) {
    super(props);

    // testing name object (will be pulling from database or state here)
    const users = [
      {name: 'Katie Hite', username: 'kghite', selected: false, favoriteArtist: '3XHO7cRUPCLOr6jwp8vsx5', token: 'BQDgNusZ6nr-BEOW_xUn5bm5du3CoCt5XDTjKe4jCQk98lzi_15OvUGhMbc3hrZl2ODFzqRc4i-y-KTw6nBhvabzJ_VC3QpRPEEh0ZrMmxpXCRCCtl7XFDjP-VKuxXLPe2oQmnsMIsapjdbsKl3uYt3--LyRjpHMhmf2ZYstKLn_F2-S3RZS0vvjVBg-KVfKQg'},
      {name: 'Keenan Zucker', username: '1232057693', selected: false, favoriteArtist: '1WrqUPWlHN5FXCRcQgrkas', token: 'BQDgNusZ6nr-BEOW_xUn5bm5du3CoCt5XDTjKe4jCQk98lzi_15OvUGhMbc3hrZl2ODFzqRc4i-y-KTw6nBhvabzJ_VC3QpRPEEh0ZrMmxpXCRCCtl7XFDjP-VKuxXLPe2oQmnsMIsapjdbsKl3uYt3--LyRjpHMhmf2ZYstKLn_F2-S3RZS0vvjVBg-KVfKQg'}  
    ];

    this.props.actions.getFriendList(users);
  }

  toggleFriend = (username) => {
    console.log("friend clicked: " + username);
    this.props.actions.toggleFriend(username);
  }

  createNewPlaylist = () => {
    console.log("Create Playlist Clicked");

    let selectedUsers = this.props.newParty.friendList.filter(friend => {
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
      console.log("Client res: ");
      console.log(data);
      this.props.actions.setPlaylistTracks(data);
    })
    .catch(err => {
      console.error(err);
    })

    // SWITCH TO THE PLAYLIST FORM
    // window.location = "/playlist";
  }

  render() {
    // console.log(this.props);
    return (
      <div className="new-party">
        <h1>NEW PARTY!</h1>
        <h3>Select your friends and create a playlist</h3>
        <FriendList friendList={this.props.newParty.friendList} toggleFriend={this.toggleFriend}/>
        <PlaylistOptions />
        <button onClick={this.createNewPlaylist}>Create a Playlist with these friends!</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newParty: state.newParty
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewParty);
