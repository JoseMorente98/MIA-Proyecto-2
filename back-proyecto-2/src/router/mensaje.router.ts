import { Router } from "express";
import MensajeController from "../controller/mensaje.controller"
const router = Router();

router.get('/mensaje', MensajeController.getInstance().getAll);
router.get('/mensaje/:id/:id2', MensajeController.getInstance().getSingle);
router.post('/mensaje', MensajeController.getInstance().create);
router.put('/mensaje/:id', MensajeController.getInstance().update);
router.delete('/mensaje/:id', MensajeController.getInstance().delete);

export default router;