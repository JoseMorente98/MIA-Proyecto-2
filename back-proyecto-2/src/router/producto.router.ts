import { Router } from "express";
import ProductoController from "../controller/producto.controller"
const router = Router();

router.get('/producto', ProductoController.getInstance().getAll);
router.get('/producto/:id', ProductoController.getInstance().getSingle);
router.get('/producto/categoria/:id', ProductoController.getInstance().getAllCategorias);
router.get('/ascendente', ProductoController.getInstance().getAllASC);
router.get('/descendente', ProductoController.getInstance().getAllDESC);
router.post('/producto', ProductoController.getInstance().create);
router.put('/producto/:id', ProductoController.getInstance().update);
router.delete('/producto/:id', ProductoController.getInstance().delete);

export default router;