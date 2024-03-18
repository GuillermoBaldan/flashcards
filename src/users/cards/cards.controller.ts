import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateCardDto } from './dto/create-card.dto/create-card.dto';
import { CardsService } from './cards.service';
import { Card } from './models/cards.model';

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
    type: Card,
  })
  create(@Body() createCardDto: CreateCardDto): Card {
    return this.cardsService.create(createCardDto);
  }
}
