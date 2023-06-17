import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Render,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './create-movie.dto';
import { Movie } from './movie.schema';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from 'src/helpers/filename';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/',
        filename: Helper.customFileName,
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    if (createMovieDto.rating < 1 || createMovieDto.rating > 10) {
      throw new HttpException(
        'Rating value must be between 1 to 10',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      createMovieDto.img = file.filename;
      const movie = await this.moviesService.create(createMovieDto);
      return movie;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Query() params: any): Promise<Movie[]> {
    return this.moviesService.findAll(params.sort);
  }

  @Get(':id')
  @Render('index')
  async findOne(@Param('id') id: string) {
    const movie = await this.moviesService.findOne(id);
    return {
      message: movie,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.moviesService.delete(id);
    return 'Successfully deleted';
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async changeOne(
    @Param('id') id: string,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    await this.moviesService.changeOne(id, createMovieDto);
    return 'Successfully updated';
  }
}
