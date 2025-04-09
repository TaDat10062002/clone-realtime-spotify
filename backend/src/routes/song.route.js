import express from "express";
const routers = express.Router();

routers.get('/', (req, res) => {
    res.send("song route")
})

export default routers;