import React, {Component} from 'react';
import {Link} from "@reach/router";

class NewQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
            count: 2
        };
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleButtonClick(event) {
        this.props.NewQuestion(this.state.input);
    }

    render() {
        return (
            <>
                <input type="text" placeholder="Some Question"
                       onChange={(event) => this.handleChange(event)}/>
                <button onClick={(event) => this.handleButtonClick(event)}>Add a Question</button>
                <br></br>
                <br></br>
                <Link to="/">Back</Link>
            </>
        );
    }

}
export default NewQuestion;