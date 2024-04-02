const { signup, login } = require("../controllers/auth-controller");
const User = require('../models/user-model');

module.exports = (app) => {
    app.post("/auth/signup", async (request, response) => {
        await signup(request, response);
    });

    app.post("/auth/login", async (request, response) => {
        await login(request, response);
    });
    app.get("/auth/signup",  async (request, response) => {
        const users = User.find({});
        let arr = new Array();
        for await (let i of users) {
            arr.push(i);
        }
        response.send(arr);
    });
};