import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

export const headCount = async () => {
    try {
        const numberOfUsers = await User.aggregate().count('userCount');
        return numberOfUsers;
    } catch (err) {
        console.error(err);
        return 0; // or any default value
    }
}

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        const userObj = {
            users,
            headCount: await headCount(),
        }

        res.json(userObj);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userID } = req.params;
    try {
        const user = await User.findById(userID);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'No user found with this id!' });
        } 
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userID });

        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        const thought = await Thought.findOneAndUpdate(
            { users: req.params.userID },
            { $pull: { users: req.params.userID } },
            { new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought found with this user id!' });
            return;
        }

        res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const addFriend = async (req: Request, res: Response) => {
    console.log('Adding a friend');
    console.log(req.params);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userID },
            { $addToSet: { friends: req.body } },
            { new: true }
        )

        if (!user) {
            res
                .status(404)
                .json({ message: 'No user found with this id!' });
            return;
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userID },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        );

        if (!user) {
            res
                .status(404)
                .json({ message: 'No user found with this id!' });
            return;
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

