const jwt = require('jsonwebtoken');
const secret = process.env.GOOGLE_SECRET;
const dbo = require('../db/conn');
const jwtDecode = require("jwt-decode");

module.exports = (app) => {

    app.post('/auth/google', async (req, res) => {
        jwt.verify(req.body.jwt, secret, async (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const decoded = jwtDecode(req.body.jwt);
                const users = dbo.collection('user');
                let user = await users.findOne({
                    email: decoded.email
                });
                if (user) {
                    delete user.password;
                    const t = await sessionAuth.beginSession(toAuth);
                    response.send({
                        status: 'success',
                        token: t,
                        user: user,
                    });
                }
                else {
                    response.status(505).send({
                        status: 'failed',
                        reason: 'not implemented'
                    });
                }
            }
        });
    });
 
}
