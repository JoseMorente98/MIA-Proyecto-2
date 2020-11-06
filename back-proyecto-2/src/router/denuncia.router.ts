import { Router } from "express";
import DenunciaController from "../controller/denuncia.controller"
const router = Router();

router.get('/denuncia', DenunciaController.getInstance().getAll);
router.get('/denuncia/:id', DenunciaController.getInstance().getSingle);
router.post('/denuncia', DenunciaController.getInstance().create);
router.put('/denuncia/:id', DenunciaController.getInstance().update);
router.delete('/denuncia/:id', DenunciaController.getInstance().delete);

export default router;