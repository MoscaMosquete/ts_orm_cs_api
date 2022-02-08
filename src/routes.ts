import {Router} from 'express'
import JogadorController from './app/controllers/JogadorController'
import AuthController from './app/controllers/AuthController'
import EnderecoController from './app/controllers/EnderecoController'
import PatenteController from './app/controllers/PatenteController'
import CompraController from './app/controllers/CompraController'
import ArtefatoController from './app/controllers/ArtefatoController'
import PartidaController from './app/controllers/PartidaController'
import ObjetivoController from './app/controllers/ObjetivoController'
import RoundController from './app/controllers/RoundController'
import ResultadoController from './app/controllers/ResultadoController'
import LocalController from './app/controllers/LocalController'
import MapaController from './app/controllers/MapaController'
import LocalMapaJoinController from './app/controllers/LocalMapaJoinController'

const router = Router();

router.post('/auth', AuthController.authenticate);
router.post('/jogador/store', JogadorController.store);
router.post('/jogador/update', JogadorController.update);
router.post('/jogador/delete', JogadorController.delete);
router.get('/jogador/list', JogadorController.list);
router.post('/endereco/store', EnderecoController.store);
router.get('/endereco/list', EnderecoController.list);
router.post('/patente/store', PatenteController.store);
router.get('/patente/list', PatenteController.list);
router.post('/compra/store', CompraController.store);
router.get('/compra/list', CompraController.list);
router.post('/artefato/store', ArtefatoController.store);
router.get('/artefato/list', ArtefatoController.list);
router.post('/artefato/update', ArtefatoController.update);
router.post('/partida/store', PartidaController.store);
router.get('/partida/list', PartidaController.list);
router.post('/objetivo/store', ObjetivoController.store);
router.get('/objetivo/list', ObjetivoController.list);
router.post('/round/store', RoundController.store);
router.get('/round/list', RoundController.list);
router.post('/resultado/store', ResultadoController.store);
router.get('/resultado/list', ResultadoController.list);
router.post('/endereco/delete', EnderecoController.delete);
router.post('/endereco/find', EnderecoController.find);
router.post('/mapa/store', MapaController.store);
router.get('/mapa/list', MapaController.list);
router.delete('/mapa/delete/:mapaId', MapaController.delete)
router.post('/local/store', LocalController.store);
router.get('/local/list', LocalController.list);
router.delete('/local/delete/:localId', LocalController.delete);
router.post('/mapa/:mapaId/local/:localId', LocalMapaJoinController.linklocal)
router.get('/mapa/:mapaId/locals', LocalMapaJoinController.list)

export default router;