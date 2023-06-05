const { User } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try{
            const user = await User.find();
            res.status(200).json(user);
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    // get one user
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId }).select('thoughts friends');
            if(user){
                res.status(200).json(user);
            } else{
                res.status(404).json({ message: 'No user found' });
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    // create a user
    
    async createUser(req, res) {
    // example req.body:
    // {
    //     "username": "lernantino",
    //     "email": "lernantino@gmail.com"
    // }
        try{
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update a user

    async updateUser(req, res) {
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(user){
                res.status(200).json(user);
            } else{
                res.status(404).json({ message: 'No user found' });
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    // delete user

    async deleteUser(req, res) {
        try{
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if(user){
                res.status(200).json(user);
            } else{
                res.status(404).json({ message: 'No user found' });
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Add friend to user

    async addFriend(req, res){
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } }
            );
            if(user){
                res.status(200).json(user);
            } else{
                res.status(404).json({ message: 'No user found' });
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    // remove friend from user

    async removeFriend(req, res){
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } }
            );
            if(user){
                res.status(200).json(user);
            } else{
                res.status(404).json({ message: 'No user found' } )
            }
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }
}