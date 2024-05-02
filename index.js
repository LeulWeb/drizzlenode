import express from 'express'
import userRouter from './routes/users.js'



let app = express()

app.use(express.json())


const PORT = process.env.PORT || 5000

app.use(userRouter)


app.listen(5000, ()=>{
    console.log(`server running well port ${PORT} at ${process.env.NODE_ENV} `)
})