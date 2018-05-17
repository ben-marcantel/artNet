"use strict";

const{Router}= require("express");
const router = Router();

const{getDataSet, createDataSet}= require("../controllers/dataCtrl.js");

router.get("/data/:id", getDataSet);
router.post("/data", createDataSet);



module.exports = router;