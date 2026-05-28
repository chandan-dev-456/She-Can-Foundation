const Message = require("../Schema/messageSchema");

const addMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const existingMsg = await Message.findOne({ email }).sort({ createdAt: -1 });
        if (existingMsg) {
            const now = Date.now();
            const oldTime = new Date(
                existingMsg.createdAt
            ).getTime();
            const difference = now - oldTime;
            if (difference < 24 * 60 * 60 * 1000) {
                return res.status(400).json({
                    success: false,
                    message:
                        "You can send another message after 24 hours"
                });
            }
        }
        await Message.create({
            name,
            email,
            message
        });
        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({});
        return res.status(200).json({
            success: true,
            messages
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

const getSingleMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const singleMsg = await Message.findById(id);
        return res.status(200).json({
            success: true,
            singleMsg
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const msg = await Message.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Succesfully Deleted"
        })
    } catch (e) {
        return req.status(400).json({
            success: false,
            message: "Server Error"
        })
    }
}

const updateMarkAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const updateMsg = await Message.findByIdAndUpdate(
            id,
            {
                isRead: true
            },
            {
                new: true
            }
        );
        return res.status(200).json({
            success: true,
            updateMsg,
            message: "Marked as Read"
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
module.exports = { addMessage, getMessage, getSingleMessage, deleteMessage, updateMarkAsRead };