import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import UpvotesController from '../controllers/UpvotesController';

const upvotesController = new UpvotesController();

const UpvotesRouter = Router();

UpvotesRouter.use(ensureAuthenticated);

UpvotesRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            comment_id: Joi.string().uuid().required(),
        },
    }),
    upvotesController.create,
);

UpvotesRouter.delete(
    '/delete',
    celebrate({
        [Segments.BODY]: {
            comment_id: Joi.string().uuid().required(),
        },
    }),
    upvotesController.delete,
);

export default UpvotesRouter;
