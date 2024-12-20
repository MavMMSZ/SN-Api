import { Router } from 'express';

const router = Router();

import {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../../controllers/userController.js';

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userID').get(getUserById).delete(deleteUser);

router.route('/:userID/friends').post(addFriend);

router.route('/:userID/friends/:friendID').delete(removeFriend);

export { router as userRouter };