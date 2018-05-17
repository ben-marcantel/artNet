"use strict";

const{Router}= require("express");
const router = Router();

const{ displayTrainSession, createTrainSession, deleteTrainSession } = require("../controllers/trainCtrl.js") ;
router.get("/training", displayTrainSession);
router.post("/training", createTrainSession);
// router.post("/training/delete/", deleteTrainSession);

router.post("/training/delete/:id", deleteTrainSession);

module.exports = router;