import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';



export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }  catch (err) {
        res.status(500).json(err);
    }
} 

export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtID } = req.params;
    try {
        const user = await Thought.findById(thoughtID);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'No thought found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    } 
}

export const createThought = async (req: Request, res: Response) => {
    const { thought } = req.body;
    try {
        const newThought = await Thought.create({ thought });
        res.json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtID });

        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        } else {
            // No associated users to delete
            res.json({ message: 'Thought and associated users deleted!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const addReaction = async (req: Request, res: Response) => {
    console.log('adding a reaction');
    console.log(req.body);
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
}