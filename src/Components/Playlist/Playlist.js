import React from "react";
import { TrackList } from "../TrackList/TrackList";
import './Playlist.css';

export class Playlist extends React.Component {
  // 60
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // 59
  handleNameChange(e) {
    const name = e.target.value;
    this.props.onNameChange(name);
  }

  render() {
    return (
      <div className="Playlist">
        {/* 59 & ???61???*/}
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
        {/* 39 & 51 */}
        <TrackList 
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove} 
          // 51 ???"true" or {true}???
          isRemoval={true}
          />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}