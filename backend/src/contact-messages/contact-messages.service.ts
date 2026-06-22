import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CREATED_CONTACT_MESSAGE, UPDATED_CONTACT_MESSAGE, DELETED_CONTACT_MESSAGE, NOT_FOUND_CONTACT_MESSAGE } from "./contact-messages.constants";

import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { ContactMessagesRepository } from './contact-messages.repository';
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindContactMessagesQueryDto } from './dto/find-contact-messages-query.dto';

@Injectable()
export class ContactMessagesService {
  constructor(private readonly contactMessagesRepository: ContactMessagesRepository) {}

  async create(createContactMessageDto: CreateContactMessageDto, tokenPayload: TokenPayloadDto) {
    const contactMessageData = {
      ...createContactMessageDto,
    };

    if (createContactMessageDto.email !== tokenPayload.email)
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    const contactMessage = await this.contactMessagesRepository.create(contactMessageData);
    return {
      message: CREATED_CONTACT_MESSAGE,
      contactMessage,
    };
  }

  async findAll(findContactMessagesQuery: FindContactMessagesQueryDto) {
    return await this.contactMessagesRepository.findAll(findContactMessagesQuery);
  }

  async findOne(id: string) {
    const contactMessage = await this.contactMessagesRepository.findById(id);
    if (!contactMessage) throw new NotFoundException(NOT_FOUND_CONTACT_MESSAGE);

    return contactMessage;
  }

  async update(id: string, updateContactMessageDto: UpdateContactMessageDto, tokenPayload: TokenPayloadDto) {
    const contactMessage = await this.contactMessagesRepository.findById(id);
    if (!contactMessage) throw new NotFoundException(NOT_FOUND_CONTACT_MESSAGE);

    if (contactMessage.email !== tokenPayload.email)
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    const updatedContactMessage = await this.contactMessagesRepository.update(id, updateContactMessageDto);
    return {
      message: UPDATED_CONTACT_MESSAGE,
      contactMessage: updatedContactMessage,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const contactMessage = await this.contactMessagesRepository.findById(id);
    if (!contactMessage) throw new NotFoundException(NOT_FOUND_CONTACT_MESSAGE);

    if (contactMessage.email !== tokenPayload.email)
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    await this.contactMessagesRepository.delete(id);
    return {
      message: DELETED_CONTACT_MESSAGE,
    }
  }
}
