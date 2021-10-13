import express from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import winston from 'winston'
import home from '../routes/home'
import login from '../routes/login'
    
import routeHandler from './routeHandler'

 
const app = express()

// Cors
app.use(cors())

// Secure HTTP headers
app.use(helmet());
 
app.use(express.json())

// Middleware - Token
app.use(routeHandler)

 
app.use(home)
app.use(login)


export default app