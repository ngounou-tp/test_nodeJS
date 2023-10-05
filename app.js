const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const bodyParser = require('body-parser');
const auth = require('./routes/user.js');
const book = require('./routes/books.js');
const db = require('./config/db.js');

const app = express();
app.use(session({secret:"fingerpint"},resave=true,saveUninitialized=true));
const router = express.Router();
const PORT =5000;
app.use(bodyParser.json());
app.use("/books", function auth(req,res,next){
  if(req.session.authorization) {
    token = req.session.authorization['accessToken'];
    jwt.verify(token, "access",(err,user)=>{
        if(!err){
            req.user = user;
            next();
        }
        else{
            return res.status(403).json({message: "User not authenticated"})
        }
     });
 } else {
     return res.status(403).json({message: "User not logged in"})
 }
});
app.use("/",auth)
app.use("/books",book)
module.exports = router;
app.listen(PORT,()=>console.log("Server is running"));
