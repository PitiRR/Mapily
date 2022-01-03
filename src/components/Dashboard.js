import React, { useState } from 'react';
import { initiateLoadMoreSong, getPlaylistItems } from '../actions/result';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import Header from './Header';
import Loader from './Loader';
import Map from './Map';

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('song');
  const { isValidSession, history } = props;

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      //get songs, albums and playlists based on text query
      // props.dispatch(initiateGetResult(searchTerm)).then(() => {
      //   setIsLoading(false);
      //   setSelectedCategory('albums');
      //});

      //get playlist items for a specific (trending 50) playlist
       props.dispatch(getPlaylistItems(searchTerm)).then(() => {
         setIsLoading(false);
         setSelectedCategory('song');
        });
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const loadMore = async (type) => {
    if (isValidSession()) {
      const { dispatch, song } = props;
      setIsLoading(true);
      await dispatch(initiateLoadMoreSong(song.next));
      setIsLoading(false);
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const { song } = props;
  const result = {  song };

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Header />
          <SearchForm handleSearch={handleSearch} />
          <Loader show={isLoading}>Loading...</Loader>
          <Map 
            handleSearch={handleSearch}
            id='map'
            />
          <SearchResult
            result={result}
            loadMore={loadMore}
            setCategory={setCategory}
            selectedCategory={selectedCategory}
            isValidSession={isValidSession}
          />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              session_expired: true
            }
          }}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist,
    song: state.song
  };
};

export default connect(mapStateToProps)(Dashboard);