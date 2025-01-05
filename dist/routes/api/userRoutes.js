import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, createUser, deleteUser, updateUser, addFriend, removeFriend } from '../../controllers/userController.js';
// /api/users
router.route('/').get(getAllUsers).post(createUser);
// /api/users/:userID
router.route('/:userID').get(getUserById).delete(deleteUser);
// /api/users/:userID/friends
router
    .route('/:userid')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router.route('/:userID/friends/:friendId').post(addFriend).delete(removeFriend);
export default router;
