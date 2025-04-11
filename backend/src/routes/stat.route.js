import express from "express";
const routers = express.Router();
import { protectedRoute, requiredAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controllers/stat.controller.js";

routers.get('/', protectedRoute, requiredAdmin, getStats)

export default routers;