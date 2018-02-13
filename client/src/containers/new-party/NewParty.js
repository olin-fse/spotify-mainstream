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

    // testing name object
    const users = [
      {name: 'Kaite Hite', username: 'kghite', selected: false},
      {name: 'Keenan Zucker', username: '1232057693', selected: false}  
    ];

    this.props.actions.getFriendList(users);
  }

  toggleFriend = (username) => {
    console.log("friend clicked: " + username);
    this.props.actions.toggleFriend(username);


    // TODO --> Call the API to update the backend/database here!
  }

  render() {
    console.log(this.props);
    return (
      <div className="new-party">
        <h1>NEW PARTY!</h1>
        <h3>Select your friends and create a playlist</h3>
        <FriendList friendList={this.props.newParty.friendList} toggleFriend={this.toggleFriend}/>
        <PlaylistOptions />
        <button>Create a Playlist</button>
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
