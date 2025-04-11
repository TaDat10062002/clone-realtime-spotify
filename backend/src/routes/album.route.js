import express from "express";
import { getAlbumById, getAllAlbums } from "../controllers/album.controller.js";
const routers = express.Router();


routers.get('/', getAllAlbums);
routers.get('/:albumId', getAlbumById);
export default routers;