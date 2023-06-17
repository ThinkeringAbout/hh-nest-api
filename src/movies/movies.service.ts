import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import { CreateMovieDto } from './create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto);
    return createdMovie.save();
  }

  async findAll(sort: string): Promise<Movie[]> {
    const sortings = {
      asc: 1,
      desc: -1,
    };
    if (sortings[sort]) {
      return this.movieModel.find().sort({ rating: sortings[sort] }).exec();
    }
    return this.movieModel.find().exec();
  }

  async findOne(id: string): Promise<Movie> {
    return this.movieModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.movieModel.findByIdAndDelete(id).exec();
  }

  async changeOne(id: string, update: Movie) {
    return this.movieModel.findByIdAndUpdate(id, update);
  }
}
