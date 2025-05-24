import express from "express";
const routers = express.Router();

import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/admin.controller.js";
import { protectedRoute, requiredAdmin } from "../middleware/auth.middleware.js";


// simply middleware and clean code
routers.use(protectedRoute, requiredAdmin);

//songs
routers.post('/songs', protectedRoute, requiredAdmin, createSong);
routers.delete('/songs/:id', protectedRoute, requiredAdmin, deleteSong);

//albums
routers.post('/albums', protectedRoute, requiredAdmin, createAlbum);
routers.delete('/albums/:id', protectedRoute, requiredAdmin, deleteAlbum);

// check
routers.get('/check', checkAdmin)
export default routers; 