import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Query } from '@nestjs/common';

import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { CacheInterceptor } from '@nestjs/cache-manager';
import { FindDonationsQueryDto } from './dto/find-donations-query.dto';
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @ApiOperation({ summary: "Criar nova doação" })
  @Post()
  create(@Body() createDonationDto: CreateDonationDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.donationsService.create(createDonationDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar todas doações" })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() findDonationsQuery: FindDonationsQueryDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.donationsService.findAll(findDonationsQuery, tokenPayload);
  }

  @ApiOperation({ summary: "Visualizar detalhes de uma doação" })
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.donationsService.findOne(id, tokenPayload);
  }

  @ApiOperation({ summary: "Atualizar uma doação" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonationDto: UpdateDonationDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.donationsService.update(id, updateDonationDto, tokenPayload);
  }

  @ApiOperation({ summary: "Deletar uma doação" })
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.donationsService.remove(id, tokenPayload);
  }
}
