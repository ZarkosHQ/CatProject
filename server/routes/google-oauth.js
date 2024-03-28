const {loginOAuth, verifyJwt} = require("../controllers/google-oauth");
const User = require('../models/user-model');

module.exports = (app) => {
    app.post("/oauth/google", async (request, response) => {
        if (await verifyJwt(request.body.jwt)) {
            if (await loginOAuth(request, response)) {
                return;
            }
            else if (signUpOAuth(request, response)) {
                return;
            }
            else {
                response.status(400).send({
                    status: 'failed',
                    reason: 'unknown :: bad OAuth credentials'
                })
            }
        }
        else {
            response.status(401).send({
                status: 'failed',
                reason: 'invalid Google OAuth token'
            })
        }
    });

    app.post("/oauth/facebook", async (request, response) => {
    });

};