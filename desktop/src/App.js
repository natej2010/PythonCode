import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Home from './components/Home'
import Collection from './components/Colllection'
import Game from './components/Game'
import AppBar from './components/AppBar'
import Login from './components/Login'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },

});


class App extends React.Component {
    state = {
        current_user: '',
        selected_games: new Set()
    };

    componentWillMount() {
        for (let key in  this.state) {
            if (localStorage.hasOwnProperty(key)) {
                let value = localStorage.getItem(key);

                try {
                    value = JSON.parse(value);

                    if (key === "selected_games") {
                        let selected_games = new Set(value);
                        this.setState({selected_games})
                    }
                    else {
                        this.setState({[key]: value});
                    }
                } catch(e) {
                    this.setState({ [key]: value });
                }
            }
        }
    }

    set_current_user(current_user) {
        this.setState({ current_user });
        localStorage.setItem("current_user", JSON.stringify(current_user))
    }

    addToSelection(tile) {
        console.log(`Adding Game To Selection ${tile.name}`);
        let selected_games = this.state.selected_games.add(tile.id);

        this.setState({ selected_games },
            () => {
            console.log(this.state.selected_games);
            localStorage.setItem("selected_games", JSON.stringify(Array.from(this.state.selected_games.values())))
        });
    }

    removeFromSelection = (tile) => {
        console.log(`Removing Game From Selection ${tile.name}`);
        let selected_games = new Set(this.state.selected_games.values());
        selected_games.delete(tile.id);
        this.setState({ selected_games },
            () => {
            console.log(this.state.selected_games);
            localStorage.setItem("selected_games", JSON.stringify(Array.from(this.state.selected_games.values())))
        });
    };

    render() {
        this.set_current_user = this.set_current_user.bind(this);
        this.addToSelection = this.addToSelection.bind(this);
        this.removeFromSelection = this.removeFromSelection.bind(this);

        return (
            <BrowserRouter>
                <AppBar />
                <Route exact path="/" render={(props) => <Home {...props} current_user={this.state.current_user}/>}/>
                <Route path="/login" render={(props) => <Login {...props} set_current_user={this.set_current_user}/>}/>
                <Route exact path="/collection" render={(props) => <Collection {...props} user={this.state.current_user}
                addToSelection={this.addToSelection} removeFromSelection={this.removeFromSelection} selected_games={this.state.selected_games}/>} />
                <Route path="/collection/:username" component={Collection} />
                <Route path="/game/:game" component={Game} />
            </BrowserRouter>
        )
    }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
