import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const styles = theme => ({
  card: {
    height: 110,
    display: 'flex',
    margin: theme.spacing.unit * 2,
  },
  cover: {
    width: 70,
  },
  inside: {
    flex: '1 0 auto',
  },
  content: {},
});

function BookCard(props) {
  const {
    classes,
    code,
    title,
    subtitle,
    author,
    publisher,
    publishedDate,
  } = props;

  /*
    {
      "code": "NBN:cnb000518802",
      "title": "Čuk a Gek",
      "subtitle": "",
      "author": "Arkadij Gajdar [pseud.",
      "participants": [
        "z rus. pův. vyd. přel. Olga Ptáčková-Macháčková",
        "barev.] il. Olga Pavalová"
      ],
      "publisher": "Praha : SNDK,",
      "publishedDate": "1962",
    }
   */

  return (
    <Card className={classes.card}>
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
};

export default withStyles(styles)(BookCard);
