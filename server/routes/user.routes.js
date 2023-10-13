const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/user/register", UserController.register);
    app.post("/api/user/login", UserController.login);
    app.post("/api/user/logout", UserController.logout);
    app.get("/api/user/current-user", authenticate, UserController.getLoggedInUser)
    

    // app.post('/api/user', userController.newUser);
    // app.get('/api/user', userController.showUser);
    // app.get('/api/user/:_id', userController.showOneuUser);
    // app.put('/api/user/:_id/', userController.updateUser);
    // app.delete('/api/user/:_id', userController.deleteUser);
};
