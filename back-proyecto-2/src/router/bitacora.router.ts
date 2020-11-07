import { Router } from "express";
import BitacoraController from "../controller/bitacora.controller"
const router = Router();

router.get('/bitacora', BitacoraController.getInstance().getAll);
router.get('/bitacora/:id', BitacoraController.getInstance().getSingle);
router.post('/bitacora', BitacoraController.getInstance().create);
router.put('/bitacora/:id', BitacoraController.getInstance().update);
router.delete('/bitacora/:id', BitacoraController.getInstance().delete);

export default router;