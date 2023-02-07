const express = require("express")
const movieRouter = express.Router()
const Movie = require('../model/movie.js')

movieRouter.get("/", (req, res, next) => {
 Movie.find((err, moviess) => {

     if(err){
         res.status(500)
        return next(err)
     }
     return res.status(200).send(moviess)

 })
})

movieRouter.post("/", (req, res, next) => {
    const createmovie = new Movie(req.body)
    createmovie.save((err, newMovie) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newMovie)
    })
   })

//  GET ONE
// movieRouter.get("/:movieId", (req, res, next) => {
// const movieId = req.params.movieId
// const addMovie = movies.find(pick => pick._id === movieId)
// if(!addMovie){
//     const error = new Error("Item Not Found.")
//     return next(error)
// }
// res.status(200)
// res.send(addMovie)
// })

movieRouter.get("/search/genre", (req, res, next) => {
 Movie.find({genre: req.query.genre}, (err, movies) => {
     if(err){
         res.status(500)
         return next(err)
     }
     return res.status(200).send(movies)
 })
})

// movieRouter.post("/", (req, res) => {
//     const add = req.body
//     add._id = uuidv4()
//     movies.push(add)
//     res.status(201)
//     res.send(add)
// })

movieRouter.delete("/:movieId", (req, res, next) => {
    Movie.findOneAndDelete({_id: req.params.movieId}, (err, deleteItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(`${deleteItem.title} Deleted.`)
    })
})

movieRouter.put("/:movieId", (req, res, next) => {
    Movie.findOneAndUpdate(
        { _id: req.params.movieId }, //find this one to update
        req.body, //update the object with this data
        { new: true }, //send back the updated version
        (err, updatedMovie) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedMovie)
        }

    )
})

module.exports = movieRouter

//Before mongoDB practice examples:
// movieRouter.delete("/:movieId", (req, res) => {
//     const movieParams = req.params.movieId
//     const movieIndex = movies.findIndex(mov => mov._id === movieParams)
//     movies.splice(movieIndex, 1)
//     res.send("Movie Deleted.")
// })

// movieRouter.put("/:movieId", (req, res) => {
//     const movParam = req.params.movieId
//     const movIndex = movies.findIndex(movi => movi._id === movParam)
//     const movReq = req.body
//     const movieObjSubmit = Object.assign(movies[movIndex], movReq)
//     res.send(movieObjSubmit)
// })

// movieRouter.get("/search/type", (req, res) => {
//     const movieQuery = req.query.type
//     const getSpecificType = movies.filter(movie => movie.type === movieQuery)
//     res.send(getSpecificType)
// })