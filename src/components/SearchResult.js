
import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import SongList from './SongList';

const SearchResult = (props) => {
  const {
    isValidSession,
    loadMore,
    result,
    setCategory,
    selectedCategory
  } = props;
  const { song } = result;

  if (!isValidSession()) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            session_expired: true
          }
        }}
      />
    );
  }
  return (
    <React.Fragment>
      <div className="search-buttons">
        {!_.isEmpty(song.items) && (
          <button
            className={`${
              selectedCategory === 'song' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('song')}
          >
            Songs
          </button>
        )}
      </div>
      <div className={`${selectedCategory === 'song' ? '' : 'hide'}`}>
        {song && <SongList song={song} />}
      </div>
      {!_.isEmpty(result[selectedCategory]) &&
        !_.isEmpty(result[selectedCategory].next) && (
          <div className="load-more" onClick={() => loadMore(selectedCategory)}>
            <Button variant="info" type="button">
              Load More
            </Button>
          </div>
        )}
    </React.Fragment>
  );
};

export default SearchResult;