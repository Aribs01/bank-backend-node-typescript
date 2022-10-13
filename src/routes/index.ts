import express from 'express';

import UsersController from '../controllers/UsersController';
import AccountController from '../controllers/AccountController';

import auth from '../middlewares/auth';

const routes = express.Router();

const usersController = new UsersController();
const accountController = new AccountController();

routes.route('/users/auth').post(usersController.login)
routes.route('/users/signup').post(usersController.signup)

// Authenticated routes
routes.use(auth);
routes.route('/users').get(usersController.getAllUsers)
routes.route('/users/:id').get(usersController.getUser)

routes.post('/wallet', accountController.addFunds);

export default routes;
