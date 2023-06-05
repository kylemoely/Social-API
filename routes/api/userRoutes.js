const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userid').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userid/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;