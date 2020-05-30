import Comment from '@modules/comments/infra/typeorm/entities/Comment';
import ICommentRepository from '../repositories/ICommentsRepository';

interface IRequest {
    title: string;
    comment: string;
    user_id: string;
}

class CreateCommentService {
    constructor(private commentsRepository: ICommentRepository) {}

    public async execute({ title, comment, user_id }: IRequest): Promise<Comment> {
        const comments = await this.commentsRepository.create({
            title,
            comment,
            user_id,
        });

        return comments;
    }
}

export default CreateCommentService;
