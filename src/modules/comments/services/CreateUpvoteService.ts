import Upvote from '@modules/comments/infra/typeorm/entities/Upvote';
import AppError from '@shared/errors/AppError';
import IUpvotesRepository from '../repositories/IUpvotesRepository';

interface IRequest {
    user_id: string;
    comment_id: string;
}

class CreateUpvotesService {
    constructor(private upvotesRepository: IUpvotesRepository) {}

    public async execute({ user_id, comment_id }: IRequest): Promise<Upvote> {
        const findId = await this.upvotesRepository.findUserIdCommentId({ user_id, comment_id });

        if (findId) {
            throw new AppError('limited to one vote per user');
        }

        const register = await this.upvotesRepository.create({ user_id, comment_id });

        return register;
    }
}

export default CreateUpvotesService;
