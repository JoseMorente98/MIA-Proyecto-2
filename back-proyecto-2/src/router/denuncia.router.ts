import { Router } from "express";
import DenunciaController from "../controller/denuncia.controller"
const router = Router();

router.get('/denuncia', DenunciaController.getInstance().getAll);
router.get('/denuncia/:id/:id2', DenunciaController.getInstance().getSingle);
router.post('/denuncia', DenunciaController.getInstance().create);
router.put('/denuncia/:id', DenunciaController.getInstance().update);
router.put('/denuncia/bloquear/:id', DenunciaController.getInstance().bloquear);
router.delete('/denuncia/:id', DenunciaController.getInstance().delete);

export default router;