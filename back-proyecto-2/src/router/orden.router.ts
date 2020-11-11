import { Router } from "express";
import OrdenController from "../controller/orden.controller"
const router = Router();

router.get('/orden', OrdenController.getInstance().getAll);
router.get('/orden/:id/', OrdenController.getInstance().getSingle);
router.post('/orden', OrdenController.getInstance().create);
router.put('/orden/:id', OrdenController.getInstance().update);
router.delete('/orden/:id', OrdenController.getInstance().delete);

export default router;