import { clerkClient } from "@clerk/express";

export const protectedRoute = async (req, res, next) => {
    if (!req.auth.userId) {
        return res.status(401).json({
            message: "Unauthorised - You must be logged in"
        })
    }
    next();
}

export const requiredAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        /*? la han che loi xay ra */
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if (!isAdmin) {
            return res.status(403).json({
                message: "Unauthorised - You must be an admin"
            })
        }
        next();
    } catch (error) {
        console.log("Error in requireAdmin controller:", error)
        next(error)
    }
}
