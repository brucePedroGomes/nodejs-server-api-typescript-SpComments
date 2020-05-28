import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import CreateUpvoteService from '../../services/CreateUpvoteService';
import DeleteUpvoteService from '../../services/DeleteUpvoteService';
import UpvotesRepository from '../typeorm/repositories/UpvotesRepository';

const UpvotesRouter = Router();

UpvotesRouter.post('/', ensureAuthenticated, async (req, res) => {
    const upvotesRepository = new UpvotesRepository();

    const upvoteService = new CreateUpvoteService(upvotesRepository);

    const { comment_id } = req.body;

    const upvotes = await upvoteService.execute({
        comment_id,
        user_id: req.user.id,
    });

    return res.json(upvotes);
});

UpvotesRouter.delete('/delete', ensureAuthenticated, async (req, res) => {
    const upvotesRepository = new UpvotesRepository();
    const upvoteService = new DeleteUpvoteService(upvotesRepository);

    const { comment_id } = req.body;

    await upvoteService.execute({ comment_id, user_id: req.user.id });

    return res.status(200).json();
});

export default UpvotesRouter;
