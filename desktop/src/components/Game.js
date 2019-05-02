import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Image from 'material-ui-image'



const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },

});


class Game extends React.Component {

    render() {
        //const {classes} = this.props;

        return (
            <div>
                <div>
                    <Image src={this.props.location.state.game_details.image} />
                    <Typography variant="title" id="simple-modal-description">
                         { this.props.match.params.game }
                    </Typography>
                    <Typography variant="subtitle1" id="simple-modal-description">
                        { this.props.location.state.game_details.description }
                    </Typography>
                </div>
            </div>

        );
    }
}

Game.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);