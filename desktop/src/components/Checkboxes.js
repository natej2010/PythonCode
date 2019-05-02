import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class Checkboxes extends React.Component {
    state = {
        checked: this.props.shouldBeChecked
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
        if (!this.state.checked) {
            this.props.addToSelection(this.props.tile);
        } else {
            this.props.removeFromSelection(this.props.tile)
        }
    };

    render() {
        return (
            <div>
                <Checkbox
                    checked={this.state.checked}
                    onChange={this.handleChange('checked').bind(this)}
                    value="checkedB"
                />
            </div>
        );
    }
}

export default Checkboxes;