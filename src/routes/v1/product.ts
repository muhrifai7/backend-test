import { Router } from "express";

import { list, create, show, destroy, edit } from "../../controllers/product";
import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";
import { validatorEdit } from "../../middleware/validation/users";

const router = Router();

router.get("/", list);

router.post("/", create);

router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMINISTRATOR"], true)],
  show
);

router.patch(
  "/:id([0-9]+)",
  // [checkJwt, checkRole(["ADMINISTRATOR"], true), validatorEdit],
  edit
);

router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMINISTRATOR"], true)],
  destroy
);

export default router;
