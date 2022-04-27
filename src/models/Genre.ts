import {Expose} from 'class-transformer'

export default class Genre {
    @Expose({ name: 'id' })
    id: number

    @Expose({ name: 'name' })
    name: string
}
