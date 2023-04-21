import { Router } from "express";

import { login } from "./handlers/login";
import { refresh } from "./handlers/refresh";
import { logout } from "./handlers/logout";
import { validateToken } from "./validators/validateToken";

const router = Router();

router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", validateToken, logout);

export default router;
