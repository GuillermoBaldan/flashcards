import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ReadCardDto } from './dto/read-card.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsService } from 'src/services/cards.service';
import { Request } from 'express';
import { Card } from './entities/cards.entity';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { SanitizeMiddleware } from 'src/middlewares/sanitize.middleware';

@Controller('cards')
@ApiTags('Cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiBody({ type: CreateCardDto })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully created',
    type: ReadCardDto,
  })
  @UseInterceptors(AuthMiddleware, SanitizeMiddleware)
  async create(
    @Body() createCardDto: CreateCardDto,
    @Req() req: Request,
  ): Promise<ReadCardDto> {
    const userId = req.user.id;
    return this.cardsService.create(createCardDto, userId);
  }

  @Get('deck/:deckId')
  @ApiOperation({ summary: 'Get all cards by deck ID' })
  @ApiParam({
    name: 'deckId',
    description: 'Deck ID',
    example: '6123456789abcdef01234567',
  })
  @ApiResponse({
    status: 200,
    description: 'All cards have been successfully retrieved',
    type: [Card],
  })
  async findByDeckId(
    @Param('deckId') deckId: string,
    @Req() req: Request,
  ): Promise<ReadCardDto[]> {
    const userId = req.user.id;
    return this.cardsService.findByDeckId(deckId, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by ID' })
  @ApiParam({
    name: 'id',
    description: 'Card ID',
    example: '6123456789abcdef01234567',
  })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully retrieved',
    type: Card,
  })
  async findOne(@Param('id') id: string, @Req() req: Request): Promise<Card> {
    const userId = req.user.id;
    return this.cardsService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a card by ID' })
  @ApiParam({
    name: 'id',
    description: 'Card ID',
    example: '6123456789abcdef01234567',
  })
  @ApiBody({ type: UpdateCardDto })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully updated',
    type: Card,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @Req() req: Request,
  ): Promise<Card> {
    const userId = req.user.id;
    return this.cardsService.update(id, updateCardDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a card by ID' })
  @ApiParam({
    name: 'id',
    description: 'Card ID',
    example: '6123456789abcdef01234567',
  })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully deleted',
  })
  async remove(@Param('id') id: string, @Req() req: Request): Promise<void> {
    const userId = req.user.id;
    return this.cardsService.remove(id, userId);
  }
}
