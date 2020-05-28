import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import CommentsRepository from '@modules/comments/infra/typeorm/repositories/CommentsRepository';
import CreateCommentService from '../../services/CreateCommentService';

const commentsRouter = Router();

commentsRouter.post('/', ensureAuthenticated, async (req, res) => {
    const { title, comment } = req.body;
    const commentsRepository = new CommentsRepository();
    const createCommentService = new CreateCommentService(commentsRepository);

    const comments = await createCommentService.execute({
        title,
        comment,
        user_id: req.user.id,
    });

    return res.json(comments);
});

commentsRouter.get('/', async (_, res) => {
    const commentsRepository = new CommentsRepository();
    const comments = await commentsRepository.fetchCommentsSortedByUpvotes();

    return res.json(comments);
});

export default commentsRouter;
