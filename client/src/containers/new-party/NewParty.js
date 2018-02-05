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

  }

  selectFriend = () => {
    console.log("friend clicked!");
    // TODO --> Call the API to update the backend/database here!
  }

  findFriends = () => {
    // TODO -> call the Spotify API to generate the list of friends, set those into the state

    // testing names
    const friends = [
      {name: 'Kaite', id: 1111},
      {name: 'Pat', id: 1112},
      {name: 'Hieu', id: 1113},
      {name: 'Keenan', id: 1114},      
    ];

    this.props.actions.getFriendList(friends);
  }

  render() {
    console.log(this.props);
    return (
      <div className="new-party">
        <h1>NEW PARTY!</h1>
        <button onClick={this.findFriends}>Go!</button>
        <FriendList friendList={this.props.newParty.friendList} selectFriend={this.selectFriend}/>
        <PlaylistOptions />
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