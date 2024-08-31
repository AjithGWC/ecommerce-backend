const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");
const authUserMiddleware = require("../../middlewares/authUserMiddleware");

const roles = express.Router();
roles.use(authUserMiddleware);
roles.use(modelMiddleware.modelMiddleware);

const roleMiddleware = require("../../middlewares/roleMiddleware");
const roleService = require("../../services/admin/roleService");

roles.get("/roles", [roleMiddleware.getRoles], roleService.getRoles);
roles.post("/roles", [roleMiddleware.createRoles], roleService.createRoles);

module.exports = roles;