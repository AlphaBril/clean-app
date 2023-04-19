import { Router } from "express";

import { activateUser } from "./handlers/activate";
import { changePassword } from "./handlers/changePassword";
import { login } from "./handlers/login";
import { recoverPassword } from "./handlers/recoverPassword";
import { signup } from "./handlers/signup";
import { updateUserInfo } from "./handlers/updateUser";

import { validateActivate } from "./validators/validateActivate";
import { validateChange } from "./validators/validateChange";
import { validateLogin } from "./validators/validateLogin";
import { validateRecover } from "./validators/validateRecover";
import { validateSignup } from "./validators/validateSignup";
import { validateUpdate } from "./validators/validateUpdate";

const router = Router();

router.post("/activate", validateActivate, activateUser);
router.post("/password", validateChange, changePassword);
router.post("/login", validateLogin, login);
router.post("/recovery", validateRecover, recoverPassword);
router.post("/signup", validateSignup, signup);
router.post("/update", validateUpdate, updateUserInfo);

export default router;
