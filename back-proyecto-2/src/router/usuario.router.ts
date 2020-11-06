import { Router } from "express";
import UsuarioController from "../controller/usuario.controller"
const router = Router();

router.post('/auth', UsuarioController.getInstance().login);
router.post('/recovery', UsuarioController.getInstance().recovery);
router.post('/activar', UsuarioController.getInstance().activar);
router.post('/reset/:id', UsuarioController.getInstance().reset);
router.get('/usuario', UsuarioController.getInstance().getAll);
router.get('/usuario/:id', UsuarioController.getInstance().getSingle);
router.post('/usuario', UsuarioController.getInstance().create);
router.put('/usuario/:id', UsuarioController.getInstance().update);
router.delete('/usuario/:id', UsuarioController.getInstance().delete);

export default router;