import React from "react";
import "./Track.css";

export class Track extends React.Component {
  // 46 & 54
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  
  // 27
  renderAction() {
    // 55
    let button = <button className="Track-action" onClick={this.removeTrack}>-</button>;
    if (!this.props.isRemoval) {
      button = <button className="Track-action" onClick={this.addTrack}>+</button>
    }
    return button;
  }

  // 45 ???unclear???
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  // 53
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          {/* 35 Render the track name, artist and album ???CORRECT??? */}
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        {/* 27 */}
        {this.renderAction()}
      </div>
    );
  }
}