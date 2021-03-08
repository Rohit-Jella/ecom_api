const jwt = require('jsonwebtoken')

exports.verifyUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('access denied');

    try {
        const verify = jwt.verify(token, process.env.USER_TOKEN_SECRET);
        req.user = verify;
        next();
    } catch (error) {
        res.status(400).send('invalid token');        
    }
}

exports.verifyAdmin = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('access denied');

    try {
        const verify = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
        req.admin = verify;
        next();
    } catch (error) {
        res.status(400).send('invalid token');        
    }
}