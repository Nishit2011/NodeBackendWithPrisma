import { Router, Request, Response } from 'express';
import {body, oneOf, validationResult} from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router()

router.get('/product', (req, res) => {
    res.json({message: "Its up!"})
})
router.get('/product/:id', (req, res) => {})
router.post('/product', (req, res) => {})
router.put('/product/:id',
body('name').isString(),
handleInputErrors, 
(req, res) => {
   
})
router.delete('/product/:id', (req, res) => {})


router.get('/update', (req, res) => {})

router.put('/update/:id',
body('title').optional(),
body('body').optional(),
body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),

body('version').optional(), 
(req:Request, res: Response) => {})


router.post('/update', 
body('title').exists(),
body('body').exists(),
(req, res) => {})
router.get('/update/:id', (req, res) => {})
router.delete('/update/:id', (req, res) => {})

router.get('/updatepoint', (req, res) => {})
router.get('/updatepoint/:id', (req, res) => {})

router.put('/updatepoint/:id',
body('name').optional().isString(), 
body('description').optional().isString(),
(req, res) => {})

router.post('/updatepoint', 
body('name').isString(),
body('description').isString(),
body('updateId').exists().isString(),
(req, res) => {})

router.delete('/updatepoint/:id', (req, res) => {})

export default router