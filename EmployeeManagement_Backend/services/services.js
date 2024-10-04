const axios = require('axios');
console.log('in services');

exports.add_user = (req, res) => {
    const { name, email, phone, gender, ID, leave } = req.body; // Extract user data from the request body

    // Validate request data
    if (!name || !email) {
        return res.status(400).send({ message: "Name and email are required" });
    }

    // Send a POST request to create a new user
    axios.post('http://localhost:4000/api/users', { name, email, phone, gender, ID, leave })
        .then(response => {
            res.status(201).send(response.data); // Send back the response from the API
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: "Failed to add user" });
        });
}

exports.update_user = (req, res) => {
    const { id } = req.query; // Get user ID from query parameters

    axios.get(`http://localhost:4000/api/users/${id}`)
        .then(function (userdata) {
            res.render("update_user", { user: userdata.data }); // Render the update user page with user data
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: "Error fetching user data" });
        });
}

exports.list = (req, res) => {
    axios.get('http://localhost:4000/api/users')
        .then(function (response) {
            console.log(response.data);
            res.render('index', { users: response.data }); // Render the index page with the list of users
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: "Error fetching user list" });
        });
}

// New method to remove a user
exports.remove_user = (req, res) => {
    const { id } = req.params; // Get user ID from request parameters

    axios.delete(`http://localhost:4000/api/users/remove/${id}`)
        .then(response => {
            res.status(200).send(response.data); // Send back the response from the API
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: "Failed to remove user" });
        });
}
