import { Response, Request } from 'express';

import CreateUpvoteService from '../../services/CreateUpvoteService';
import UpvotesRepository from '../typeorm/repositories/UpvotesRepository';
import DeleteUpvoteService from '../../services/DeleteUpvoteService';

class UpvotesController {
    public async create(req: Request, res: Response): Promise<Response> {
        const upvotesRepository = new UpvotesRepository();
        const upvoteService = new CreateUpvoteService(upvotesRepository);

        const { comment_id } = req.params;

        const upvotes = await upvoteService.execute({
            comment_id,
            user_id: req.user.id,
        });

        return res.json(upvotes);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const upvotesRepository = new UpvotesRepository();
        const upvoteService = new DeleteUpvoteService(upvotesRepository);

        const { comment_id } = req.params;

        await upvoteService.execute({ comment_id, user_id: req.user.id });

        return res.status(200).json();
    }
}

export default UpvotesController;
