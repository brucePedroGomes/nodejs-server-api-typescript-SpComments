import { Response, Request } from 'express';

import CreateCommentService from '@modules/comments/services/CreateCommentService';
import CommentsRepository from '@modules/comments/infra/typeorm/repositories/CommentsRepository';

class CommentsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { title, comment } = req.body;
        const commentsRepository = new CommentsRepository();
        const createCommentService = new CreateCommentService(commentsRepository);

        const comments = await createCommentService.execute({
            title,
            comment,
            user_id: req.user.id,
        });

        return res.json(comments);
    }
}

export default CommentsController;
