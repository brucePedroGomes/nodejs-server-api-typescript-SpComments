import { getRepository } from 'typeorm';

import Upvote from '@modules/comments/infra/typeorm/entities/Upvote';
import Comment from '@modules/comments/infra/typeorm/entities/Comment';
import AppError from '@shared/erros/AppError';

interface IRequest {
    user_id: string;
    comment_id: string;
}

class CreateUpvotesService {
    public async execute({ user_id, comment_id }: IRequest): Promise<Upvote> {
        if (!comment_id) {
            throw new AppError('comment id not found');
        }

        const commentsRepository = getRepository(Comment);

        const commentFind = await commentsRepository.findOne({
            where: { id: comment_id },
        });

        if (!commentFind) {
            throw new AppError('invalid comment id');
        }

        const upVotesRepository = getRepository(Upvote);

        const findId = await upVotesRepository.findOne({ where: { user_id, comment_id } });

        if (findId) {
            throw new AppError('limited to one vote per user');
        }

        const register = upVotesRepository.create({ user_id, comment_id });

        await upVotesRepository.save(register);

        return register;
    }
}

export default CreateUpvotesService;
