// collections.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateCollectionDto } from './dto/create-collection.dto/create-collection.dto';
import { CollectionsService } from './collection.service';
import { Collection } from './models/collection.model';

@Controller('collections')
@ApiTags('Collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new collection' })
  @ApiBody({ type: CreateCollectionDto })
  @ApiResponse({
    status: 201,
    description: 'The collection has been successfully created',
    type: Collection,
  })
  create(@Body() createCollectionDto: CreateCollectionDto): Collection {
    return this.collectionsService.create(createCollectionDto);
  }
}
