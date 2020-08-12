const mongoose = require('mongoose');

//connecting mongoDB to mongoose:
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,
});

//Creating a new SCHEMA:
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      //in case you want to be mandatory
      true,
      'Please check your data validation entry, no name specified!',
    ],
  },
  rating: {
    type: Number, //rating between 1 and 10
    min: 1,
    max: 10,
  },
  review: String,
});

//creating a new Model:
const Fruit = mongoose.model('Fruit', fruitSchema);
const fruit = new Fruit({
  rating: 7,
  review: ' What is this fruit?',
});
//fruit.save(); ///here is how we save the elem in the DB

// A new person DB
// a new SCHEMA for person
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema, //here is how we  Establish Relationships and Embedding Documents using Mongoose
});
//a model for person Schema
const Person = mongoose.model('Person', personSchema);

const pineapple = new Fruit({
  name: 'Pinapple',
  score: 9,
  review: 'Great fruit',
});
pineapple.save();

const mango = new Fruit({
  name: 'Mango',
  score: 8,
  review: 'Only good when really ripe',
});
//mango.save();

// const person = new Person({
//   name: 'Amy',
//   age: 12,
//   favoriteFruit: pineapple,
// });
// person.save();

//How to update information:
Person.updateOne(
  {
    name: 'John',
  },
  { favoriteFruit: mango },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully updated the document');
    }
  }
);

//How to deleteMany at once
// Person.deleteMany({ name: 'Amy' }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Successfully deleted the Johns');
//   }
// });

//Adding new fruits in bulk

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit",
// })
// const orange = new Fruit({
//   name: "Orange",
//   score: 8,
//   review: "Nice flavour",
// })
// const banana = new Fruit({
//   name: "Banana",
//   score: 5,
//   review: "Too sweet for my taste",
// })

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits!");
//   }
// })

//Print in the console
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach((elem) => console.log(elem.name));
  }
});

//UPdating just one  document
// Fruit.updateOne(
//   { _id: '5f33db8cd750523c1eef01b3' },
//   { name: 'Peach' },
//   function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Successfully updated the document');
//     }
//   }
// );

// Fruit.deleteMany(
//   {
//     name: 'Pinapple',
//   },
//   function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Successfully deleted documents');
//     }
//   }
// );
