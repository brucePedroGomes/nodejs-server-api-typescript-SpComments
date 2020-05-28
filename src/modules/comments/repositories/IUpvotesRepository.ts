import Upvote from '../infra/typeorm/entities/Upvote';

import IUpvotesDTO from '../dtos/IUpvotesDTO';

export default interface IUpvotesRepository {
    create(data: IUpvotesDTO): Promise<Upvote>;
    findUserIdCommentId(data: IUpvotesDTO): Promise<Upvote | undefined>;
    delete(upvote: Upvote): Promise<void>;
}
