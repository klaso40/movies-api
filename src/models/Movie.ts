import { Expose, Transform } from 'class-transformer';

export default class Movie {

    @Expose({ name: 'id' })
    id: number

    @Expose({ name: 'title' })
    name: string

    @Expose({ name: 'poster_path' })
    @Transform(({ value }) => `https://image.tmdb.org/t/p/w500${value}`)
    posterURL: string

    @Expose({ name: 'backdrop_path' })
    @Transform(({ value }) => `https://image.tmdb.org/t/p/w500${value}`)
    backdropURL: string

    @Expose({ name: 'vote_average' })
    @Transform(({ value }) => {
        const rating = (value / 10) * 5
        const ratingRounded = Math.round(rating)
        if(ratingRounded === 5) {
            return rating
        } else if(rating - ratingRounded < 0.5 && rating - ratingRounded > 0) {
            return ratingRounded + 0.5 <= 5 ? ratingRounded + 0.5 : 5
        } else {
            return ratingRounded
        }
    })
    rating: number

    @Expose({ name: 'overview' })
    overview: string
}
