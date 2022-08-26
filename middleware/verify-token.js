const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token || req.body.token;

    if(token){
        jwt.verify(token, req.app.get('api_secret_key'), (err, encoded) => {
            if(err){
                res.json({
                    message: err.message
                });
            }else{
                req.encoded = encoded;
                next();
            }
        });
    }else{
        res.json({
            message: 'no token provided'
        });
    }
}