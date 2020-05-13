import React, {Component} from 'react';
import {Link} from "@reach/router";

class Questions extends Component {

    render() {
        const qlist = this.props.data.map((items) => (
             <li>
                 <Link key={items._id} to={`/question/${items._id}`}> {items.ques}</Link>
             </li>
            )
        );
        return (
            <>
                <h3>Q&A Website</h3>
                <ol>
                    {qlist}
                </ol>
                <Link to="/new">Add Question</Link>
            </>
        );
    }
}
export default Questions;