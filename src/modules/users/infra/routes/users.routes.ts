import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CreateUsersController from '../controllers/CreateUsersController';

const createUsersController = new CreateUsersController();

const usersRouter = Router();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    createUsersController.create,
);

export default usersRouter;
