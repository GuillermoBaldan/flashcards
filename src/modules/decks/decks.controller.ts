import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Req,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ReadDeckDto } from './dto/read-deck.dto';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { DecksService } from 'src/services/decks.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { Request } from 'express';

@Controller('decks')
@ApiTags('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new deck' })
  @ApiBody({ type: CreateDeckDto })
  @ApiResponse({
    status: 201,
    description: 'The deck has been successfully created',
    type: ReadDeckDto,
  })
  @UseInterceptors(AuthMiddleware)
  async create(
    @Body() createDeckDto: CreateDeckDto,
    @Req() req: Request,
  ): Promise<ReadDeckDto> {
    const userId = req.user.id;
    return this.decksService.create(createDeckDto, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a deck by ID' })
  @ApiParam({
    name: 'id',
    description: 'Deck ID',
    example: '609b5b65b20e14655c949a8e',
  })
  @ApiResponse({
    status: 200,
    description: 'The deck has been successfully retrieved',
    type: ReadDeckDto,
  })
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ReadDeckDto> {
    const userId = req.user.id;
    return this.decksService.findOne(id, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all decks of the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of decks',
    type: ReadDeckDto,
    isArray: true,
  })
  @UseInterceptors(AuthMiddleware)
  async findAllByUser(@Req() req: Request): Promise<ReadDeckDto[]> {
    const userId = req.user.id;
    return this.decksService.findByUserId(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a deck by ID' })
  @ApiParam({
    name: 'id',
    description: 'Deck ID',
    example: '609b5b65b20e14655c949a8e',
  })
  @ApiBody({ type: UpdateDeckDto })
  @ApiResponse({
    status: 200,
    description: 'The deck has been successfully updated',
    type: ReadDeckDto,
  })
  @UseInterceptors(AuthMiddleware)
  async update(
    @Param('id') id: string,
    @Body() updateDeckDto: UpdateDeckDto,
    @Req() req: Request,
  ): Promise<ReadDeckDto> {
    const userId = req.user.id;
    return this.decksService.update(id, updateDeckDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a deck by ID' })
  @ApiParam({
    name: 'id',
    description: 'Deck ID',
    example: '609b5b65b20e14655c949a8e',
  })
  @ApiResponse({
    status: 200,
    description: 'The deck has been successfully deleted',
  })
  @UseInterceptors(AuthMiddleware)
  async remove(@Param('id') id: string, @Req() req: Request): Promise<void> {
    const userId = req.user.id;
    return this.decksService.remove(id, userId);
  }
}
