db.users.insert({
  name: 'Ali',
  age: 21,
  city: 'Berlin',
  hobbies: ['dance', 'sleep'],
  emails: {
    private: 'ali@yahoo.com',
    work: 'alioo@work.co',
  },
  date: Date(),
});

db.users.insert({
  name: 'Suzy',
  age: 22,
  city: 'Paris',
  date: Date(),
});

db.users.insertMany([
  {
    name: 'Ovi',
    age: 28,
    city: 'Iasi',
    date: Date(),
  },
  {
    name: 'Andre',
    age: 32,
    city: 'Prague',
    date: Date(),
  },
  {
    name: 'Eugene',
    age: 25,
    city: 'London',
    date: Date(),
  },
]);
