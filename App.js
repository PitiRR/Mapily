import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './css/App.css';
import './css/Api.css';
import { Credentials } from './Credentials';

function App() {

  const spotify = Credentials();  
  const [token, setToken] = useState(''); 

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=authorization_code',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
    })
  })

  const authorizeWithSpotify = () => {
    axios
    .get(
        'https://api.spotify.com/v1/me/playlists',
        { params: { limit: 50, offset: 0 } },
        {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + access_token,
                'Content-Type': 'application/json',
            },
        }
    )
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /><div id="login">
        <h1>Mapily</h1>
        <h2>This app requires Spotify authorization to run</h2>
        <button 
        onClick={authorizeWithSpotify} 
        className="sp-button sp-flat">Log in with Spotify</button>
      </div>
        <button 
          className="sp-button sp-flat">
          Get a Song
        </button>
        <button 
          className="sp-button sp-flat">
          Get a Song
        </button>
      </header>
    </div>
  );
}

export default App;
