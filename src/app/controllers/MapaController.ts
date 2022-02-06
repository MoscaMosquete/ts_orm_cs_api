import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Mapa from '../models/Mapa';
class MapaController {
    async list(req: Request, res: Response) {
        const repository = getRepository(Mapa);
        const lista = await repository.find();
        return res.json(lista);
    }
    async store(req: Request, res: Response) {
        const repository = getRepository(Mapa);
        const j = repository.create(req.body);
        await repository.save(j);
        return res.json(j);
    }
} export default new MapaController();
