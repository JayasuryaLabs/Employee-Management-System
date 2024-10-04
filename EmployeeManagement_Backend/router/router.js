const router = require('express').Router();
const Employee = require('../model/emp_schema');
const User = require('../model/schema');
const controller = require('../controller/controller');
const auth = require('../middleware/auth');
const services = require('../services/services');
const db = require("../database/connection");

console.log("in router");

router.post('/register', controller.registerUser);
router.post('/login', controller.login);
router.delete('/delete', controller.delete);
router.delete('/users/remove/:id', services.remove_user);

/**
 *  @description add users
 *  @method GET /add-user
 */
router.route('/add-user').get((req, res) => {
    res.json({ "message": "Redirecting to Create page" });
});

/**
 *  @description for listing employees
 *  @method GET /list
 */
router.route('/list').get(async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching employee data" });
    }
});

/**
 *  @description create employee
 *  @method POST /users
 */
router.route('/users').post(async (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty" });
    }

    // New employee
    const employee = new Employee(req.body);

    try {
        await employee.save();
        res.status(200).send({ message: 'Employee added successfully' });
        console.log("successful");
    } catch (err) {
        console.log("Error saving employee:", err);
        res.status(500).send({ message: "Failed to add employee" });
        console.log("error");
    }
});

router.post('/users', controller.create);
router.get('/users', controller.find);
router.put('/users', controller.update);
router.delete('/users', controller.delete);

/**
 *  @description user profile
 *  @method GET /profile
 */
router.get('/profile', async (req, res) => {
    console.log('inside profile router');
    try {
        if (req.query.id) {
            const user = await User.findById(req.query.id);
            if (!user) {
                return res.status(404).send({ message: `Not found user with id ${req.query.id}` });
            }
            res.send(user);
        } else {
            const employees = await Employee.find();
            res.send(employees);
        }
    } catch (err) {
        res.status(500).send({ message: err.message || "Error occurred" });
    }
});

/**
 *  @description get employee by id
 *  @method GET /users/:id
 */
router.route('/users/:id').get(async (req, res) => {
    console.log("in /users/:id GET request");
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({ message: `Employee with id ${req.params.id} not found` });
        }
        res.json(employee);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching employee data" });
    }
});

/**
 *  @description update employee details
 *  @method POST /users/:id
 */
router.route('/users/:id').post(async (req, res) => {
    console.log("in /users/:id POST request");
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({ message: `Employee with id ${req.params.id} not found` });
        }

        employee.name = req.body.name;
        employee.gender = req.body.gender;
        employee.email = req.body.email;
        employee.phone = req.body.phone;
        employee.leave = req.body.leave;
        employee.ID = req.body.ID;

        await employee.save();
        res.json({ message: 'Employee updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).send("Unable to update employee");
    }
});

/**
 *  @description delete employee
 *  @method GET /users/remove/:id
 */
router.route('/users/remove/:id').get(async (req, res) => {
    try {
        await Employee.findByIdAndRemove(req.params.id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting employee" });
    }
});

module.exports = router;


