import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Round from '../models/Round';
class RoundController {
    async list(req: Request, res: Response) {
        const repository = getRepository(Round);
        const lista = await repository.find();
        return res.json(lista);
    }
    async store(req: Request, res: Response) {
        const repository = getRepository(Round);
        const j = repository.create(req.body);
        await repository.save(j);
        return res.json(j);
    }
} export default new RoundController();