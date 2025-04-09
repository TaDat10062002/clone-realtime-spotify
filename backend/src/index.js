import express from "express";
import { config } from "dotenv";
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stat.route.js';
import { connectDB } from "./lib/db.js";

const app = express();
config();
const PORT = process.env.PORT;
const MONGDB_URI = process.env.MONGDB_URI;

// get body from req
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.listen(PORT, () => {
    connectDB(MONGDB_URI)
    console.log(`Server is running at http://localhost:${PORT}`);
})