import { Controller, Post, Body, Req, UseInterceptors, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { GameService } from 'src/services/games.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { Request } from 'express';
import { CardsService } from 'src/services/cards.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StartGameDto } from './dto/start-game.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CalculateCardsDto } from './dto/calculate-cards.dto';
import { AvailableCardsResponseDto } from './dto/available-cards-response.dto';
import { UpdateCardResultsDto } from './dto/update-card-results.dto';
import { UseGuards } from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly cardsService: CardsService
  ) {}

  @Post('calculate-cards')
  @UseGuards(AuthMiddleware)
  @ApiOperation({ summary: 'Calculate available cards for game' })
  @ApiBody({ type: CalculateCardsDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Available card counts',
    type: AvailableCardsResponseDto
  })
  async calculateAvailableCards(
    @Body() calculateCardsDto: CalculateCardsDto, 
    @Req() req: Request,
  ) {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Usuario no autenticado');
      }
      const userId = req.user.id;
      const result = await this.gameService.calculateAvailableCards(
        calculateCardsDto.deckIds,
        userId,
        calculateCardsDto.gameMode
      );
      return result;
    } catch (error) {
      console.error('Error in calculateAvailableCards controller:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('start')
  @UseGuards(AuthMiddleware)
  @ApiOperation({ summary: 'Start a new game session' })
  @ApiBody({ type: StartGameDto })
  @ApiResponse({ status: 201, description: 'Game session started successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  async startGame(
    @Body() startGameDto: StartGameDto,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    return this.gameService.startGame(
      startGameDto.gameMode,
      startGameDto.difficulty,
      startGameDto.deckIds,
      startGameDto.cardCount,
      userId
    );
  }

  @Post('update-results')
  @UseInterceptors(AuthMiddleware)
  @ApiOperation({ summary: 'Update card results after game' })
  @ApiBody({ type: UpdateCardResultsDto })
  @ApiResponse({ status: 200, description: 'Card results updated successfully' })
  async updateCardResults(
    @Body() updateCardResultsDto: UpdateCardResultsDto,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    return this.gameService.updateCardResults(
      updateCardResultsDto.cardResults,
      userId
    );
  }

  @Post('update-card')
  @UseInterceptors(AuthMiddleware)
  @ApiOperation({ summary: 'Update card difficulty after game interaction' })
  @ApiBody({ type: UpdateCardDto })
  @ApiResponse({ status: 200, description: 'Card updated successfully' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  async updateCard(
    @Body() updateCardDto: UpdateCardDto,
    @Req() req: Request
  ) {
    const userId = req.user.id;
    return this.cardsService.updateCardDifficulty(
      updateCardDto.cardId,
      updateCardDto.isCorrect,
      userId
    );
  }
}
