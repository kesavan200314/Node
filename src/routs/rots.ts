import express from 'express';
import { creatCars, getAllusers } from '../controller/controller';

const router = express.Router();

router.get('/users', getAllusers);

router.post('/cars', creatCars);

export default router;







