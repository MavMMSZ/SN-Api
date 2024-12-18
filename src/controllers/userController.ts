import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from '../models/index.js';


export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await
            User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User
            .findByIdAndDelete(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { user } = req.body;
        const updatedUser = await User
            .findByIdAndUpdate(userId, {
                user
            });
        res.json(updatedUser);
    }
    catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const addFriend = async (req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;
        const updatedUser = await User
            .findByIdAndUpdate(userId, {
                $push: {
                    friends: new ObjectId(friendId)
                }
            });
        res.json(updatedUser);
    }
    catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;
        const updatedUser = await User
            .findByIdAndUpdate(userId, {
                $pull: {
                    friends: new ObjectId(friendId)
                }
            });
        res.json(updatedUser);
    }
    catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}