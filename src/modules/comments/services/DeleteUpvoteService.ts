import { isUuid } from 'uuidv4';

import AppError from '@shared/errors/AppError';
import IUpvotesRepository from '../repositories/IUpvotesRepository';

interface IRequest {
    user_id: string;
    comment_id: string;
}

class CreateRemoveUpvoteservice {
    constructor(private upvotesRepository: IUpvotesRepository) {}

    public async execute({ user_id, comment_id }: IRequest): Promise<void> {
        const validCommentId = isUuid(comment_id);

        if (!validCommentId) {
            throw new AppError('comment id invalid');
        }

        const upvote = await this.upvotesRepository.findUserIdCommentId({
            user_id,
            comment_id,
        });

        if (!upvote) {
            throw new AppError('You are not the owner of this vote');
        }

        await this.upvotesRepository.delete(upvote);
    }
}

export default CreateRemoveUpvoteservice;
