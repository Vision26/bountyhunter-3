const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require('mongoose')

app.use(express.json())
app.use(morgan('dev'))

//connect to DB
mongoose.connect('mongodb://localhost:27017/moviesdb', 
  
() => console.log('Connected to DATA Base')
)


app.use('/movies', require("./routes/movieRouter"))

app.use((err, req, res, next) => {
    return res.send({
        errMsg: err.message
    })
})

app.listen(5000, () => {
    console.log("Server 5000 IS UP AND RUNNING...")
})