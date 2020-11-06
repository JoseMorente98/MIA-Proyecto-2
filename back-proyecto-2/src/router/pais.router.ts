import { Router } from "express";
import PaisController from "../controller/pais.controller"
const router = Router();

router.get('/pais', PaisController.getInstance().getAll);
router.get('/pais/:id', PaisController.getInstance().getSingle);
router.post('/pais', PaisController.getInstance().create);
router.put('/pais/:id', PaisController.getInstance().update);
router.delete('/pais/:id', PaisController.getInstance().delete);

export default router;