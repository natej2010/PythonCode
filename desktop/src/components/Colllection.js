import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import GameModal from './GameModal'
import Checkboxes from './Checkboxes'

const axios = require('axios');

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class Collection extends React.Component {
    state = {
        username: '',
        collection: [],
        modal_open: false,
        active_tile: null
    };

    infoButton(tile) {
        console.log(tile.id);
        console.log(tile.name);
        this.setState({active_tile: tile, modal_open: true});
    }

    closeModalCallback = () => {
        this.setState({modal_open: false})
    };

    getUserCollection(username) {
        axios.get(`http://localhost:8080/collection/${username}`)
            .then(res => res.data)
            .then(data => this.setState({collection: data}));
    }

    set_username(username) {
        this.setState({ username })
    }

    render() {
        let username = '';
        if (this.props.location.pathname === "/collection" && this.props.user) {
            username = this.props.user
        } else if (this.props.match.params.username) {
            username = this.props.match.params.username;
        }

        this.getUserCollection(username);

        const { classes } = this.props;
        if (this.props.match.params.username) {
            this.getUserCollection(this.props.match.params.username);
        }
        return (
            <div>
                <GridList cellHeight={500}>
                    <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                        <ListSubheader component="div">{username}'s Collection</ListSubheader>
                    </GridListTile >
                    {this.state.collection.map(tile => (
                        <GridListTile key={tile.id}>
                            <img src={tile.image} alt={tile.thumbnail}/>
                            <GridListTileBar
                                title={tile.title}
                                titlePosition="top"
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <Checkboxes
                                            tile={tile}
                                            addToSelection={this.props.addToSelection}
                                            removeFromSelection={this.props.removeFromSelection}
                                            shouldBeChecked={this.props.selected_games.has(tile.id)}
                                        />
                                    </IconButton>
                                }
                                actionPosition="left"
                                className={classes.titleBar}
                            />
                            <GridListTileBar
                                title={tile.name}
                                subtitle={<span>Plays: {tile.numplays}</span>}
                                actionIcon={
                                    <IconButton onClick={this.infoButton.bind(this, tile)}>
                                        <InfoIcon/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
                <GameModal open_modal={this.state.modal_open} close_modal={this.closeModalCallback} tile={this.state.active_tile}/>
            </div>
        );
    }
}

export default withStyles(styles)(Collection);