import PropTypes from 'prop-types';
import { Header, Form, FormButton, FormInput } from './SearchBAr.styled';
import { ReactComponent as SearchIcon } from '../../icon/search.svg';
import { useState } from 'react';
import { useEffect } from 'react';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, [query]);

  const onChange = event => {
    setQuery(event.target.value.trim());
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    onSubmit(query);
    setDisabled(true);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmitForm}>
        <FormButton type="submit" aria-label="search" disabled={disabled}>
          <SearchIcon width="20" height="20" fill="black" />
        </FormButton>

        <FormInput
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChange}
        />
      </Form>
    </Header>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
