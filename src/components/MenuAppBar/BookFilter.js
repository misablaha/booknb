import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { bookFilter } from '../../actions/filter';
import { filterSelector } from '../../selectors/filter';
import { OFFER, REQUIRE, SUGGEST } from '../../actions/add';
import FilterOption from './FilterOption';
import Typography from '@material-ui/core/Typography/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuList from '@material-ui/core/MenuList';

const BookFilter = (props) => {
  const { checked, onFilterChange } = props;
  const handleChange = name => event => {
    onFilterChange(name, event.target.checked);
  };

  return (
    <Typography noWrap variant="body1">
      <MenuList
        subheader={<ListSubheader component="div">Zobrazit pouze</ListSubheader>}
      >
        <FilterOption
          checked={checked[SUGGEST]}
          onChange={handleChange(SUGGEST)}
          variant={SUGGEST}
        />
        <FilterOption
          checked={checked[REQUIRE]}
          onChange={handleChange(REQUIRE)}
          variant={REQUIRE}
        />
        <FilterOption
          checked={checked[OFFER]}
          onChange={handleChange(OFFER)}
          variant={OFFER}
        />
      </MenuList>
    </Typography>
  );
};

const mapStateToProps = (state) => ({
  checked: filterSelector(state),
});

const mapDispatchToProps = {
  onFilterChange: bookFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookFilter);
