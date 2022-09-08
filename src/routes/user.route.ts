import {Router} from 'express';
import {
  addUser,
  getAllUsers,
  getUser,
  deleteUser,
} from '../controllers/user.controller';
import {getPublicKey} from '../middlewares/getPublicKey';
import {getUserValidator} from '../validators/user.validator';

const router = Router();

router.post('/add', getPublicKey, addUser);
router.get('/getAll', getAllUsers);
router.get('/get/:publicKey', getUserValidator, getUser);
router.post('/delete', getPublicKey, deleteUser);

export default router;
