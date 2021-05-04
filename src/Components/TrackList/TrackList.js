import React from "react";
import { Track } from "../Track/Track";
import './TrackList.css';

export class TrackList extends React.Component {
  render() {
    // 34 use the .map() method to render each track in the tracks property ???CORRECT???
    let tracks = this.props.tracks;
    let tracksArr = [];
    if (Array.isArray(tracks)) {
      tracksArr = tracks.map(trackObj => {
        let track = (
          <Track
            track={trackObj}
            name={trackObj.name}
            artist={trackObj.artist}
            album={trackObj.album}
            key={trackObj.id}
            onAdd={this.props.onAdd} // 44
            onRemove={this.props.onRemove} // 52
            isRemoval={this.props.isRemoval} // 52
          />);
  
        return track;
      });
    }    

    return (
      <div className="TrackList">
        {tracksArr}
      </div>
    )
  }
}