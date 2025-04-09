import express from "express";
const routers = express.Router();

routers.get('/', (req, res) => {
    res.send("user route")
})

export default routers;