import { Router } from "express";

import { list, create, destroy, show_by_id } from "../../controllers/users";
import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";

const router = Router();

router.get("/", list);

router.post("/", create);

router.get(
  "/:id([0-9]+)",
  [
    checkJwt,
    checkRole(["ADMINISTRATOR", "STANDARD", "MANAGER", "STAFF"], true),
  ],
  show_by_id
);

router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMINISTRATOR"], true)],
  destroy
);

export default router;
