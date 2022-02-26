const express = require('express')
const app = express()
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
dotenv.config()

const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')

mongoose.connect(process.env.MONGO_URL_MY,{useNewUrlParser:true},()=>{
    console.log("connected");
}
)


//Body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.use(helmet())
app.use(morgan("common"))




//Routers
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)







app.listen(process.env.PORT,()=>{
    console.log("backend is running");
})