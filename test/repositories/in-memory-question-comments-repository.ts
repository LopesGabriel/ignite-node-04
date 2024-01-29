import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string): Promise<QuestionComment | null> {
    return this.items.find((question) => question.id.toValue() === id) ?? null
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
    return questionComment
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    this.items = this.items.filter(
      (q) => q.id.toValue() !== questionComment.id.toValue(),
    )
  }
}
