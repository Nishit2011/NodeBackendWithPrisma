import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import { nextTick } from "process"

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) =>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
        next()
    }
   
}