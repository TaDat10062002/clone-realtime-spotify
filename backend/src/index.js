import express from "express";
import { config } from "dotenv";
import { clerkMiddleware } from '@clerk/express'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stat.route.js';
import { connectDB } from "./lib/db.js";
import fileUpload from "express-fileupload";
import path from "path"
config();
const app = express();
const PORT = process.env.PORT;
const MONGDB_URI = process.env.MONGDB_URI;

// get body from req
app.use(express.json());

// this will add auth to req obj => req.auth.userId
app.use(clerkMiddleware(
    {
        // apiKey: process.env.CLERK_API_KEY,
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY
    }
));

const __dirname = path.resolve();
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "tmp"),
        creatParentPath: true,
        limits: {
            fileSize: 10 * 1024 * 1024, // 10MB max file sizes
        }
    }))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// error handler
app.use((err, req, res, next) => {
    // kiem tra neu project la production thi bao nguoi dung 500, khong thi bao loi cho dev
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message })
})

app.listen(PORT, () => {
    connectDB(MONGDB_URI)
    console.log(`Server is running at http://localhost:${PORT}`);
})

// todo: socket.io