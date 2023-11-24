import { CreateQuestionUseCase } from './create-question'
import { QuestionRepository } from '../repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

const fakeQuestionsRepository: QuestionRepository = {
  create: async (question: Question) => {},
}

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: 'author-id-01',
    content: 'Can we create a question?',
    title: 'Question doubt',
  })

  expect(question.content).toEqual('Can we create a question?')
})
