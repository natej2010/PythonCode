import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import React from 'react';

const styles = {
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        background: 'red',
        color: 'white'
    },
};

class GetCollectionButton extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Button className={classes.menuButton} component={Link} to={`/collection/${this.props.username}`}
                    variant="contained" color="default" disabled={!this.props.username}>
                Get Collection
            </Button>
        );
    }
}

export default withStyles(styles)(GetCollectionButton);