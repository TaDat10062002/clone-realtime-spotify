import express from "express";
const routers = express.Router();
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

routers.get('/', protectedRoute, getAllUsers);

// todo: getMessages

export default routers;