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
    it('teste /*/list', async () => {

        var agent = supertest(app);
        const localList = await agent.get('/local/list');
        let mapaList = await agent.get('/mapa/list')
        for (const p of mapaList.body){
            console.log(p.id)
            const thing = await agent.get(`/mapa/4/locals`)
            console.log(thing.body)
            p.locals = thing.body.locals
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
                await agent.post('/local/delete').send(data);
            }

        } 
        if (mapaDel.body.length > 0) {

            for (const p of mapaDel.body) {
                console.log(p);
                const data = { "id": p.id };
                console.log(`Removendo o mapa ${p.name}, id: ${data.id}.`);
                await agent.post('/mapa/delete').send(data);
            }

        }/* else {
            console.log("Não encontrou jogadores cadastrados, cadastrando novo jogador e endereco.");
            const postCreateEndereco = await agent.post('/endereco/store').send({ "id": "0", "cep": "99010010" });
            expect(postCreateEndereco.statusCode).toEqual(200);
            const postFindEndereco = await agent.post('/endereco/find').send({ "cep": "99010010" });
            expect(postFindEndereco.statusCode).toEqual(200);
            console.log(postFindEndereco.body);
            const data = {
                "nickname": "t@g1.com",
                "senha": "11111",
                "pontos": 10,
                "endereco": postFindEndereco.body
            };
            const postCreateJogador = await agent.post('/jogador/store').send(data);
            expect(postCreateJogador.statusCode).toEqual(200);
        } */

    });
});