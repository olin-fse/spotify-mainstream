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

    // Get all users from the database
    fetch('/api/v1/get-users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(users => {
      this.props.actions.getFriendList(users);
    })
    .catch(err => {
      console.error(err);
    })
  }

  toggleFriend = (username) => {
    this.props.actions.toggleFriend(username);
  }

  createNewPlaylist = () => {
    let selectedUsers = this.props.newParty.friendList.filter(friend => {
      return friend.selected;
    });

    fetch('/api/v1/make-playlist', {
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
      console.log(data);
      if (Object.keys(data).length === 0 && data.constructor === Object) console.error('no tracks received');
      else this.props.actions.setPlaylistTracks(data);
    })
    .catch(err => {
      console.error(err);
    })
  }

  renderNewParty() {
    console.log(this.props);
    return (
      <div className="new-party">
        <h3>Select your friends and create a playlist</h3>
        <FriendList friendList={this.props.newParty.friendList} toggleFriend={this.toggleFriend}/>
        <PlaylistOptions />
        <button onClick={this.createNewPlaylist}>Create a Playlist with these friends!</button>
        <Tracklist tracks={this.props.newParty.playlistTracks}/>
      </div>
    );
  }

  renderLoading() {
    return <div></div>;
  }

  render() {
    if (this.props.app.userToken) return this.renderNewParty();
    else return this.renderLoading();
  }
}

function mapStateToProps(state) {
  return {
    newParty: state.newParty,
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewParty);
