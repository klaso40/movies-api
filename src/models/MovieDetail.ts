import Movie from './Movie'
import { Expose, plainToInstance, Transform } from 'class-transformer'
import Genre from './Genre'
import Actor from './Actor'

export default class MovieDetail extends Movie {

    @Expose( { name: 'budget' })
    @Transform(({ value }) =>  new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(value))
    budget: number

    @Expose({ name: 'runtime' })
    runtime: number

    @Expose({ name: 'release_date' })
    releaseDate: string

    @Expose({ name: 'genres' })
    @Transform(({ value }) => plainToInstance(Genre, value, { excludeExtraneousValues: true }) )
    genres: Array<Genre>

    @Expose({ name: 'credits' })
    @Transform(({ value }) => {
        return plainToInstance(Actor, value.cast, { excludeExtraneousValues: true })
    })
    cast: Array<Actor>
}
