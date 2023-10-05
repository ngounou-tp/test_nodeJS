const express = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user.js');
const db = require('../config/db.js');

const router = express.Router();
  
  router.post("/login", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
     let user = await User.findOne({username});
    if (user) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken,username}
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
  });
  
  router.post("/register", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const age = req.body.age;
  
    if (username && password) {
      const oldUser = await User.findOne({ username});
      if (!oldUser) { 
        try {
            const user = new User({ username, password, age });
            await user.save();
            return res.status(200).json({message: "User successfully registred. Now you can login"});
          } catch (error) {
            console.error(error);
            res.status(500).send(error);
          }
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "enter user name and."});
  });

  module.exports = router;