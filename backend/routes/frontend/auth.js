const express = require("express");
const cookieParser = require('cookie-parser');
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");

const auth = express.Router();
auth.use(modelMiddleware.modelMiddleware);
auth.use(cookieParser());

const authMiddleware = require("../../middlewares/authMiddleware");
const authService = require("../../services/frontend/authService");

auth.post("/login", [authMiddleware.loginValidation], authService.userLogin);
auth.post('/logout', [authMiddleware.logoutValidation], authService.userLogout);

module.exports = auth;