import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../images/music.jpeg';

const SongList = ({ song }) => {
  return (
    <div>
      {Object.keys(song).length > 0 && (
        <div className="song">
          {song.items.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '15rem' }}>
                  <a
                    target="_blank"
                    href={item.track.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(item.track.album.images[0]) ? (
                      <Card.Img variant="top" src={item.track.album.images[0].url} alt="" />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{item.track.name}</Card.Title>
                    <Card.Text>
                      <small>By {item.track.name}</small><br></br>
                      <small>Album {item.track.album.name}</small>
                    {item.track.explicit === 'true' && (
                        <small>Explicit</small>
                    )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SongList;