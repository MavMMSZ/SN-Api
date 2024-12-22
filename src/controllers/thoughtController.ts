import { Request, Response } from 'express';
import { Thought } from '../models/index.js';



export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtID);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtID, req.body, { new: true });
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtID);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtID, { $push: { reactions: req.body } }, { new: true });
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtID, { $pull: { reactions: { reactionID: req.params.reactionID } } }, { new: true });
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}