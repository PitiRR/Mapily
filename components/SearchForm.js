import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchTerm.trim() !== '') {
      setErrorMsg('');
      props.handleSearch(searchTerm);
    } else {
      setErrorMsg('Please enter a search term.');
    }
  };

  const getGlobal50 = (event) => {
   //TODO:
   //1. Download .csv from https://spotifycharts.com/regional/global/daily/latest/download, programatically into a dir
   //2. Parse csv into JSON
   //3. parse results into rendering
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter search term</Form.Label>
          <Form.Control
            type="search"
            name="searchTerm"
            value={searchTerm}
            placeholder="Search for album, artist or playlist"
            onChange={handleInputChange}
            autoComplete="off"
          />
        </Form.Group>
        <Button variant="info" type="submit">
          Search
        </Button>
        <Button variant="info" type="submit" href="https://spotifycharts.com/regional/global/daily/latest/download" onClick={getGlobal50}>
          Get Global 50
        </Button>
      </Form>
    </div>
  );
};

export default SearchForm;