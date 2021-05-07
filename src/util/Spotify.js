// 82
const appClientID = "14583bff091241f9b3b31a04da25f90b";
// 97
//const redirectURI = "http://localhost:3000/";
//const redirectURI = "http://simon-is-jammming.surge.sh"
const redirectURI = window.location.href;
let accessToken;
let expiresIn;

export const Spotify = {
  // 78
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      // 79
      accessToken = window.location.href.match(/access_token=([^&]*)/);
      accessToken = accessToken ? (accessToken.length > 1 ? accessToken[1] : null) : null;
      expiresIn = window.location.href.match(/expires_in=([^&]*)/);
      expiresIn = expiresIn ? (expiresIn.length > 1 ? expiresIn[1] : null) : null;

      // 80
      if (accessToken && expiresIn) {
        window.setTimeout(() => accessToken = "", expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
        return accessToken;
      } else {
        // 83
        window.location = `https://accounts.spotify.com/authorize?client_id=${appClientID}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectURI}`;
      }
    }
  },

  //85
  search(searchTerm) {
    async function asyncSearch() {
      const urlToFetch = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`;
      const token = Spotify.getAccessToken();
      try {
        // 86
        const response = await fetch(urlToFetch, { headers: { Authorization: `Bearer ${token}` } });
        if (response.ok) {
          // 87
          const jsonResponse = await response.json();

          const tracksArray = jsonResponse.tracks.items;
          const trackList = tracksArray.map(item => {
            const track = {};
            track["id"] = item.id;
            track["name"] = item.name;
            track["artist"] = item.artists[0]["name"];
            track["album"] = item.album.name;
            track["URI"] = item.uri;
            return track
          });
          console.log(trackList[0]);
          console.log(trackList[1]);
          return trackList;
        }
        throw new Error("Request failed!");
      }
      catch (error) {
        console.log(error);
      }
    }
    return asyncSearch();
  },

  // 90
  savePlaylist(playlistName, trackURIs) {
    if (playlistName && trackURIs) {
      // 91
      const token = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${token}` };
      
      // 92
      const userID = async function () {
        try {
          const response = await fetch("https://api.spotify.com/v1/me", { headers: headers });
          if (response.ok) {
            const jsonResponse = await response.json();
            const userID = jsonResponse.id;
            return userID;
          }
          throw new Error("Request failed!");
        }
        catch (error) {
          console.log(error);
        }
      };

      //93
      const createPlaylist = async (userID) => {
        try {
          const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists` , {
              headers: headers, 
              method: "POST", 
              body: JSON.stringify({
                "name": playlistName,
                "description": "New playlist description",
                "public": false
              })
            });
          if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.id;
          }
          throw new Error("Request failed! Response: " + response.status);
        }
        catch(error) {
          console.log(error);
        }
      }

      //94 ???in description array of tracks, but in api documentation it's url parameter???
      const fillPlaylist = async (playlistID) => {
        try {
          const tracksString = "spotify%3Atrack%3A" + trackURIs.join("%2Cspotify%3Atrack%3A");
          const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${tracksString}` , {
              headers: headers, 
              method: "POST"
            });
          if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.id;
          }
          throw new Error("Request failed!");
        }
        catch(error) {
          console.log(error);
        }
      }

      // .then chain
      const playlistID = userID().then(uID => createPlaylist(uID)).then(pID => fillPlaylist(pID));

      return playlistID;

    } else {
      return;
    }
  }




};