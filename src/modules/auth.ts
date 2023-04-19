import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'
// Extend the Request type to include a user property
declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload;
      }
    }
  }


  export const comparePassword = (password: string | Buffer, hash: string) =>{
    return bcrypt.compare(password, hash)
  }

 export const hashPassword = (password: string | Buffer) => {
    return bcrypt.hash(password, 10)
  }
  

export const createJWT = (user: { id: any; username: any; }) =>{
    const token  = jwt.sign(
        {id: user.id, username: user.username}, 
        process.env.JWT_SECRET || 'not_from_env', 
        {expiresIn: '1h'}
        )
        return token
}


export const protect = (req: Request, res: Response, next: NextFunction) =>{
    const bearer = req.headers.authorization
    if(!bearer || !bearer.startsWith('Bearer ')){

        return res.status(401).json({message: "Not authorized"})
    }
    try {
        const token = bearer.split('Bearer ')[1].trim()
        const data = jwt.verify(token, process.env.JWT_SECRET || 'not_from_env')
       
        req.user = data as JwtPayload
        next()
        }
      
    catch (error) {
        return res.status(401).json({message: "Not authorized"})
    }

   
}