import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Mapa from '../models/Mapa';
import Local from '../models/Local';
import { app } from "../../index";

class LocalMapaJoin {
    async linklocal(req: Request, res: Response) {
        const { localId, mapaId } = req.params
        const local = await Local.findOne(parseInt(localId))
        const mapa = await Mapa.findOne(parseInt(mapaId))

        if (!local || !mapa) {
            return res.sendStatus(404).json({
                msg: "Mapa ou local não encontrado"
            })
        }
        mapa.locals = [
            local
        ]

        await mapa.save()

        return res.json({ msg: "Mapa e local conectados" })
    }
}
export default new LocalMapaJoin