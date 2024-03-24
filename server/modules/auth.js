const dbo = require("../db/conn");
const argon = require("argon2");
const { 
    v4: uuidv4
} = require('uuid');
  
module.exports = (app) => {
    app.post("/auth/signup", async (request, response) => {
        if (!request.body.email || !request.body.password 
            || !request.body.firstName || !request.body.lastName 
            || !request.body.type) {
            response.status(400).send({
                status: 'failed',
                reason: 'not enough required information'
            });
            return;
        }
        if (request.body.password.length < 16) {
            response.status(400).send({
                status: 'failed',
                reason: 'password does not meet requirements'
            });
            return;
        }

        let obj = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: await argon.hash(request.body.password),
            type: request.body.type,
            createdAt: new Date(),
        };

        if (request.body.type === 'seller') { obj.seller = request.body.seller; }
        else if (request.body.type === 'buyer') { obj.buyer = request.body.buyer; }

        const user = dbo.collection("user");
        const exists = await user.findOne({
            email: obj.email
        });
        
        if (exists) {
            response.status(400).send({
                status: 'failed',
                reason: 'user with that email already exists'
            });
            return;
        }

        user.insertOne(obj).then(() => {
            response.send({
                status: "success"
            })
        }).catch(() => {
            response.status(500).send({
                status: "failed",
                reason: 'database error'
            });
        });
    });

    app.post("/auth/login", async (request, response) => {
        if (!request.body.email || !request.body.password) {
            response.status(400).send({
                status: 'failed',
                reason: 'missing required information'
            });
            return;
        }

        const user = dbo.collection("user");
        let toAuth = await user.findOne({
            email: request.body.email
        });
        if (toAuth) {
            const authResult = await argon.verify(toAuth.password, request.body.password);
            if (authResult) {
                const t = uuidv4();
                const tokenCursor = dbo.collection("tokens");
                delete toAuth.password;
                tokenCursor.insertOne({
                    user: toAuth._id,
                    token: t
                });
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
    });

    app.get("/auth/signup",  async (request, response) => {
        const user = dbo.collection("user");
        const users = user.find({});
        let arr = new Array();
        for await (let i of users) {
            arr.push(i);
        }
        response.send(arr);
    });
};