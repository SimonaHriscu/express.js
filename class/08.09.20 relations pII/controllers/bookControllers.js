const authorModel = require('../model/authorModel');

const { Author, Book } = require('../model/authorModel');
const mongoose = require('mongoose');
const getAll = async (req, res) => {
  try {
    const authors = await authorModel.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getOneByID = async (req, res) => {
  try {
    const author = await authorModel.findById(req.params.id); //.populate('books','title');
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const deleteOneByID = async (req, res) => {
  try {
    const author = await authorModel.findByIdAndDelete(req.params.id);
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// const addOne = async (req, res) => {
//   console.log(req.body.books);
//   const author = new authorModel({
//     authorName: req.body.name,
//   });
//   req.body.books.map((book) =>
//     author.books.push({ title: book.title, issueYear: book.year })
//   );
//   try {
//     const newAuthor = await author.save();
//     res.status(201).json(newAuthor);
//   } catch (err) {
//     res.status(400).json({
//       message: err.message,
//     });
//   }
// };

const addAuthor = async (req, res) => {
  const Author = new Author({
    _id: new mongoose.Types.ObjectId(),
    authorName: req.body.name,
  });
  try {
    author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
//localhost:3000/:id aka author ID
const addBook = async (req, res) => {
  Author.findById(req.params.id)
    .then((author) => {
      if (author) {
        const book = new Book({
          _id: new mongoose.Types.ObjectId(),
          title: req.body.title,
          author: req.params.id, //get the _id from the author
        });
        book.save();
        author.books.push(book);
        author.save();
        res.status(201).json(book);
      } else {
        return res.status(404).json({
          message: 'Author Not Found',
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
module.exports = {
  getAll,
  getOneByID,
  deleteOneByID,
  addAuthor,
  addBook,
  getAllBooks,
};
