import express from "express";
const routers = express.Router();

import { checkAdmin, createAlbum, createSong, deleteSong } from "../controllers/admin.controller.js";
import { protectedRoute, requiredAdmin } from "../middleware/auth.middleware.js";


// simply middleware and clean code
routers.use(protectedRoute, requiredAdmin);

//songs
routers.post('/songs', createSong);
routers.delete('/song/:id', deleteSong);

//albums
routers.post('/albums', createAlbum);
routers.delete('/albums/:id', deleteSong);

// check
routers.get('/check', checkAdmin)
export default routers; 