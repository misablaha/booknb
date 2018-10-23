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

/*
{
  "id": "3cbe1ed9a1e62494d15cd4ba6e6e0126",
  "title": "Ferda Mravenec",
  "subtitle": "",
  "author": "Ondřej Sekora",
  "publications": [
    {
      "code": "ISBN:80-00-00258-2",
      "publisher": "Praha : Albatros,",
      "publishedDate": "1992"
    }
  ]
}
 */

const BookCard = (props) => {
  const {
    classes,
    title,
    subtitle,
    author,
    publications,
    onClick,
  } = props;

  const { code } = publications[0];

  return (
    <Card className={classes.card} onClick={onClick}>
      <CardMedia
        className={classes.cover}
        image={`/cover/${code}`}
        title={title}
      />
      <CardActionArea className={classes.inside}>
        <CardContent className={classes.content}>
          <Typography variant="title">{title}</Typography>
          <Typography variant="subheading" color="textSecondary">{subtitle}</Typography>
          {author && (
            <Typography variant="caption" color="textSecondary">{`Autor: ${author}`}</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

BookCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  author: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.string),
  publications: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
  })),
  relations: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
  })),
  onClick: PropTypes.func,
};

export default withStyles(styles)(BookCard);
