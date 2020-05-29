import Comment from '@modules/comments/infra/typeorm/entities/Comment';
import AppError from '@shared/errors/AppError';
import ICommentRepository from '../repositories/ICommentsRepository';

interface IRequest {
    title: string;
    comment: string;
    user_id: string;
}

class CreateCommentService {
    constructor(private commentsRepository: ICommentRepository) {}

    public async execute({ title, comment, user_id }: IRequest): Promise<Comment> {
        if (!title || !comment) {
            throw new AppError('Title and comment are required');
        }

        const comments = await this.commentsRepository.create({
            title,
            comment,
            user_id,
        });

        return comments;
    }
}

export default CreateCommentService;
