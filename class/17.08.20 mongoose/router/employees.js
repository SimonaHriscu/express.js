const express = require('express');
const router = express.Router();

const EmployeesData = require('../module/employeesModel');
const { request } = require('../app');
// url localhost:3000/employees
router.get('/', async (req, res) => {
  try {
    const employees = await EmployeesData.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//add one employee
// url localhost:3000/employees
router.post('/', async (req, res) => {
  const employee = new EmployeesData({
    name: request.body.name,
    age: request.body.age,
    add: request.body.add,
  });
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
