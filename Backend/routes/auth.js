const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "adeelalam160";
// ROUTE 1: Register a new user
router.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 chars long').isLength({ min: 5 }),
], async (req, res) => {
     success =  false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "Sorry, a user already exists with this email" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        // JWT token
        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, JWT_SECRET);
         success =  true;
        res.json({success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});


// ROUTE 2: Authenticate a user (Login)
router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    
   let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            success =  false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        // Compare password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
             success =  false;
            return res.status(400).json({success,error: "Please try to login with correct credentials" });
        }

        // JWT token
        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, JWT_SECRET);
        success =  true;
        res.json({success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});
// Route 3: check user information with required login 
router.post('/getuser',fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
        res.status(500).send("Some error occurred");
  }
})

module.exports = router;
