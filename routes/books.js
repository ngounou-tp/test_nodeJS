const express = require('express');
const {Book} = require('../models/book.js');

const router = express.Router();
// GET request: Retrieve all books
router.get("/",async (req,res)=>{
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// GET by specific ID request: Retrieve a single book with in ID
router.get("/:id",(req,res)=>{
  const id = req.params.id;
  res.send(books[id])
});


// POST request: Add a new book
router.post("/",async function (req,res){
  if (req.body.title && req.body.author && req.body.publishedDate){
         id = req.body.id
          title=req.body.firstName,
          author= req.body.author,
          publishedDate= req.body.publishedDate
          try {
            const book = new Book({ title, author, publishedDate,id });
            await book.save();
            res.send("The user" + (' ')+ (req.body.firstName) + " Has been added!");
          } catch (error) {
            console.error(error);
            res.status(500).send(error);
          }
          
  }
  res.send("please enter all the fields")

});


// PUT request: Update the details of a book using the id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let title = req.body.title;
  let author = req.body.author;
  let publishedDate = req.body.publishedDate;
  try {
    const book = await Book.findByIdAndUpdate(id, { title, author, publishedDate }, { new: true });
    res.send(`The book with the id  ${id} has been updated.`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


// DELETE request: Delete a book using the id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
    if (id){
      try {
        const book = await Book.findByIdAndDelete(id);
        res.send(`the book with the id  ${id} has been deleted.`);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    }
});

module.exports=router;
