import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import GetCollectionButton from './GetCollectionButton'

const axios = require('axios');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        background: 'red',
        color: 'white'
    },
    textField: {
        marginLeft: -12,
        marginRight: 20,
        marginTop: 10
      },
      
      multilineColor: {
        background: 'white',
        color: 'black'
      }
});

class ButtonAppBar extends Component {
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

    // Start a game
    startGame() {
        console.log(this.state.username);
        axios.get(`http://localhost:8080/create?host=${this.state.username}`);
    }

    // Join a Game
    joinGame() {
        // TODO: Need to fill out this method
    }

    // Render the AppBar
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="white" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Game Night Wizard
                        </Typography>
                        <TextField
                            id="standard-name"
                            placeholder="BGG Username"
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            className={classNames(classes.textField)}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    input: classes.multilineColor
                                }
                            }}
                            
                        />
                        <GetCollectionButton username={this.state.username}
                                             collectionCallback={this.callbackUserCollection}/>
                        <Button className={classes.menuButton} onClick={this.startGame.bind(this)} variant="contained" color="red" >Start Game Night</Button>
                    
                        <Button className={classes.menuButton} onClick={this.joinGame.bind(this)} variant="contained" color="red" >Join Game Night</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);