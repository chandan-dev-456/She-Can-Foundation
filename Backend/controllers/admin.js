const Admin = require("../Schema/adminSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const validateAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({
                message: "No admin found"
            });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }
        const token = jwt.sign(
            {
                role: "admin",
                id: admin._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        });
    }

};

module.exports = validateAdmin;