import { Router } from "express";

import auth from "./auth";
import users from "./users";
import stock from "./stock";
import product from "./product";

const router = Router();

router.use("/auth", auth);
router.use("/user", users);
router.use("/stock", stock);
router.use("/product", product);

export default router;
