import React, { Component } from 'react';

class Tracklist extends Component {

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return <div>I'm sorry, please try again.</div>;
  }

  renderTracklist = () => {
    let tracks = [];
    this.props.tracks.forEach((track, i) => {
      tracks.push(
        <li key={i} className="track">{track.name} - {track.artist}</li>
      );
    });

    return (
      <div className="tracklist">
        <h3>Here is your playlist</h3>
        <ul className="tracklist-tracks">
          {tracks}
        </ul>
      </div>
    )
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading();
    } else if (this.props.tracks.length > 0) {
      return this.renderTracklist();
    } else {
      return <div></div>;
    }
  }
}

export default Tracklist;