const config = require('config');
const jwt = require('jsonwebtoken');

function auth (req,res,next){
    const token = req.header('x-auth-token');

    // check for token
    if(!token){
        res.status(401).json({msg: 'No token, authorization denied'})
    }

    try {
        // verify token
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        
        //add user from payload to req
        req.user = decoded;
        next();
    // when we are done w this piece of middleware we call next to go to the next middleware
    } catch(e){
        res.status(400).json({msg: 'Token is not valid'});

    }

}

module.exports = auth;
