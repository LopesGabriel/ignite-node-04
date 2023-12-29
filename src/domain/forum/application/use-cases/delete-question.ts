import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseArgs {
  questionId: string
  authorId: string
}

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseArgs): Promise<void> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question does not exists')
    }

    if (authorId !== question.authorId.toValue()) {
      throw new Error('Not allowed')
    }

    await this.questionsRepository.delete(question)
  }
}
