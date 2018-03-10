import React, { Component } from 'react';
import 'components/new-party/new-party.css';


class FriendList extends Component {

  onToggleFriend = (username) => {
    this.props.toggleFriend(username);
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return <div>I'm sorry, please try again.</div>;
  }

  renderFriendList = () => {
    // console.log(this.props);
    let friends = [];
    this.props.friendList.forEach((friend, i) => {
      friends.push(
        <li className={"selected-" + friend.selected} onClick={() => this.onToggleFriend(friend.username)} key={i}>{friend.display_name}</li>
      );
    });

    return (
      <div className="friend-list-container">
        <ul className="friend-list">
          {friends}
        </ul>
      </div>
    )
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading();
    } else if (this.props.friendList) {
      return this.renderFriendList();
    } else {
      return <div></div>;
    }
  }
}

export default FriendList;