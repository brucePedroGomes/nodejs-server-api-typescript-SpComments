import { Repository, getRepository } from 'typeorm';

import ICreateCommentsDTO from '@modules/comments/dtos/ICreateCommentDTO';
import ICommentsRepository from '../../../repositories/ICommentsRepository';
import Comment from '../entities/Comment';

class CommentsRepository implements ICommentsRepository {
    private ormRepository: Repository<Comment>;

    constructor() {
        this.ormRepository = getRepository(Comment);
    }

    public async fetchCommentsSortedByUpvotes(): Promise<Comment[]> {
        const comments = await this.ormRepository.find({ relations: ['upvotes'] });

        const commentsSortedByUpvotes = comments.sort((a, b) => {
            if (a.upvotes.length < b.upvotes.length) {
                return 1;
            }
            if (a.upvotes.length > b.upvotes.length) {
                return -1;
            }

            return 0;
        });

        return commentsSortedByUpvotes;
    }

    public async create({ user_id, title, comment }: ICreateCommentsDTO): Promise<Comment> {
        const comments = this.ormRepository.create({ user_id, title, comment });

        await this.ormRepository.save(comments);

        return comments;
    }
}

export default CommentsRepository;
