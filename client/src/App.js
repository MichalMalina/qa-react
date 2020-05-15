import React, {Component} from 'react';
import logo from './logo.svg';
import Questions from "./Questions";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import './App.css';
import { Link, Router } from "@reach/router"

class App extends Component {

    API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
      this.getData();
  }

 async getData() {
    const url = `${this.API_URL}/questions/`;
      const response = await fetch(url);
      const data = await response.json();
      return this.setState({ questions:data} )
  }

  async postData() {
      const url = `${this.API_URL}/questions/`;
      const response = await fetch(url);
      const data = await response.json();
  }

   async NewQuestion(ques) {
       const request = {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({ques: ques , answ:[]})
       };
       const response = await fetch(`${this.API_URL}/questions/`, request);
       const data = await response.json();
       this.getData();
       console.log(data);
   }

    async postAnswer(id, text) {
        console.log("postAnswer", id, text);
        const url = `${this.API_URL}/questions/${id}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: text, vote : 0})
        });
        const data = await response.json();
        this.getData();
        console.log("Printing the response:", data);
    }

    /*
    async postVote(id, vote) {
        console.log("postVote", id, vote);
        const url = `${this.API_URL}/questions/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({vote: vote})
        });
        const data = await response.json();
        this.getData();
        console.log("Printing the response:", data);
    }
    */

    getQuestion(id) {
        //  const findFunction = question => question.id === parseInt(id);
        // return this.state.questions.find(findFunction);
        return this.state.questions.find(k => k._id === id);
    }

    render() {
        const container = {
            color: "white",
            backgroundColor: "#7FDBFF",
            padding: "20px 20px",
            fontFamily: "Arial"
        };
        const bold = {
            fontWeight:"bold"
        };
        return (
         <>
             <div style={container}>
              <Router>
                 <NewQuestion path="/new" NewQuestion={(ques) => this.NewQuestion(ques)} data={this.state.questions}  />
                  <Questions path="/" data={this.state.questions} changeDone={index => this.changeDone(index)}></Questions>
                  <Question path="/question/:id" data={this.state.questions} postAnswer={(id, text) => this.postAnswer(id, text)} getQuestion={id =>this.getQuestion(id)}></Question>
             </Router>
             <p style={bold}>(Trivia) Amount of Questions so far {this.state.questions.length}.</p>
             </div>
         </>
                );
            }
}
export default App;
