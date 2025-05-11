import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { DeckSharingService } from '@services/deck-sharing.service';
import { CreateDeckShareRequestDto } from '@modules/deck-sharing/dto/create-deck-share-request.dto';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '@modules/deck-sharing/dto/error-response.dto';

@Controller('share-deck')
@UseGuards(AuthMiddleware)
export class DeckSharingController {
  constructor(private readonly deckSharingService: DeckSharingService) {}

  @Post('request')
  @ApiOperation({ summary: 'Crear solicitud para compartir mazo' })
  @ApiResponse({
    status: 201,
    description: 'Solicitud creada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o solicitud duplicada',
    type: ErrorResponseDto,
  })
  async createRequest(
    @Body() createDeckShareRequestDto: CreateDeckShareRequestDto,
    @Req() req: Request,
  ) {
    try {
      const senderId = req.user.id;
      return await this.deckSharingService.createRequest(
        senderId,
        createDeckShareRequestDto.receiverId,
        createDeckShareRequestDto.deckId,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException({
          statusCode: error.getStatus(),
          message: error.message,
          error: 'Bad Request',
        });
      }
      throw error;
    }
  }
}
