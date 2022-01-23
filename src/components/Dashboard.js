import React, { useState, useRef } from 'react';
import { initiateLoadMoreSong, getPlaylistItems } from '../actions/result';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchResult from './SearchResult';
import Header from './Header';
import Loader from './Loader';
import Map from './Map';
import ScrollToTop from './scrollToTop';

const Dashboard = (props) => {
  const results = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('song');
  const [errorMsg, setErrorMsg] = useState('');
  const { isValidSession, history } = props;
  // var isData = useState(true);

  const executeScroll = (reference) => { reference.current.scrollIntoView(); }

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      try {
      //get playlist items for a specific (trending 50) playlist
       props.dispatch(getPlaylistItems(searchTerm)).then(() => {
         // isData = true;
         setIsLoading(false);
         setSelectedCategory('song');
        });
        executeScroll(results);
      } catch (error) {
        // isData = false;
        setIsLoading(false);
        setErrorMsg("Sorry! No available data for this country.");
      }
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
  
  const result = props;

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Header />
          <Loader show={isLoading}>Loading...</Loader>
          <Map
            handleSearch={handleSearch}
            // isData={isData}
            id='map'
            />
          <SearchResult
            ref={results}
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
    song: state.song
  };
};

export default connect(mapStateToProps)(Dashboard);