"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_controller_1 = __importDefault(require("../controller/usuario.controller"));
var router = express_1.Router();
router.post('/auth', usuario_controller_1.default.getInstance().login);
router.post('/recovery', usuario_controller_1.default.getInstance().recovery);
router.post('/activar', usuario_controller_1.default.getInstance().activar);
router.post('/reset/:id', usuario_controller_1.default.getInstance().reset);
router.get('/usuario', usuario_controller_1.default.getInstance().getAll);
router.get('/usuario/:id', usuario_controller_1.default.getInstance().getSingle);
router.post('/usuario', usuario_controller_1.default.getInstance().create);
router.put('/usuario/:id', usuario_controller_1.default.getInstance().update);
router.delete('/usuario/:id', usuario_controller_1.default.getInstance().delete);
exports.default = router;
