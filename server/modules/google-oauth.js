const jwt = require('jsonwebtoken');
const client_id = process.env.GOOGLE_CLIENT_ID;
const dbo = require('../db/conn');
const jwtDecode = require("jwt-decode");
const sessionAuth = require('./session-auth');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
async function verify(jwt) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: jwt,
            audience: client_id,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        return userid && true;
    }
    catch (e) {
        return false;
    }
}

module.exports = (app) => {

    app.post('/auth/google', async (req, res) => {
        const decoded = jwtDecode.jwtDecode(req.body.jwt);
        if (await verify(req.body.jwt)) {
            const users = dbo.collection('user');
            let user = await users.findOne({
                email: decoded.email,
                oauthUser: true
            });
            if (user) {
                delete user.password;
                const t = await sessionAuth.beginSession(user);
                res.send({
                    status: 'success',
                    token: t,
                    user: user,
                    needsSignup: false,
                });
            }
            else {
                res.send({
                    status: 'success',
                    needsSignup: true,
                });
            }
        }
        else {
            res.status(403).send({
                status: 'failed',
                reason: 'invalid Google token'
            });
        }
    });
 
}
