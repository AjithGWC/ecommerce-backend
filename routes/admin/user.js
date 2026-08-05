const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");
const authUserMiddleware = require("../../middlewares/authUserMiddleware");

const users = express.Router();
users.use(modelMiddleware.modelMiddleware);

const userMiddleware = require("../../middlewares/userMiddleware");
const userService = require("../../services/admin/userService");

users.get("/users", [userMiddleware.getusers, authUserMiddleware.authenticateAdmin], userService.getUsers);
users.post("/users", [userMiddleware.newUsers], userService.createUserService);
users.get("/users/:id", [userMiddleware.editUser], userService.editUser);
users.post("/users/:id", [userMiddleware.updateUser], userService.updateUser);
users.delete("/users/:id", [userMiddleware.deleteUser, authUserMiddleware.authenticateAdmin], userService.deleteUser); 

module.exports = users;
