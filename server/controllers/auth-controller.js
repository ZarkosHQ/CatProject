const User = require('../models/user-model');
const argon = require("argon2");
const sessionAuth = require("../controllers/session-auth");
const { signUpOAuth } = require("./google-oauth");

module.exports = {
    signup: async (request, response) => {
        if (!request.body.firstName || !request.body.lastName || !request.body.type) 
        {
            response.status(400).send({
                status: 'failed',
                reason: 'not enough required information'
            });
            return;
        }
        if (!request.body.oauthUser && request.body.password.length < 16) {
            response.status(400).send({
                status: 'failed',
                reason: 'password does not meet requirements, must be 16 characters long'
            });
            return;
        }

        if (!request.body.oauthUser && (!request.body.email || !request.body.password))
            response.status(400).send({
                status: 'failed',
                reason: 'not enough required information'
            });

        let obj = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: await argon.hash(request.body.password),
            type: request.body.type,
        };

        if (request.body.oauthUser) {
            obj.OAuth = true;
            if (request.body.oauth.source === 'google') {
                const oauthObj = await signUpOAuth(request, response);
                if (oauthObj === null) {
                    response.status(400).send({
                        status: 'failed',
                        reason: 'Already signed up with Google. Go to Login.'
                    });
                }
                obj.OAuthConfig = oauthObj;
            }
            else if (request.body.oauth.source === 'facebook') {
                
            }
            else if (request.body.oauth.source === 'pearson') {
                
            }
        }
        else { 
            obj.OAuth = false;
        }

        const exists = await User.findOne({
            email: obj.email
        });
        
        if (exists) {
            response.status(400).send({
                status: 'failed',
                reason: 'user with that email already exists (did you sign up with google or facebook already?)'
            });
            return;
        }

        try {
            if (request.body.type === 'seller') { 
                let changeOfName = request.body.seller;
                changeOfName.businessId = changeOfName.bin;
                obj.seller = changeOfName; 
            }
            else if (request.body.type === 'buyer') { 
                obj.buyer = request.body.buyer;
            }
            await User.create(obj);
            response.send({
                status: 'success',
            });
        }
        catch (e) {
            console.log(e);
            response.status(500).send({
                status: 'failed',
                reason: 'database error',
            });
        }

    },
    login: async (request, response) => {
        if (!request.body.email || !request.body.password) {
            response.status(400).send({
                status: 'failed',
                reason: 'missing required information'
            });
            return;
        }
        let toAuth = await User.findOne({
            email: request.body.email
        });

        if (toAuth) {
            const authResult = await argon.verify(toAuth.password, request.body.password);
            if (authResult) {
                delete toAuth.password;
                const t = await sessionAuth.beginSession(toAuth);
                response.send({
                    status: 'success',
                    token: t,
                    user: toAuth,
                });
            }
            else {
                response.status(401).send({
                    status: 'failed',
                    reason: 'invalid password or email'
                });
            }
        }
        else {
            response.status(401).send({
                status: 'failed',
                reason: 'invalid password or email'
            });
        }
    },
    googleOauthLogin: (jwt) => {

    },
    fbOauthLogin: (jwt) => {

    }
}