const express = require('express');
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require('bcrypt');
const { Error } = require('sequelize');

router.post("/", async (req,res) => {
    const {username,password} = req.body

    bcrypt.hash(password,10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("SUCCESS")
    });  
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ where: { username: username } });
        if (!user) return res.json({ error: "User doesn't exist" });

        bcrypt.compare(password, user.password).then((match) => {
            if (!match) return res.json({ error: "Wrong Username And Password Combination" });
            res.send("YOU LOGGED IN!!!");
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;