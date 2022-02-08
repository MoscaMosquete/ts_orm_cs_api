import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import Mapa from '../models/Mapa';
import Local from '../models/Local';
import { app } from "../../index";

class LocalMapaJoin {
    async linklocal(req: Request, res: Response) {
        const { localId, mapaId } = req.params
        const local = await Local.findOne(parseInt(localId))
        const mapa = await Mapa.findOne(parseInt(mapaId))
        const formerLocal = await createQueryBuilder('tb_mapa')
        .select('tb_mapa.id')
        .from(Mapa, 'tb_mapa')
        .leftJoinAndSelect('tb_mapa.locals', 'locals')
        .where('tb_mapa.id = :mapa_id', { mapa_id: mapaId })
        .getMany()
        console.log (formerLocal)
        let euDesisto = formerLocal[0].locals

        if (!local || !mapa) {
            return res.sendStatus(404).json({
                msg: "Mapa ou local não encontrado"
            })
        }
        mapa.locals = [
            ...euDesisto,
            local
        ]

        await mapa.save()

        return res.json({ msg: "Mapa e local conectados" })
    }
    async list(req: Request, res: Response) {
        const { mapaId } = req.params
        const localMapLink = await createQueryBuilder('tb_mapa')
            .select('tb_mapa.id')
            .from(Mapa, 'tb_mapa')
            .leftJoinAndSelect('tb_mapa.locals', 'locals')
            .where('tb_mapa.id = :mapa_id', { mapa_id: mapaId })
            .getMany()

            return res.json(localMapLink)
    }
}
export default new LocalMapaJoin