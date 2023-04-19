import prisma from '../db'
import { Request, Response } from 'express';
import { comparePassword, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async(req: Request, res: Response)=>{
    console.log("inside createNewUser")
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })
        const token = createJWT(user)
        res.json({token})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }

}

export const signin = async(req: Request,res: Response) =>{
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    if(!user){
        return res.status(401).json({message: "User not found"})
    }
    const isValid = await comparePassword(req.body.password, user.password)
    if(!isValid){
        return res.status(401).json({message: "Invalid credentials"})
    }
    const token = createJWT(user)
    res.json({token})
}   