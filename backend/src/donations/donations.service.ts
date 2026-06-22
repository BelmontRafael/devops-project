import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CREATED_DONATION, UPDATED_DONATION, DELETED_DONATION, NOT_FOUND_DONATION } from "./donation.constants";

import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationsRepository } from './donations.repository';
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { FindDonationsQueryDto } from './dto/find-donations-query.dto';

@Injectable()
export class DonationsService {
  constructor(private readonly donationsRepository: DonationsRepository) {}

  async create(createDonationDto: CreateDonationDto, tokenPayload: TokenPayloadDto) {
    const donationData = {
      ...createDonationDto,
    };

    if (createDonationDto.userId !== tokenPayload.id)
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    const donation = await this.donationsRepository.create(donationData);
    return {
      message: CREATED_DONATION,
      donation,
    };
  }

  async findAll(findDonationsQuery: FindDonationsQueryDto, tokenPayload: TokenPayloadDto) {
    if (
      tokenPayload.role !== USER_ADMIN_ROLE
    ) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    return await this.donationsRepository.findAll(findDonationsQuery);
  }

  async findOne(id: string, tokenPayload: TokenPayloadDto) {
    const donation = await this.donationsRepository.findById(id);
    if (!donation) throw new NotFoundException(NOT_FOUND_DONATION);

    if (
      tokenPayload.role !== USER_ADMIN_ROLE
    ) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    return donation;
  }

  async update(id: string, updateDonationDto: UpdateDonationDto, tokenPayload: TokenPayloadDto) {
    const donation = await this.donationsRepository.findById(id);
    if (!donation) throw new NotFoundException(NOT_FOUND_DONATION);

    if (
      tokenPayload.role !== USER_ADMIN_ROLE
    ) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const updatedDonation = await this.donationsRepository.update(id, updateDonationDto);
    return {
      message: UPDATED_DONATION,
      donation: updatedDonation,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const donation = await this.donationsRepository.findById(id);
    if (!donation) throw new NotFoundException(NOT_FOUND_DONATION);

    if (
      tokenPayload.role !== USER_ADMIN_ROLE
    ) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    await this.donationsRepository.delete(id);
    return {
      message: DELETED_DONATION,
    };
  }
}
