import { Router } from "express";

import { login } from "./handlers/login";
import { refresh } from "./handlers/refresh";
import { logout } from "./handlers/logout";

const router = Router();

router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);

export default router;
