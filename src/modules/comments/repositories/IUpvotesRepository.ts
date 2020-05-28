import Upvote from '../infra/typeorm/entities/Upvote';

import IUpvotesDTO from '../dtos/IUpvotesDTO';

export default interface IUpvotesRepository {
    create(data: IUpvotesDTO): Promise<Upvote>;
    findUserCommentId(data: IUpvotesDTO): Promise<Upvote | undefined>;
}
