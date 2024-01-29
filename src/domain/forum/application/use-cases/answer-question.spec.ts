import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      content: "Yes, it's possible to create questions",
      instructorId: 'instructor-01',
      questionId: 'question-01',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0].id).toEqual(
      result.value.answer.id,
    )
  })
})
