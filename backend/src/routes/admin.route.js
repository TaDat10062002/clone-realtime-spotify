import express from "express";
const routers = express.Router();

import { getAdmin } from "../controllers/admin.controller.js";
routers.get('/', getAdmin)

export default routers;