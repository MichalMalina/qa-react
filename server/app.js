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

    /**** API Routes ****/

    /** Get all questions **/
    app.get('/api/questions', async (req, res) =>
    {
        const questions = await questionDB.getQuestions();
        res.json(questions);
    });

    /** Get question by id **/
    app.get('/api/questions/:id', async (req, res) => {
        let id = req.params.id;
        const question = await questionDB.getQuestion(id);
        res.json(question);
    });

    /** Post new question **/
    app.post('/api/questions', async (req, res) => {
        let Question = {
            ques: req.body.ques,
            answ: []
        };
      const newQuestion = await questionDB.createQuestion(Question)
        res.json(newQuestion);
    });

    /** Post new answer **/
    app.post('/api/questions/:id', async (req, res) => {
        const id = req.params.id;
        const answer =  {text: req.body.text , vote: req.body.vote};
        const updateQuestion = await questionDB.addAnswer(id , answer);
        res.json(updateQuestion);
    });

    /** add vote - not working **/
    app.put('api/question/:id' , async (req, res, next) => {
        this.questionModel.answ.findByIdAndUpdate(req.params.id, {
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

    app.get('*', (req, res) =>
        res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
    );

    /**** Start! ****/
    const url = process.env.MONGO_URL || 'mongodb://localhost/question_db';
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(async () => {
          //  await questionDB.bootstrap(); // Fill in test data if needed.
            await app.listen(port); // Start the API
            console.log(`Question API running on port ${port}!`);
        })
        .catch(error => console.error(error));