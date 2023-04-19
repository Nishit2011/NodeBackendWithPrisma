import express from 'express'
import router from './router'
import morgan from "morgan"
import cors from "cors"
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user';

const app = express()

app.use(cors())
app.use(morgan('dev')); // log every request to the console
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.get('/', (req, res) => {
   
    res.status(200).send('<h1>Hello from express</h1>')
})



app.use('/api',protect, router)
app.post('/user',createNewUser)
app.post('/signin',signin)


export default app


