import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';


const styles = theme => ({
    input: {
        display: 'none',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    menuButton: {
        margin: theme.spacing.unit,
        background: 'red',
        color: 'white'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit
    },
    menu: {
        width: 200,
    }
});

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        redirect: false
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleClick() {
        console.log(this.state.username);
        this.props.set_current_user(this.state.username);
        this.props.history.push("/");
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <h1>Before the fun can begin, first you must login...</h1>
                <TextField
                id="username"
                label="Username"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange("username")}
                margin="normal"
                variant="outlined"/>
                <div></div>
                <TextField
                id="password"
                label="Password"
                type="password"
                align="left center"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange("password")}
                margin="normal"
                variant="outlined"/>
                <div></div>
                <Button variant="contained" className={classes.menuButton} onClick={this.handleClick.bind(this)}>
                    Login
                </Button> 
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login)