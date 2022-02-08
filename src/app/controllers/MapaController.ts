import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Mapa from '../models/Mapa';
import Local from '../models/Local';

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
    async delete(req: Request, res: Response) {
        try {
            const repository = getRepository(Mapa);
            const { id } = req.body;

            const end = await repository.findOne({ where: { "id": id } });

            if (end) {

                await repository.remove(end);

                return res.sendStatus(204);

            } else {

                return res.sendStatus(404);
            }
        } catch (e: unknown) {
            console.log(e);
            return res.sendStatus(500);
        }
    }
} export default new MapaController();
