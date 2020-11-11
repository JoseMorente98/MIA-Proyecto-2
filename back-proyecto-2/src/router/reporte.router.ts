import { Router } from "express";
import ReporteController from "../controller/reporte.controller"
const router = Router();

router.get('/reporte/top/publicaciones', ReporteController.getInstance().getAllToPublicaciones);
router.get('/reporte/top/denuncias', ReporteController.getInstance().getAllTopDenuncias);
router.get('/reporte/mas/credito', ReporteController.getInstance().getAllMasCredito);
router.get('/reporte/menos/credito', ReporteController.getInstance().getAllMenosCredito);
router.get('/reporte/mas/gusta', ReporteController.getInstance().getAllMasMeGusta);
router.get('/reporte/mas/nogusta', ReporteController.getInstance().getAllMasNoMeGusta);
router.get('/reporte/mas/producto', ReporteController.getInstance().getAllProductoMasVendido);
router.get('/reporte/paises', ReporteController.getInstance().getAllPaises);

export default router;