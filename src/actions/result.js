import {
  SET_SONG,
  ADD_SONG
} from '../utils/constants';
import { get } from '../utils/api';

export const setSong = (songs) => ({
  type: SET_SONG,
  songs
});

export const addSong = (songs) => ({
  type: ADD_SONG,
  songs
});

export const getPlaylistItems = (searchTerm) => {
  return async (dispatch) => {
      const API_URL = `https://api.spotify.com/v1/playlists/${searchTerm}/tracks`;
      const result = await get(API_URL);
      console.log(result);
      return dispatch(setSong(result));
  };
};

export const initiateLoadMoreSong = (url) => {
  return async (dispatch) => {
    try {
      const result = await get(url);
      return dispatch(addSong(result.songs));
    } catch (error) {
      console.log('error', error);
    }
  };
};