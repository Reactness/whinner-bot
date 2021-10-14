import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Message {
  @Field(() => Int)
  id?: number

  @Field(() => Int)
  user: string

  @Field(() => String, {nullable: true})
  message?: string;

  @Field(() => String, {nullable: true})
  response?: string;

}