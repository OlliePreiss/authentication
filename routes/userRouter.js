const { Router } = require('express');
const userController = require('../controllers/userController')

const userRouter = Router();

userRouter.get("/", (req,res) => res.send("Username will be logger here"));
userRouter.get("/new", (req, res) => res.send("New user form will be here"));
userRouter.post("/new", (req,res) => res.send("New user forms will be submitted here"));

module.exports = userRouter;
