import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import CommentsRepository from '@modules/comments/infra/typeorm/repositories/CommentsRepository';

import CommentsController from '../controllers/CommentsController';

const commentsController = new CommentsController();

const commentsRouter = Router();

commentsRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            comment: Joi.string().required(),
        },
    }),
    commentsController.create,
);

commentsRouter.get('/', async (_, res) => {
    const commentsRepository = new CommentsRepository();
    const comments = await commentsRepository.fetchCommentsSortedByUpvotes();

    return res.json(comments);
});

export default commentsRouter;
