const ProjectController = require('../controllers/project.controller');
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    // app.get('/api', ProjectController.index);
    app.post('/api/recipe/create-recipe', authenticate, ProjectController.addRecipe);
    app.get('/api/recipe/show', ProjectController.showRecipe);
    app.get('/api/recipe/my-recipies/:userName', authenticate, ProjectController.findAllRecipiesByUser);
    app.get('/api/recipe/one/:id', ProjectController.showOneRecipe);
    app.put('/api/recipe/update/:id', ProjectController.updateRecipe);
    app.delete('/api/recipe/delete/:id', ProjectController.deleteRecipe);
}