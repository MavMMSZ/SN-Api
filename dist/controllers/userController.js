import { User } from '../models/index.js';
// export const headCount = async () => {
//     try {
//         const numberOfUsers = await User.aggregate().count('userCount');
//         return numberOfUsers;
//     } catch (err) {
//         console.error(err);
//         return 0; // or any default value
//     }
// }
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userID });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userID }, { $set: req.body }, { new: true, runValidators: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userID });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json({ message: 'User and associated thoughts deleted!' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
export const addFriend = async (req, res) => {
    console.log('Adding a friend');
    console.log(req.params);
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userID }, { $addToSet: { friends: req.body.frie } }, { new: true });
        if (!user) {
            res
                .status(404)
                .json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userID }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res
                .status(404)
                .json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
