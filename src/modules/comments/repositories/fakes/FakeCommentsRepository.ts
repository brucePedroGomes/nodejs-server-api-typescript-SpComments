import { uuid } from 'uuidv4';

import ICreateCommentDTO from '@modules/comments/dtos/ICreateCommentDTO';
import Comment from '../../infra/typeorm/entities/Comment';
import ICommentsRepository from '../ICommentsRepository';

class FakeCommentsRepository implements ICommentsRepository {
    private comments: Comment[] = [];

    public async create({ title, comment, user_id }: ICreateCommentDTO): Promise<Comment> {
        const newComment = new Comment();

        Object.assign(newComment, { id: uuid(), user_id, title, comment });

        this.comments.push(newComment);

        return newComment;
    }

    public async fetchCommentsSortedByUpvotes(): Promise<Comment[]> {
        const { comments } = this;
        return comments;
    }

    public async findByCommentId(comment_id: string): Promise<Comment | undefined> {
        const findUser = this.comments.find(comment => comment.id === comment_id);

        return findUser;
    }
}

export default FakeCommentsRepository;
