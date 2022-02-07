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
    it('teste /local/list e /local/delete', async () => {

        var agent = supertest(app);
        const localList = await agent.get('/local/list');
        expect(localList.statusCode).toEqual(200);
        if (localList.body.length > 0) {

            for (const e of localList.body) {
                console.log(e);
                const data = { "id": e.id };
                const localDelete = await agent.post('/local/delete').send(data);
                expect(localDelete.statusCode).toEqual(204);
            }

        } else {
            const data = { "name": "nome", "latitude": "1", "longitude": "2", "mapaId": null, "objetivoId": null };
            const postCreate = await agent.post('/local/store').send(data);
            expect(postCreate.statusCode).toEqual(200);
        }

    });
    it('teste /jogador/list e /jogador/delete', async () => {

        var agent = supertest(app);
        const ret = await agent.post('/jogador/list');
        expect(ret.statusCode).toEqual(200);
        if (ret.body.length > 0) {
            console.log(`Encontrou ${ret.body.length} jogadores
cadastrados.`);

            for (const p of ret.body) {
                //console.log(p);
                const data = { "nickname": p.nickname };
                console.log(`Removendo o jogador ${data.nickname}.`);
                const localDeleteJogador = await agent.post('/jogador/delete').send(data);
                expect(localDeleteJogador.statusCode).toEqual(204);
                //esse remocao pode gerar alguma violacao de chave, caso o endereco esteja sendo referenciado por outro jogador.
                //ou aplicar a estratégia de cascade no ManytoOne
                console.log(`Removendo o endereco ${p.endereco.id}.`);
                const localDeleteEndereco = await agent.post('/endereco/delete').send({ "id": p.endereco.id });
                expect(localDeleteEndereco.statusCode).toEqual(204);
            }

        } else {
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
        }

    });
});