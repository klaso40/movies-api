import {Expose, Transform} from 'class-transformer'

export default class Actor {
    @Expose({ name: 'id' })
    id: number

    @Expose({ name: 'name' })
    name: string

    @Expose({ name: 'character' })
    characterName: string

    @Expose({ name: 'profile_path' })
    @Transform(({ value }) => `https://image.tmdb.org/t/p/w200${value}`)
    profilePhoto: string
}
