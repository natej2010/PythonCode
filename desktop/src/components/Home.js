import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, withStyles} from "@material-ui/core";
import {Link, Redirect} from 'react-router-dom'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: {
    marginTop: 100
  },
  image: {
    marginRight: 20,
    marginTop: 100
  }
});


class Home extends React.Component {
  state = {
    username: '',
    collection: []
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  callbackUserCollection = (collection) => {
      this.setState({ collection: collection });
      console.log(this.state.collection);
  };

  render() {
    const { classes } = this.props;

    if(!this.props.current_user) {
            return <Redirect to="/login" />;
    }

    return (
        <div className={classes.root}>
          <img className={classes.image} src={require('./home_image.jpg')} alt="Welcome to Game Night Wizard!" />
          <Typography component="h2" variant="h1" gutterBottom>
            {`Welcome to Board Game Wizards ${this.props.current_user}`}
          </Typography>
          <Button component={Link} to={`/collection`}
                    variant="contained" color="default">
                  My Collection
            </Button>
        </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
