import apiClient from '../networking/apiClient'
import 'dotenv/config'
import Movie from '../models/Movie'
import { plainToInstance } from 'class-transformer'
import MovieDetail from '../models/MovieDetail'
const API_KEY = process.env.API_KEY || ''

class MoviesController {
    static find = async (movieID: number): Promise<MovieDetail> => {
        return apiClient.get(`/movie/${movieID}?api_key=${API_KEY}&append_to_response=credits`)
            .then(({ data: movieItem }) => plainToInstance(MovieDetail, movieItem, { excludeExtraneousValues: true }))
    }

    static getPopularMovies = async (): Promise<Array<Movie>> => {
        return apiClient.get(`/movie/popular?api_key=${API_KEY}`)
            .then(({ data }) => data.results.map((movieItem: any) => plainToInstance(Movie, movieItem, { excludeExtraneousValues: true })) )
    }

    static getTopRatedMovies = async (): Promise<Array<Movie>> => {
        return apiClient.get(`/movie/top_rated?api_key=${API_KEY}`)
            .then(({ data }) => data.results.map((movieItem: any) => plainToInstance(Movie, movieItem, { excludeExtraneousValues: true })) )

    }

    static getNowPlayingMovies = async (): Promise<Array<Movie>> => {
        return apiClient.get(`/movie/now_playing?api_key=${API_KEY}`)
            .then(({ data }) => data.results.map((movieItem: any) => plainToInstance(Movie, movieItem, { excludeExtraneousValues: true })) )

    }

    static getUpcomingMovies = async (): Promise<Array<Movie>> => {
        return apiClient.get(`/movie/upcoming?api_key=${API_KEY}`)
            .then(({ data }) => data.results.map((movieItem: any) => plainToInstance(Movie, movieItem, { excludeExtraneousValues: true })) )

    }

    static search = async (query: string, page: number): Promise<Array<Movie>> => {
        return apiClient.get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
            .then(({ data }) => data.results.map((movieItem: any) => plainToInstance(Movie, movieItem, { excludeExtraneousValues: true })) )

    }

    static filter = async (genreID:number, page: number): Promise<Array<Movie>> => {
        return apiClient.get(`/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=${genreID}&page=${page}`)
            .then(({ data }) => data.results.map((movieItem: any) => plainToInstance(Movie, movieItem, { excludeExtraneousValues: true })) )

    }
}

export default MoviesController
