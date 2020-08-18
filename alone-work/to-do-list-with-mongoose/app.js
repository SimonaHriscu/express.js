// sudo pkill node - for when the server does not work
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//new Schema
const itemsSchema = new mongoose.Schema({
  name: String,
});
//new MOdel
const Item = mongoose.model('Item', itemsSchema);
const item1 = new Item({
  name: 'Welcome to your todolist!',
});
const item2 = new Item({
  name: 'Hit the + button to add a new item',
});
const item3 = new Item({
  name: '<-- Hit this to delete an item',
});
//adding several docs to the DB, first put them in an array
const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, (err) => {
//   if (err) {
//     console.log('This is error');
//   } else console.log('This was successful!');
// });

//to delete some docs:
//Item.deleteMany({ name: '<-- Hit this to delete an item' }, function (err) {});

const listSchema = {
  name: String,
  items: [itemsSchema],
};
const List = mongoose.model('List', listSchema);

app.get('/', function (req, res) {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log('This is error');
        } else console.log('This was successful!');
      });
      res.redirect('/');
    } else {
      const day = date.getDate();
      res.render('list', { listTitle: day, newListItems: foundItems });
    }
  });
});

app.get('/:customListName', (req, res) => {
  const customListName = req.params.customListName;
  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //create a new list
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect('/' + customListName);
      } else {
        //show existing list
        res.render('list', {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});
app.post('/', function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName,
  });
  if (listName === 'Today') {
    item.save();
    res.redirect('/');
  } else {
    List.findOne(
      {
        name: listName,
      },
      function (err, foundList) {
        foundList.items.push(item);
        foundList.save();
        res.redirect('/' + listName);
      }
    );
  }
});

app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === 'Today') {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log('Successfully deleted checked item!');
        res.redirect('/');
      }
    });
  } else {
    //List.findOneAndUpdate({},{},callback)
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundList) {
        if (!err) {
          res.redirect('/' + listName);
        }
      }
    );
  }
});

app.get('/work', function (req, res) {
  res.render('list', { listTitle: 'Work List', newListItems: workItems });
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.listen(5000, function () {
  console.log('Server started on port 5000');
});
