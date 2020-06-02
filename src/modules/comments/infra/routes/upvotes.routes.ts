import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import UpvotesController from '../controllers/UpvotesController';

const upvotesController = new UpvotesController();

const UpvotesRouter = Router();

UpvotesRouter.use(ensureAuthenticated);

UpvotesRouter.post(
    '/:comment_id',
    celebrate({
        [Segments.PARAMS]: {
            comment_id: Joi.string().uuid().required(),
        },
    }),
    upvotesController.create,
);

UpvotesRouter.delete(
    '/delete/:comment_id',
    celebrate({
        [Segments.PARAMS]: {
            comment_id: Joi.string().uuid().required(),
        },
    }),
    upvotesController.delete,
);

export default UpvotesRouter;
