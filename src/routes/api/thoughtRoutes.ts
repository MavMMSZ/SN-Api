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

router.route('/').get(getAllThoughts).post(createThought);

router
    .route('/:thoughtID')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtID/reactions').post(addReaction);

router.route('/:thoughtID/reactions/:reactionID').delete(removeReaction);

export { router as thoughtRouter };