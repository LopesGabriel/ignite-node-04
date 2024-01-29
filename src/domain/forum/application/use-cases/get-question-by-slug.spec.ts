import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      content: 'Example content',
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({ slug: newQuestion.slug.value })

    expect(result.isRight()).toBe(true)
    expect(result.value.question.content).toEqual('Example content')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(
      result.value.question.id,
    )
  })
})
