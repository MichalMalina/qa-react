import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component {
    render() {

        const v = this.props.id;
        const question = this.props.getQuestion(this.props.id);
        let content = <p>Loading</p>;
        if (question) {
            content =
                <>
                    <div>
                        <h1>{question.ques}</h1>
                        <h3>Answers:</h3>
                        <ul>
                            {question.answ.map(a =>  <li key={a.text}>{a.text} </li> )}
                        </ul>
                        <h5><PostAnswer id={v} postAnswer={(id, text) => this.props.postAnswer(id, text)}/></h5>
                        <Link to="/">Back</Link>
                    </div>
                </>
        }
            return content;
        }
}
export default Question;