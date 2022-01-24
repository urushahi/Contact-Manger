const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
let User = require('../models/user.model');

//Sign up
router.route('/add').post((req, res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({ email: email, password: password });


    newUser.save()
        .then((newUser) => res.json(newUser))
        .catch((err) => res.status(400).json('Error: ' + err));
});


//login 
// Get users by id 
router.route('/:email/:password').get((req, res) => {
    User.findOne({ email: req.params.email })
        .then(async user => {
            const match = await bcrypt.compareSync(req.params.password, user.password);
            if (match) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        password: user.password,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "5s",
                    }
                );
                user.save()
                    .then(() => res.json(
                        {
                            message: "Login successful.",
                            token: token,
                            id: user.id
                        }
                    ))
                    .catch((err) => res.status(400).json('Error: ' + err));
            }
            else {
                res.status(400).json('Wrong Email or password:');
                res.end()
            }

        })
        .catch((err) => res.status(400).json('Error:' + err));
});


// Get users 
router.route('/').get((req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json('Error:' + err));
})


// Get users by id 
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json('Error:' + err));
});


//Update users data
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.email = req.body.email;
            user.password = req.body.password;


            user.save()
                .then(() => res.json("User Updated"))
                .catch((err) => res.status(400).json('Error: ' + err));
        });
});



//delete users
router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User Deleted"))
        .catch((err) => res.status(400).json('Error: ' + err));

});



module.exports = router


