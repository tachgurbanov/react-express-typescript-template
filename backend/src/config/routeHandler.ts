import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from './../config/token_key';


const routeHandler = (req: Request, res: Response, next: NextFunction) => {

 
    if (req.url === '/login') {
        return next();
    } else {
      
        let token = '';

        const header = req.headers['authorization'];
        if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            token = bearer[1];
        }

        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }


        jwt.verify(token, TOKEN_KEY, function (err, decoded) {

         
            if (err) {
                return res.status(401).send({
                    auth: false,
                    message: 'Failed to authenticate token',
                    code: err.name
                });
            }

            next();
        });
    }

};

export default routeHandler;