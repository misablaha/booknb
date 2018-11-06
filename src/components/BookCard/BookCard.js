import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Relations from './Relations';

import { bookPropTypes, relationPropTypes } from '../propTypes';

const styles = {
  card: {
    height: 110,
    display: 'flex',
  },
  inside: {
    // flex: '1 0 auto',
    display: 'flex',
  },
  cover: {
    width: 70,
    minWidth: 70,
    height: '100%'
  },
  content: {
    flex: '1 0 auto',
  },
  relationSet: {
    flex: '0',
    display: 'flex',
    flexDirection: 'column',
  },
};

const BookCard = (props) => {
  const { classes, book, onClick, relations } = props;
  const { title, subtitle, author, publications } = book;

  const { code } = publications[0];

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.inside}
        component="div"
        onClick={onClick}
      >
        <CardMedia
          className={classes.cover}
          image={`/cover/${code}`}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{subtitle}</Typography>
          {author && (
            <Typography variant="caption" color="textSecondary">{`Autor: ${author}`}</Typography>
          )}
        </CardContent>
      </CardActionArea>
      <div className={classes.relationSet}>
        <Relations relations={relations}/>
      </div>
    </Card>
  );
}

BookCard.propTypes = {
  classes: PropTypes.object.isRequired,
  book: PropTypes.shape(bookPropTypes).isRequired,
  relations: PropTypes.arrayOf(PropTypes.shape(relationPropTypes)),
  onClick: PropTypes.func,
};

BookCard.defaultProps = {
  relations: [],
};

export default withStyles(styles)(BookCard);
