import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class AuthUsersService {
  constructor(
    @Inject(forwardRef(() => UsersRepository))
    private readonly usersRepository: UsersRepository
  ) {}

  findOne(id: string) {
    return this.usersRepository.findById(id);
  }
}
