import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import GoogleLoginButton from '../components/LoginButton/GoogleLoginButton';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    maxWidth: 400,
  },
  caption: {
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
});

class LoginScreen extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h4">BooknB</Typography>
            <Typography gutterBottom variant="h6">
              Pro Mikulášské gymnázium v Plzni.
            </Typography>
            <Typography gutterBottom variant="body1">
              Webísek pro sdílení informací o knížkách v knihovně a jejich půjčování.
            </Typography>
          </CardContent>
          <Typography className={classes.caption} variant="caption">přihlásit se pomocí</Typography>
          <CardActions className={classes.actions} disableActionSpacing>
            <GoogleLoginButton href="/auth/google"/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

LoginScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginScreen);
