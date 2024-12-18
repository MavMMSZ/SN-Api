import { Router } from "express";
const router = Router();
import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} from "../../controllers/thoughtsController.js";

router.route("/").get(getAllThoughts).post(createThought);

router
    .route("/:thoughtId")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

export { router as thoughtRouter };