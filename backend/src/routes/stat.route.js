import express from "express";
const routers = express.Router();

routers.get('/', (req, res) => {
    res.send("stat route")
})

export default routers;