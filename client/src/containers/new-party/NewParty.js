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
      {name: 'Katie Hite', username: 'kghite', selected: false, favoriteArtist: '3XHO7cRUPCLOr6jwp8vsx5', token: 'BQBptTVjbvkvSffLZpmuiuDHvKWNpS5_iKMn2HaSJIGicb4SAXztdii-KIFKF6E2rIN98hF9TGK0U8SPJpWHhgpEBakg4RuShjg5T7G7xij3JpwZR9mI-FqHuv-GdZ9h-UyBOAK6g4_xcGd4h1lAY5bBCfeCo2RF_KjPq61Nvy2L7gngUlExzcSB-bcMcyXjzw'},
      {name: 'Keenan Zucker', username: '1232057693', selected: false, favoriteArtist: '1WrqUPWlHN5FXCRcQgrkas', token: 'BQBptTVjbvkvSffLZpmuiuDHvKWNpS5_iKMn2HaSJIGicb4SAXztdii-KIFKF6E2rIN98hF9TGK0U8SPJpWHhgpEBakg4RuShjg5T7G7xij3JpwZR9mI-FqHuv-GdZ9h-UyBOAK6g4_xcGd4h1lAY5bBCfeCo2RF_KjPq61Nvy2L7gngUlExzcSB-bcMcyXjzw'}  
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
