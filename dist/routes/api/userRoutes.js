import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, createUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';
// /api/users
router.route('/').get(getAllUsers).post(createUser);
// /api/users/:userID
router.route('/:userID').get(getUserById).delete(deleteUser);
// /api/users/:userID/friends
router.route('/:userID/friends').post(addFriend);
// /api/users/:userID/friends/:friendID
router.route('/:userID/friends/:friendID').delete(removeFriend);
export { router as userRouter };
