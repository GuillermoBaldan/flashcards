import { Controller, Post, Body, Req, UseInterceptors, UnauthorizedException, InternalServerErrorException, Get } from '@nestjs/common';
import { GameService } from 'src/services/games.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { Request } from 'express';
import { CardsService } from 'src/services/cards.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StartGameDto } from './dto/start-game.dto';
import { UpdateCardResultsDto } from './dto/update-card-results.dto';
import { UseGuards } from '@nestjs/common';
import { AvailableDecksResponseDto } from './dto/available-decks.dto';

@ApiBearerAuth()
@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly cardsService: CardsService
  ) {}

  @Post('start')
  @UseGuards(AuthMiddleware)
  @ApiOperation({ summary: 'Start a new game session' })
  @ApiBody({ type: StartGameDto })
  @ApiResponse({ status: 201, description: 'Game session started successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  async startGame(
    @Body() { deckIds }: { deckIds: string[] },
    @Req() req: Request
  ) {
    const userId = req.user.id;
    return this.gameService.startGame(deckIds, userId);
  }

  @Post('update-results')
  @UseInterceptors(AuthMiddleware)
  @ApiOperation({ summary: 'Update card results after game' })
  @ApiBody({ type: UpdateCardResultsDto })
  @ApiResponse({ status: 200, description: 'Card results updated successfully' })
  async updateCardResults(
    @Body() updateCardResultsDto: UpdateCardResultsDto,
    @Req() req: Request
  ) {
    const userId = req.user.id;
    return this.gameService.updateCardResults(
      updateCardResultsDto.cardResults,
      userId
    );
  }

  @Get('available-decks')
  @UseGuards(AuthMiddleware)
  @ApiOperation({ summary: 'Get available decks for game' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of available decks with status',
    type: AvailableDecksResponseDto
  })
  async getAvailableDecks(@Req() req: Request) {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Usuario no autenticado');
      }
      const userId = req.user.id;
      return this.gameService.getAvailableDecks(userId);
    } catch (error) {
      console.error('Error in getAvailableDecks controller:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
