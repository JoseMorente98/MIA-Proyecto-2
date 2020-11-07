import { Router } from "express";
import ComentarioController from "../controller/comentario.controller"
const router = Router();

router.get('/comentario', ComentarioController.getInstance().getAll);
router.get('/comentario/:id/:id2', ComentarioController.getInstance().getSingle);
router.post('/comentario', ComentarioController.getInstance().create);
router.put('/comentario/:id', ComentarioController.getInstance().update);
router.delete('/comentario/:id', ComentarioController.getInstance().delete);

export default router;