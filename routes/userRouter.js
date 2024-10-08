const { Router } = require('express');
const userController = require('../controllers/userController')

const userRouter = Router();

userRouter.get("/", userController.userListGet);
userRouter.get("/new", userController.userCreateGet);
userRouter.post("/new", userController.userCreatePost);
userRouter.get("/delete", userController.userDeleteGet);

module.exports = userRouter;
