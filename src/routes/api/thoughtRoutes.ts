import { Router } from 'express';
const router = Router();

import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtID
router
    .route('/:thoughtID')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtID/reactions
router.route('/:thoughtID/reactions').post(addReaction);

// /api/thoughts/:thoughtID/reactions/:reactionID
router.route('/:thoughtID/reactions/:reactionID').delete(removeReaction);

export { router as thoughtRouter };