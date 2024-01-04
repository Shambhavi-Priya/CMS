const router = require("express").Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
    try {
        // Generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        
        // Check if the user exists
        if (!user) {
            return res.status(400).json("Email or password is incorrect");
        }

        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json("Email or password is incorrect");
        }

        // Send a successful login response
        res.status(200).json({ _id: user._id, email: user.email });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
