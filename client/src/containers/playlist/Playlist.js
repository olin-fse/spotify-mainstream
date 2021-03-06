// playlist container and logic
// new party container and logic
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './PlaylistActions';

class Playlist extends Component {

  render() {
    return (
      <div className="playlist">
        <h1>Here is your playlist!</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playlist: state.playlist
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
