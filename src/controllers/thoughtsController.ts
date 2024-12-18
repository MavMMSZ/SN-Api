import { Request, Response } from "express";
import { Thought } from "../models/index";

export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: "Thought not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createThought = async (req: Request, res: Response) => {
  const { thought } = req.body;
  try {
    const newThought = await Thought.create({
      thought,
    });
    res.status(201).json(newThought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const { thought } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, {
      thought,
    });
    res.json(updatedThought);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    await Thought.findByIdAndDelete(thoughtId);
    res.json("Thought deleted");
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addReaction = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const { reaction } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $push: {
          reactions: reaction,
        },
      },
      { new: true }
    );
    res.json(updatedThought);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $pull: {
          reactions: { reactionId },
        },
      },
      { new: true }
    );
    res.json(updatedThought);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};