import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@InputType('UserInput')
export class User {
  @Field(() => ID)
  id?: number

  @Field(() => Int, {nullable: true})
  telegramId?: number

  @Field(() => String,{nullable: true})
  firstName?: string

  @Field(() => String, {nullable: true})
  lastName?: string

  @Field(() => String, {nullable: true})
  userName?: string

  @Field(() => String, {nullable: true})
  chatId?: string

  @Field(() => Date, {nullable: true})
  createdAt: Date;
}