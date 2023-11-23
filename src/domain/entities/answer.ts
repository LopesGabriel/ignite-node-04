import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface AnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt: Date | null
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content
      .substring(0, 120)
      .trimEnd()
      .concat('...')
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  static create(props: Optional<AnswerProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityId) {
    return new Answer({
      ...props,
      createdAt: new Date(),
      updatedAt: null,
    }, id)
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
