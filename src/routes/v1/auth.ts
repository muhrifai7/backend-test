import { Router } from 'express';

import { login, register, changePassword } from '../../controllers/auth';
import { checkJwt } from '../../middleware/checkJwt';
import { validatorLogin, validatorRegister, validatorChangePassword } from '../../middleware/validation/auth';

const router = Router();

router.post('/signin', [validatorLogin], login);
router.post('/signup', [validatorRegister], register);
router.post('/change-password', [checkJwt, validatorChangePassword], changePassword);

export default router;