class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {

        const questionSchema = new mongoose.Schema({
            ques: String,
            answ: [{text:String , vote:Number}]
        });
        this.questionModel = mongoose.model('question', questionSchema);

    }

    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        // TODO: Error handling
        let question = new this.questionModel(newQuestion);
        return await question.save();
    }

    async addAnswer(questionId, answer ) {
        // TODO: Error handling
        const question = await this.getQuestion(questionId);


        question.answ.push(answer);
        return await question.save();
    }

    async addVote (voteId , vote) {
        const answer = await this.getAnswer(voteId);
        question.answ.vote.push(vote);
        return await answer.save();
    }

    async getAnswer(id) {
        try {
            return await this.questionModel.answ.findById(id);
        } catch (error) {
            console.error("getVote:", error.message);
            return {};
        }
    }


    /**
     Function to create question if needed
     */
    /*
    async bootstrap(count = 10) {
        const q1 = new this.questionModel({
            ques: "bam",
            answ: [{text:"ddddddd" , vote:2}]
        });

        // Let's save it.
        try {
            let savedQ1 = await q1.save();

            console.log("Questions saved.", savedQ1);
        } catch(error) { // Error handling in case it doesn't save
            console.error(error);
        }
    }
    */
}


module.exports = mongoose => new Db(mongoose);