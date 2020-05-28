import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';
import CreateCommentService from './CreateCommentService';

let fakeCommentsRepository: FakeCommentsRepository;
let createComment: CreateCommentService;

describe('CreateComment', () => {
    beforeEach(() => {
        fakeCommentsRepository = new FakeCommentsRepository();
        createComment = new CreateCommentService(fakeCommentsRepository);
    });

    it('should be able to create a new Comment', async () => {
        const comments = await createComment.execute({
            user_id: 'user_id',
            title: 'VALORIZANDO O ESPAÇO PÚBLICO',
            comment: 'Um bom projeto de iluminação de praças deve contemplar esculturas',
        });

        expect(comments).toHaveProperty('id');
    });
});
