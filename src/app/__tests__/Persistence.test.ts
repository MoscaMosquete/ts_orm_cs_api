import { app, setup } from "../../index"
import { afterAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import { getConnection } from "typeorm"

describe("persistence test", () => {

    afterAll(async () => {
        await getConnection().close()

    });
    beforeAll(async () => {
        await setup()
    });
    it('teste /*/list, além de link local-mapa', async () => {

        var agent = supertest(app);
        const localList = await agent.get('/local/list');
        let mapaList = await agent.get('/mapa/list')
        if(mapaList.body.length > 0 && localList.body.length > 0){
            console.log(`Conectando o local 1 ao mapa 1`)
            await agent.post('/mapa/1/local/1')

        }
        for (let p of mapaList.body){
            p.locals = []
            var thing = await agent.get(`/mapa/${p.id}/locals`)

            for (const lc of thing.body.locals){
                console.log(`lc: ${lc.id}`)
                p.locals.push(lc.id)
            }           
            //p.locals = thing.body.locals
        }
        console.log('Mapas:\n', mapaList.body)
        console.log('Locais:\n', localList.body)
    });
    it('teste /*/delete e /*/store', async () => {

        var agent = supertest(app);
        const localDel = await agent.get('/local/list');
        const mapaDel = await agent.get('/mapa/list')
        console.log(`Encontrou ${localDel.body.length} locais cadastrados.`);
        console.log(`Encontrou ${mapaDel.body.length} mapas cadastrados.`);

        if (localDel.body.length > 0) {
            
            for (const p of localDel.body) {
                console.log(p);
                const data = { "id": p.id };
                console.log(`Removendo o local ${p.name}, id: ${data.id}.`);
                await agent.delete(`/local/delete/${p.id}`)
            } 

        } else {
            console.log("Não encontrou locais cadastrados, cadastrando novo local.");
            const data = {
                "id": "1",
                "name": "local1",
                "latitude": "100",
                "longitude": "50"
            };
            const postCreateJogador = await agent.post('/local/store').send(data);
            expect(postCreateJogador.statusCode).toEqual(200);
        } 
        if (mapaDel.body.length > 0) {

            for (const p of mapaDel.body) {
                console.log(p);
                const data = { "id": p.id };
                console.log(`Removendo o mapa ${p.name}, id: ${data.id}.`);
                await agent.delete(`/mapa/delete/${p.id}`)
            }

        } else {
            console.log("Não encontrou mapas cadastrados, cadastrando novo mapa.");
            const data = {
                "id": "1",
                "name": "mapa1",
            };
            const postCreateJogador = await agent.post('/mapa/store').send(data);
            expect(postCreateJogador.statusCode).toEqual(200);
        } 
        

    });
});