// friend list to select from
import React, { Component } from 'react';

class FriendList extends Component {

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return <div>I'm sorry, please try again.</div>;
  }

  renderFriendList = () => {
    console.log(this.props);
    let friends = [];
    this.props.friendList.forEach((friend, i) => {
      friends.push(<li key={i}>{friend.name}</li>);
    })
    return (
      <div className="friend-list">
        <ul>
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