var {User} = require('../models/Usermodel')

var authencitate = (req,res, next) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if(!user){
        return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
     //   res.send(user);
    }).catch((e) => {
        res.status(401).send();
    });
}

module.exports = {authencitate}