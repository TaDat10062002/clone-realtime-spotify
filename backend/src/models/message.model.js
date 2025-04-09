import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    // clerk userId
    senderId: {
        type: String,
        required: true
    },

    // clerk userId
    receiverId: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const Message = mongoose.model("Message", messageSchema);
export default Message;