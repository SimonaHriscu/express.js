const mongoose = require('mongoose');
// Today subDocs
const bookSchema = new mongoose.Schema({
  _id: false,
  title: String,
  issueYear: Number,
});

const authorSchema = new mongoose.Schema({
  authorName: String,
  books: [bookSchema],
});
module.exports = mongoose.model('author', authorSchema);

// [
//   {
//     authorName: 'Zain',
//     books: [
//       { title: 'dance Well', issueYear: 2001 },
//       { title: 'Drink Well', issueYear: 2003 },
//     ],
//   },
// ];
