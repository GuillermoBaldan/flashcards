import {
  Controller,
  Post,
  Body,
  Req,
  Param,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { DeckSharingService } from '@services/deck-sharing.service';
import { CreateDeckShareRequestDto } from './dto/create-deck-share-request.dto';
import { ProcessDeckShareResponseDto } from './dto/process-deck-share-response.dto';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '@errors/error-messages';

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
  })
  async createRequest(
    @Body() createDeckShareRequestDto: CreateDeckShareRequestDto,
    @Req() req: Request,
  ) {
    const senderId = req.user.id;
    return this.deckSharingService.createRequest(
      senderId,
      createDeckShareRequestDto.receiverId,
      createDeckShareRequestDto.deckId,
    );
  }

  @Post('request-response/:requestId')
  @ApiOperation({ summary: 'Procesar respuesta a solicitud de compartir mazo' })
  @ApiParam({ name: 'requestId', description: 'ID de la solicitud' })
  @ApiResponse({
    status: 200,
    description: 'Respuesta procesada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud ya procesada o expirada',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuario no autorizado para responder',
  })
  async processResponse(
    @Param('requestId') requestId: string,
    @Body() processDeckShareResponseDto: ProcessDeckShareResponseDto,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    const request = await this.deckSharingService.getRequest(requestId);
    if (request.receiverId !== userId) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS.message,
      );
    }

    return this.deckSharingService.processResponse(
      requestId,
      processDeckShareResponseDto.response,
    );
  }
}
