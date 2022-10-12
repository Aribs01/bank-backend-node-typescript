import express from 'express';

import UsersController from '../controllers/UsersController';
import auth from '../middlewares/auth';

const routes = express.Router();

const usersController = new UsersController();

// routes.post('/users/auth', usersController.auth);
// routes.post('/users', usersController.store);
// routes.get('/users', usersController.index);
// routes.get('/users/:id', usersController.show);

routes.route('/').get(usersController.index).post(usersController.auth).post(usersController.store)
routes.route('/:id').get(usersController.show)

routes.use(auth);

export default routes;
