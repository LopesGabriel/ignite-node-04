import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'

interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId: UniqueEntityId | null
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt: Date | null
}

export class Question extends Entity<QuestionProps> {
  get title() {
    return this.props.title
  }

  set title(value: string) {
    this.title = value
    this.props.slug = Slug.createFromText(value)
    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId(): UniqueEntityId | null {
    return this.props.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    return new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
