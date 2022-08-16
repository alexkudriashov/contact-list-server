import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import contactsRouter from './routers/contactsRouter.js'
import userRouter from './routers/userRouter.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())
app.use('/contacts', contactsRouter)
app.use('/user', userRouter)
app.get('/', (req, res)=>{
    res.send('APP IS RUNNING')
})

const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.PASSWORD}@${process.env.MONGO_DB_URL}/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000

const start = () => {
    try {
        app.listen(PORT, async ()=>{
            await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
            console.log(`server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e.message)
    }
}

start()