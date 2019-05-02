import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

const axios = require('axios');

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class GameModal extends React.Component {
    state = {
        open: false,
        name: '',
        game_details: null
    };

    handleClose = () => {
        this.props.close_modal();
    };

    getGameDetails(id) {
        axios.get(`http://0.0.0.0:8080//game_details/${id}`)
            .then(res => res.data)
            .then(data => this.setState({game_details: data}));
    }


    render() {
        const {classes} = this.props;

        if (this.props.tile) {
            this.getGameDetails(this.props.tile.id)
        }

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open_modal}
                onClose={this.handleClose.bind(this)}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="h6" id="modal-title">
                      {(this.props.tile) ? this.props.tile.name : ''}
                    </Typography>
                    <Typography variant="subtitle1" id="simple-modal-description">
                        {(this.state.game_details) ? `${ this.state.game_details.description.substring(0,500) }...`  : ''}
                    </Typography>
                    <Button component={Link} to={
                        {pathname: `/game/${(this.props.tile) ? this.props.tile.name : ''}`,
                            state: {game_details: this.state.game_details}}}
                    variant="contained" color="default">
                        Details
                    </Button>
                    <SimpleModalWrapped/>
                </div>
            </Modal>
        );
    }
}

GameModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(GameModal);

export default SimpleModalWrapped;