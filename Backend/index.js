require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const verifyToken = require("./middleware/verifyToken")
const validateAdmin = require("./controllers/admin");
const { addMessage, getMessage, getSingleMessage, deleteMessage, updateMarkAsRead } = require("./controllers/message");

app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:5173" , process.env.FRONTEND_URL],
        credentials: true
    }
));

app.post('/admin', validateAdmin);

app.post('/form', addMessage);

app.get("/dashboard", verifyToken, getMessage);

app.get("/message/:id", verifyToken, getSingleMessage);

app.delete("/message/:id", verifyToken, deleteMessage);

app.patch("/message/:id", verifyToken, updateMarkAsRead);

async function startServer() {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected Successfully");
        const PORT = process.env.PORT || 2026;
        app.listen(PORT, () => {
            console.log(
                `Server listening on port ${PORT}`
            );
        });
    }
    catch (e) {
        console.log("DB Connection Error:", e);
    }
}
startServer();