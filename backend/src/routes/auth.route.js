import express from "express";
import { authCallback } from "../controllers/auth.route.js";
const routers = express.Router();

routers.post('/callback', authCallback)

export default routers;