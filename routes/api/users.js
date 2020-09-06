// to use express router..
const express = require('express');
const router = express.Router();
const bcrpyt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc   register new user
// @access  Public 
// to get directed to this file, client must use 'api/items/'
router.post('/', (req,res) => {
    const {name, email, password} = req.body;

    // simple validation
    if (!name ||!email || !password){
        return res.status(400).json({msg:'Please enter all fields'})
    } //if one of these is missing, return a status 400

    // check for existing user
    // find by email
    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg : 'User already exists'});
        //if theres a user return statsus 400. Else create new user
        const newUser = new User({
            name,
            email,
            password
        });

        //generate a salt which is used to create a password hash from a plain text password
        //Create Salt & hash
        // first param of gensalt is no of rounds we want to use , default 10, more the rnds more secure the salt
        bcrpyt.genSalt(10,(err,salt) => {
            bcrpyt.hash(newUser.password, salt,(err,hash) => {
                if(err) throw err;
                newUser.password = hash; // saving the hash as the new password
                newUser.save() // gives a promise back
                    .then(user => {
                        jwt.sign( // creating a token
                            //first parameter will be the payload we want to add.
                            {id:user.id},
                            config.get('jwtSecret'),
                            {expiresIn: 3600}, // token will last for an hr
                            (err,token) => {
                                if (err) throw err;
                                res.json({
                                    token, // this token we can use to authenticate private routes. can also use passport js middleware to create private routes 
                                    user:{
                                        id:user.id,
                                        name:user.name,
                                        email:user.email
                                    }
                                })
                            }
                        )


                    });
            })
        })


    })
});



module.exports = router;

// to test APIs , we need to use a HTTP client for eg Postman

