import express from 'express'
import MoviesController from '../controllers/moviesController'

const moviesRouter = express.Router()


moviesRouter.get('/', async (req, res, next) => {
    res.setHeader('Age', 0)
    res.setHeader('Cache-Control', 'max-age=120')
    res.setHeader('x-cache', 'hit')

    try {
        const [
            popularMovies,
            topRatedMovies,
            nowPlayingMovies,
            upcomingMovies
        ] = await Promise.all([
            MoviesController.getPopularMovies(),
            MoviesController.getTopRatedMovies(),
            MoviesController.getNowPlayingMovies(),
            MoviesController.getUpcomingMovies()
        ])

        res.json({
            popularMovies,
            topRatedMovies,
            nowPlayingMovies,
            upcomingMovies,
        })
    } catch (e) {
        next(e)
    }

})

moviesRouter.get('/detail/:movieID', async (req, res, next) => {
    const movieID = Number(req.params['movieID'])
    res.setHeader('Age', 0)
    res.setHeader('Cache-Control', 'max-age=10000')
    res.setHeader('x-cache', 'hit')

    if(isNaN(movieID) || movieID <= 0) {
        return res.status(400).json({ errors: ['movieID is not valid'] })
    }

    try {
        const movie = await MoviesController.find(movieID)
        res.json(movie)
    } catch (e) {
        next(e)
    }
})

moviesRouter.get('/search', async (req, res, next) => {
    const query = req.query['query'] || ''
    const page = Number(req.query['page']) || 1

    if(!query) {
        return res.status(400).json({ errors: ['query must be provided']})
    }

    if(isNaN(page) || page <= 0) {
        return res.status(400).json({ errors: ['page must be greater than zero']})
    }

    try {
        const movies = await MoviesController.search(String(query), page)
        res.json(movies)
    } catch (e) {
        next(e)
    }
})

moviesRouter.get('/filter', async (req, res, next) => {
    const genreID = Number(req.query['genre_id']) || 28
    const page = Number(req.query['page']) || 1

    if(isNaN(page) || page <= 0) {
        return res.status(400).json({ errors: ['page must be greater than zero']})
    }

    res.setHeader('Age', 0)
    res.setHeader('Cache-Control', 'max-age=10000')
    res.setHeader('x-cache', 'hit')

    try {
        const movies = await MoviesController.filter(genreID, page)
        res.send(movies)
    } catch (e) {
        next(e)
    }

})

moviesRouter.get('/popular', async (req, res, next) => {
    res.setHeader('Age', 0)
    res.setHeader('Cache-Control', 'max-age=10000')
    res.setHeader('x-cache', 'hit')

    try {
        const popularMovies = await MoviesController.getPopularMovies()
        res.json(popularMovies)
    } catch (e) {
        next(e)
    }
})


export default moviesRouter
