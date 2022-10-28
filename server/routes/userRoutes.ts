import { Router } from 'express';
import { register, login, setAvatar, getAllUsers } from '../controllers/userController';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/setAvatar/:id', setAvatar);

router.get('/allUsers/:id', getAllUsers);

export default router;
