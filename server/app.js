/**** External libraries ****/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

/**** Configuration ****/
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

const questionDB = require('./question_db')(mongoose);

/**** Some test data ****/
/*
const data = [
    {id:1,ques:"Is hentai safe to watch ?",answ: ["Absolutely","Believe it Fucking Believe it!"]},
    {id:2,ques: "Do people die if they are killed?" , answ: ["Sometimes"  , "Its debatable"]}
];
data[0].answ[0].votes++; // question 0, answer 0
data[0].answ[1].votes++; // question 0, answer 1
data[1].answ[1].votes++; // question 1, answer 1
console.log(data[0].answ[0]);
const data = [
    {id:1,ques:"Is hentai safe to watch ?", answ: [
            {text: "Absolutely", votes: 0},
            {text: "Believe it Fucking Believe it!", votes: 0}]
    }
];
*/

    /**** Routes ****/
    app.get('/api/questions', async (req, res) =>
    {
        const questions = await questionDB.getQuestions();
        res.json(questions);
    });

    app.get('/api/questions/:id', async (req, res) => {
        let id = req.params.id;
        const question = await questionDB.getQuestion(id);
        res.json(question);
    });

    app.post('/api/questions', async (req, res) => {

        let Question = {
            ques: req.body.ques,
            answ: []
        };
      const newQuestion = await questionDB.createQuestion(Question)
        res.json(newQuestion);
    });

    app.post('/api/questions/:id', async (req, res) => {
        const id = req.params.id;

       // const answer = req.body.answ.text;
      const answer =  {text: req.body.text , vote: req.body.vote};
        const updateQuestion = await questionDB.addAnswer(id , answer);
        res.json(updateQuestion);
    });

    app.put('api/question/:id' , async (req, res, next) => {
        this.questionModel.findByIdAndUpdate(req.params.id, {
            $set: req.body.vote
        }, (error, data) => {
            if (error) {
                return next(error);
                console.log(error);
            } else {
                res.json(data)
                console.log('Answer voted for successfully !')
            }
        })
    });
/*
app.post('/api/questions', (req, res) => {
        const id = req.param.id;
        const title = req.body.ques;
        const desc = req.body.answ.text;
        const nbm = Math.random()
        const newQuestion = {
            id: id,
            ques: title,
            answ: [{text: desc} , {vote:2}]
        };
        data.push(newQuestion);
        res.json({msg: "Recipe added", newQuestion: newQuestion});
    });

    app.post('/api/recipes/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const text = req.body.text;
        const ques = data.find(q => q.id === id);
        ques.answ.push(text);
        console.log(ques);
        res.json({msg: "Answer added", ques: ques});
    });
*/
    /* const id = req.params.id;
    const recipe = data.find(e => e.id === parseInt(id));
    recipe.answ = req.body.answ;
    recipe.ques = req.body.ques;
    res.json(recipe)*/

app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);



/**** Start! ****/
//app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
const url = process.env.MONGO_URL || 'mongodb://localhost/question_db';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
      //  await questionDB.bootstrap(); // Fill in test data if needed.
        await app.listen(port); // Start the API
        console.log(`Question API running on port ${port}!`);
    })
    .catch(error => console.error(error));