import React from 'react';
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
// 88
import { Spotify } from "../../util/Spotify";

import './App.css';


class App extends React.Component {
  // 30
  constructor(props) {
    super(props);
    // 31 
    this.state = { 
      searchResults: [],
      // 37
      playlistName: "New playlist", 
      playlistTracks: []
    };
    // 42
    this.addTrack = this.addTrack.bind(this);
    // 50
    this.removeTrack = this.removeTrack.bind(this);
    // 58
    this.updatePlaylistName = this.updatePlaylistName.bind(this);    
    // 64
    this.savePlaylist = this.savePlaylist.bind(this);    
    // 68
    this.search = this.search.bind(this);    

    
  }

  // 41
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    // treat state as immutable object
    let newPlaylist = this.state.playlistTracks.slice(0);
    newPlaylist.push(track);
    this.setState(
      { playlistTracks: newPlaylist }
     );
  }

  // 49
  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks.slice(0);
    let removeIndex;
    for (let i = 0; i < newPlaylist.length; i++) {
      if (newPlaylist[i].id === track.id) {
        removeIndex = i;
        break;
      }
    }
    newPlaylist.splice(removeIndex, 1);
    this.setState(
      { playlistTracks: newPlaylist }
     );
  }

  // 57
  updatePlaylistName(name) {
    this.setState(
      { playlistName: name }
    );
  }

  // 63 Generate an array of uri values called trackURIs from the playlistTracks property
  savePlaylist() {
    const trackURIs = [];
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      const trackID = this.state.playlistTracks[i].id;
      console.log(trackID);
      trackURIs.push(trackID);
    }
    // 95 
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState(
      { playlistName: "New Playlist", 
        playlistTracks: []
      }
    );
  }

  // 67
  search(searchTerm) {
    Spotify.search(searchTerm).then(extSearchResults => this.setState( { searchResults: extSearchResults } ));
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* 68 */}
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            {/* 32 & 42 */}
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
              />
            {/* 38 & 50 & 58 */}
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
