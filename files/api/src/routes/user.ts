import { Router } from "express";
import { login } from "../controllers/auth/login";
import { signup } from "../controllers/auth/signup";
import { activateUser } from "../controllers/auth/activate";
import { changePassword } from "../controllers/auth/changePassword";
import { recoverPassword } from "../controllers/auth/recoverPassword";
import { changeEmail } from "../controllers/auth/updateEmail";
import { changeUsername } from "../controllers/auth/updateUsername";
import { changeSurname } from "../controllers/auth/updateSurname";
import { changeName } from "../controllers/auth/updateName";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/activate", activateUser);
router.post("/password", changePassword);
router.post("/email", changeEmail);
router.post("/username", changeUsername);
router.post("/surname", changeSurname);
router.post("/name", changeName);
router.post("/recovery", recoverPassword);

export default router;
