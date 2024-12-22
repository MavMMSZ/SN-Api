import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from '../models/index.js';


export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userID);
        res.json(user);
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
        const user = await User.findByIdAndDelete(req.params.userID);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userID, { $push: { friends: req.params.friendID } }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userID, { $pull: { friends: req.params.friendID } }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

