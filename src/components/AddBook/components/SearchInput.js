import React  from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

const ENTER = 'Enter';

class SearchInput extends React.Component {
  handleChange = name => event => this.props.onChange({
    ...this.props.value,
    [name]: event.target.value,
  });

  render() {
    const { onSearch, value } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} md={5}>
          <FormControl
            margin="normal"
            fullWidth
          >
            <Input
              autoFocus
              placeholder="Název knihy"
              id="title"
              onChange={this.handleChange('title')}
              onKeyPress={ev => ev.key === ENTER && onSearch(value)}
              autoComplete="off"
              value={value.title}
              variant="filled"
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <FormControl
            margin="normal"
            fullWidth
          >
            <Input
              placeholder="Jméno autora"
              id="author"
              onChange={this.handleChange('author')}
              onKeyPress={ev => ev.key === ENTER && onSearch(value)}
              autoComplete="off"
              value={value.author}
              variant="filled"
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl
            margin="normal"
            fullWidth
          >
            <Button variant="contained" color="primary" fullWidth>Vyhledat</Button>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
};

export default SearchInput;
