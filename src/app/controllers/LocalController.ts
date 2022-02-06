import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Local from '../models/Local';
class LocalController {
    async list(req: Request, res: Response) {
        const repository = getRepository(Local);
        const lista = await repository.find();
        return res.json(lista);
    }
    async store(req: Request, res: Response) {
        const repository = getRepository(Local);
        const j = repository.create(req.body);
        await repository.save(j);
        return res.json(j);
    }
} export default new LocalController();
