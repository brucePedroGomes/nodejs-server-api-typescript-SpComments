import Comment from '../infra/typeorm/entities/Comment';
import ICreateCommentDTO from '../dtos/ICreateCommentDTO';

export default interface ICommentsRepository {
    fetchCommentsSortedByUpvotes(): Promise<Comment[]>;
    create(data: ICreateCommentDTO): Promise<Comment>;
}
