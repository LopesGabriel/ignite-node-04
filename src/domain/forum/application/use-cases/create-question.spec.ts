import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: 'author-id-01',
      content: 'Can we create a question?',
      title: 'Question doubt',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value.question.content).toEqual('Can we create a question?')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(
      result.value.question.id,
    )
  })
})
