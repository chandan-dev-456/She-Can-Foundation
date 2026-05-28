require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = require("../Schema/adminSchema");
const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected ✅");
        const email = "admin@gmail.com";
        const plainPassword = "admin123";

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log("Admin already exists ⚠️");
            process.exit();
        }
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        const admin = await Admin.create({
            email,
            password: hashedPassword
        });
        console.log("Admin Created Successfully 🚀");
        console.log(admin);
        process.exit();

    } catch (e) {
        console.log("Error:", e);
        process.exit(1);

    }

};

seedAdmin();

/*
---------------------------------
HOW TO RUN
---------------------------------

1. Install packages

npm install bcrypt dotenv mongoose

2. Add .env file

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key

3. Run file

node seedAdmin.js

---------------------------------
IMPORTANT LOGIN CHANGE
---------------------------------

Since password is now hashed,
you CANNOT use:

Admin.findOne({ email, password })

Use this instead:

const admin = await Admin.findOne({ email });

if (!admin) {
   return res.status(404).json({
      message: "No admin found"
   });
}

const isMatch = await bcrypt.compare(
   password,
   admin.password
);

if (!isMatch) {
   return res.status(401).json({
      message: "Invalid Password"
   });
}

*/
