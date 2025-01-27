const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcryptjs");
const { authMiddleware } = require("../middleware");

// Test route to check if user route is working
router.get("/", (req, res) => {
    console.log("User route is working");
    res.json({ message: "User route is working" });
});

// Define the schema for signup validation
const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
});

// Signup route
router.post("/signup", async (req, res) => {
    const { success, error } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input",
            error: error.errors, // Include validation errors
        });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(409).json({ message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    let user;

    try {
        user = await User.create({
            username: req.body.username,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ message: "Error creating user" });
    }

    // Create a new account for the user
    const userId = user._id;
    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000,
    });

    // Generate JWT token
    const token = jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
        message: "User created successfully",
        token: token,
    });
});

// Define the schema for signin validation
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

// Signin route
router.post("/signin", async (req, res) => {
    const { success, error } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input",
            error: error.errors,
        });
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({
        token: token,
    });
});

// Bulk fetch route for users (with optional filter)
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            { firstname: { $regex: filter, $options: "i" } },
            { lastname: { $regex: filter, $options: "i" } },
        ],
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id,
        })),
    });
});

// User info route (requires authentication)
router.get("/userinfo", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            firstname: user.firstname,
            userid: req.userId,
        });
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
