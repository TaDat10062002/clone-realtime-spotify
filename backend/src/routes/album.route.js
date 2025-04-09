import express from "express";
const routers = express.Router();

routers.get('/', (req, res) => {
    res.send("album route")
})

export default routers;