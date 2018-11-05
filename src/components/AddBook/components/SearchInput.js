import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const ENTER = 'Enter';

class SearchInput extends React.Component {
  handleChange = name => event => this.props.onChange({
    ...this.props.value,
    [name]: event.target.value,
  });

  render() {
    const { onSearch, value } = this.props;

    return (
      <TextField
        autoFocus
        label="Název knihy a (nebo) jméno autora"
        id="title"
        onChange={this.handleChange('title')}
        onKeyPress={ev => ev.key === ENTER && onSearch(value)}
        margin="normal"
        autoComplete="off"
        value={value.title}
        // variant="filled"
        fullWidth
      />
    );
  }
}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default SearchInput;
