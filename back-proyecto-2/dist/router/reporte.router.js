"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var reporte_controller_1 = __importDefault(require("../controller/reporte.controller"));
var router = express_1.Router();
router.get('/reporte/top/publicaciones', reporte_controller_1.default.getInstance().getAllToPublicaciones);
router.get('/reporte/top/denuncias', reporte_controller_1.default.getInstance().getAllTopDenuncias);
router.get('/reporte/mas/credito', reporte_controller_1.default.getInstance().getAllMasCredito);
router.get('/reporte/menos/credito', reporte_controller_1.default.getInstance().getAllMenosCredito);
router.get('/reporte/mas/gusta', reporte_controller_1.default.getInstance().getAllMasMeGusta);
router.get('/reporte/mas/nogusta', reporte_controller_1.default.getInstance().getAllMasNoMeGusta);
router.get('/reporte/mas/producto', reporte_controller_1.default.getInstance().getAllProductoMasVendido);
router.get('/reporte/paises', reporte_controller_1.default.getInstance().getAllPaises);
exports.default = router;
