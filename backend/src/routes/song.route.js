import express from "express";
import { getAllSongs, getFeatureSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/song.controller.js";
import { protectedRoute, requiredAdmin } from "../middleware/auth.middleware.js";
const routers = express.Router();

routers.get('/', protectedRoute, requiredAdmin, getAllSongs);
routers.get('/featured', getFeatureSongs);
routers.get('/made-for-you', getMadeForYouSongs);
routers.get('/trending', getTrendingSongs);

export default routers;