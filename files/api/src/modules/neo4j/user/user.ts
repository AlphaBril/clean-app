import { Router } from "express";

import { activateUser } from "./handlers/activate";
import { changePassword } from "./handlers/changePassword";
import { recoverPassword } from "./handlers/recoverPassword";
import { signup } from "./handlers/signup";
import { updateUserInfo } from "./handlers/updateUser";
import { getUserInfo } from "./handlers/getUserInfo";

import { validateActivate } from "./validators/validateActivate";
import { validateChange } from "./validators/validateChange";
import { validateRecover } from "./validators/validateRecover";
import { validateSignup } from "./validators/validateSignup";
import { validateUpdate } from "./validators/validateUpdate";
import { validateToken } from "../auth/validators/validateToken";

const router = Router();

router.get("/", validateToken(), getUserInfo);
router.post("/activate", validateActivate(), activateUser);
router.post("/password", validateToken(), validateChange(), changePassword);
router.post("/recovery", validateRecover(), recoverPassword);
router.post("/signup", validateSignup(), signup);
router.post("/update", validateToken(), validateUpdate(), updateUserInfo);

export default router;
