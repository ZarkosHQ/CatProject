const dbo = require("../db/conn");
const argon = require("argon2");

module.exports =  (app) => {
    app.post("/auth/signup", async (request, response) => {
        const user = dbo.collection("user");
        user.insertOne({
            username: request.body.username,
            email: request.body.email,
            password: await argon.hash(request.body.password)
        }).then(() => {
            response.send({
                status: "success"
            })
        }).catch(() => {
            response.send({
                status: "failed"
            })
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
        const toAuth = await user.findOne({
            email: request.body.email
        });
        if (toAuth) {
            let authResult = argon.verify(toAuth.password, request.body.password);
            if (authResult) {
                // TODO: create cookie or other auth token and return it to authenticate subsequent requests
                response.send({
                    status: 'success',
                    user: toAuth
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