const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try{
            const thought = await Thought.find();
            res.status(200).json(thought);
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try{
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if(thought){
                res.status(200).json(thought);
            } else{
                res.status(404).json({ message: 'No thought found' });
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try{
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } }
            );
            if(user){
                res.status(200).json(thought);
            } else{
                res.status(404).json({ message: 'No user found' });
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(thought){
                res.status(200).json(thought);
            } else{
                res.status(404).json({ message: 'No thought found' });
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try{
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if(thought){
                res.status(200).json(thought);
            } else{
                res.status(404).json({ message: 'No thought found' });
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    async postReaction(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true}
            );
            if(thought){
                res.status(200).json(thought);
            } else{
                res.status(404).json({ message: 'No thought found' });
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.body.reactionId } },
                { new: true }
            );
            if(thought){
                res.status(200).json(thought);
            } else{
                res.status(404).json({ message: 'No thought found' });
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }
}