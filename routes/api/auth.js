// to use express router..
const express = require('express');
const router = express.Router();
const bcrpyt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc   auth user
// @access  Public 
// to get directed to this file, client must use 'api/items/'
router.post('/', (req,res) => {
    const {email, password} = req.body;

    // simple validation
    if (!email || !password){
        return res.status(400).json({msg:'Please enter all fields'})
    }

    // check for existing user
    
    User.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({msg : 'User does not exist'});

        // validating password
        bcrpyt.compare(password,user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

                jwt.sign(
                    {id:user.id},
                    config.get('jwtSecret'),
                    {expiresIn: 3600},
                    (err,token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user:{
                                id:user.id,
                                name:user.name,
                                email:user.email
                            }
                        })
                    }
                )

            })
    })
});



module.exports = router;

// to test APIs , we need to use a HTTP client for eg Postman

