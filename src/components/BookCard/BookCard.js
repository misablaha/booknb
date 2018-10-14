import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const styles = {
  card: {
    height: 110,
    display: 'flex',
  },
  cover: {
    width: 70,
    minWidth: 70,
  },
  inside: {
    flex: '1 0 auto',
  },
  content: {},
};

const BookCard = (props) => {
  const {
    classes,
    code,
    title,
    subtitle,
    author,
    publisher,
    publishedDate,
    onClick,
  } = props;

  return (
    <Card className={classes.card} onClick={onClick}>
      <CardMedia
        className={classes.cover}
        image={`http://localhost:8080/cover/${code}`}
        title={title}
      />
      <CardActionArea className={classes.inside}>
        <CardContent className={classes.content}>
          <Typography variant="title">{title}</Typography>
          <Typography variant="subheading" color="textSecondary">{subtitle}</Typography>
          {author && (
            <Typography variant="caption" color="textSecondary">{`Autor: ${author}`}</Typography>
          )}
          {(publisher || publishedDate) && (
            <Typography variant="caption" color="textSecondary">{`Vydáno: ${publisher} ${publishedDate}`}</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

BookCard.propTypes = {
  code: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  author: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

export default withStyles(styles)(BookCard);
