import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { HashService } from "src/auth/hash/hash.service";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import {
  CREATE_USER_CONFLICT_MESSAGE,
  CREATED_USER_MESSAGE,
  DELETED_USER_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  UPDATE_USER_CONFLICT_MESSAGE,
  UPDATED_USER_MESSAGE,
  USER_ADMIN_ROLE,
  USER_ROLE,
} from "./user.constants";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.findByEmail(
      createUserDto.email
    );
    if (userExists) throw new ConflictException(CREATE_USER_CONFLICT_MESSAGE);

    const hashPassword = await this.hashService.hash(createUserDto.password);
    const userData = {
      ...createUserDto,
      password: hashPassword,
      role: USER_ROLE,
    };

    const user = await this.usersRepository.create(userData as any);
    return {
      message: CREATED_USER_MESSAGE,
      user,
    };
  }

  async findAll(findUsersQuery: FindUsersQueryDto) {
    return await this.usersRepository.findAll(findUsersQuery);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException(NOT_FOUND_USER_MESSAGE);
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE && id !== tokenPayload.id) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const userExists = await this.usersRepository.findById(id);
    if (!userExists) throw new NotFoundException(NOT_FOUND_USER_MESSAGE);

    if (updateUserDto.email) {
      const emailExists = await this.usersRepository.findByEmail(
        updateUserDto.email
      );
      if (emailExists)
        throw new ConflictException(UPDATE_USER_CONFLICT_MESSAGE);
    }

    if (updateUserDto.password) {
      const passwordHash = await this.hashService.hash(updateUserDto.password);
      updateUserDto.password = passwordHash;
    }

    const updatedUser = await this.usersRepository.update(id, updateUserDto);
    return {
      message: UPDATED_USER_MESSAGE,
      user: updatedUser,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE && id !== tokenPayload.id) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const userExists = await this.usersRepository.findById(id);
    if (!userExists) throw new NotFoundException(NOT_FOUND_USER_MESSAGE);

    await this.usersRepository.delete(id);
    return {
      message: DELETED_USER_MESSAGE,
    };
  }
}
