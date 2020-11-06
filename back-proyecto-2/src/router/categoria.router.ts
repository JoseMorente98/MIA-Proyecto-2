import { Router } from "express";
import CategoriaController from "../controller/categoria.controller"
const router = Router();

router.get('/categoria', CategoriaController.getInstance().getAll);
router.get('/categoria/:id', CategoriaController.getInstance().getSingle);
router.post('/categoria', CategoriaController.getInstance().create);
router.put('/categoria/:id', CategoriaController.getInstance().update);
router.delete('/categoria/:id', CategoriaController.getInstance().delete);

export default router;