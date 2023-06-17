import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './create-movie.dto';
import { Movie } from './movie.schema';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    if (createMovieDto.rating < 1 || createMovieDto.rating > 10) {
      throw new HttpException(
        'Rating value must be between 1 to 10',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      return await this.moviesService.create(createMovieDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.moviesService.delete(id);
    return 'Successfully deleted';
  }

  @Put(':id')
  async changeOne(
    @Param('id') id: string,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    await this.moviesService.changeOne(id, createMovieDto);
    return 'Successfully updated';
  }
}
