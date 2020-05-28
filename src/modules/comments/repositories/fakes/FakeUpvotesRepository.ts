import { uuid } from 'uuidv4';
import IUpvotesRepository from '../IUpvotesRepository';
import IUpvotesDTO from '../../dtos/IUpvotesDTO';
import Upvote from '../../infra/typeorm/entities/Upvote';

class FakeUpvotesRepository implements IUpvotesRepository {
    private upvotes: Upvote[] = [];

    public async create({ user_id, comment_id }: IUpvotesDTO): Promise<Upvote> {
        const upvote = new Upvote();

        Object.assign(upvote, { id: uuid(), user_id, comment_id });

        this.upvotes.push(upvote);

        return upvote;
    }

    public async findUserIdCommentId({
        user_id,
        comment_id,
    }: IUpvotesDTO): Promise<Upvote | undefined> {
        const upvotes = this.upvotes.find(upvote => {
            return upvote.comment_id === comment_id && upvote.user_id === user_id;
        });
        return upvotes;
    }

    public async delete(upvote: Upvote): Promise<void> {
        const index = this.upvotes.findIndex(up => up.id === upvote.id);
        this.upvotes.splice(index, 1);
    }
}

export default FakeUpvotesRepository;
