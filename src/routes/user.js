const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();

router.post("/", userController.insertUser);
router.get("/", userController.getAllUsers);

module.exports = router;
