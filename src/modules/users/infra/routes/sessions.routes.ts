import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateSessionController from '../controllers/CreateSessionController';

const createSessionController = new CreateSessionController();

const sessionsRouter = Router();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    createSessionController.create,
);

export default sessionsRouter;
