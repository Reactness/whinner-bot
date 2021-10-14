import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@InputType('UserInput')
export class User {
  @Field(() => Int)
  id: number

  @Field(() => String,{nullable: true})
  firstName: string

  @Field(() => String, {nullable: true})
  lastName: string

  @Field(() => String, {nullable: true})
  userName: string

  @Field(() => Date, {nullable: true})
  createdAt: Date;
}