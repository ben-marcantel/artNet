"use strict";

const {Router} = require("express");
const router = Router();

router.use(require("./auth-route"));
router.use(require("./data-route"));
router.use(require("./training-route"));



module.exports = router;