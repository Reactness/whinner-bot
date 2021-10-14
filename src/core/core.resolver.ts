import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CoreService } from "./core.service";
import { User } from "../prisma/models";

@Resolver(() => User)
export class CoreResolver {
  constructor(
    private service: CoreService,
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.service.getUsers()
  }

  @Mutation(() => User)
  async createUser(
    @Args({
    name: 'input',
    type: () => User,
  }) input: User): Promise<User> {
    return this.service.create(input);
  }
}