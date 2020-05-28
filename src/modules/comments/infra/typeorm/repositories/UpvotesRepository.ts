import IUpvotesRepository from '@modules/comments/repositories/IUpvotesRepository';
import IUpvotesDTO from '@modules/comments/dtos/IUpvotesDTO';
import { Repository, getRepository } from 'typeorm';
import Upvote from '../entities/Upvote';

class UpvotesRepository implements IUpvotesRepository {
    private ormRepository: Repository<Upvote>;

    constructor() {
        this.ormRepository = getRepository(Upvote);
    }

    public async create({ user_id, comment_id }: IUpvotesDTO): Promise<Upvote> {
        const upvotes = this.ormRepository.create({ user_id, comment_id });
        await this.ormRepository.save(upvotes);
        return upvotes;
    }

    public async findUserIdCommentId({
        user_id,
        comment_id,
    }: IUpvotesDTO): Promise<Upvote | undefined> {
        const upvotes = await this.ormRepository.findOne({ where: { user_id, comment_id } });
        return upvotes;
    }

    public async delete(upvote: Upvote): Promise<void> {
        await this.ormRepository.remove(upvote);
    }
}

export default UpvotesRepository;
