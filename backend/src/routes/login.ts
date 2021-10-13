import express from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from './../config/token_key';


const routes = express.Router()

routes.post('/login', (req, res) => {
 
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Authorization error' })
    }

 
    const base64Credentials = req.headers.authorization.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    let [username, password] = credentials.split(':')

  
    

    // Password  Hash sha256
    password = crypto.createHash('sha256').update(password).digest('hex')
console.log(password);

    // Username: admin
    // Password: admin
    //
 
    if (username === 'admin' && password === '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918') {

 
        const id = 'user_id'

        const token = jwt.sign({ id }, TOKEN_KEY, {
            expiresIn: (req.body.remember) ? '7d' : '24h'
        })

        res.status(200).send({ auth: true, token: token })

        return
    }

 
    res.status(401).json({ 'error': 'Incorrect username or password' })

})

export default routes