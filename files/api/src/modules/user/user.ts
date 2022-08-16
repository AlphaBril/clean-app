import { Router } from 'express';
import { login } from './handlers/login';
import { signup } from './handlers/signup';
import { activateUser } from './handlers/activate';
import { changePassword } from './handlers/changePassword';
import { recoverPassword } from './handlers/recoverPassword';
import { updateUserInfo } from './handlers/updateUser';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/activate', activateUser);
router.post('/password', changePassword);
router.post('/update', updateUserInfo)
router.post('/recovery', recoverPassword);

export default router;