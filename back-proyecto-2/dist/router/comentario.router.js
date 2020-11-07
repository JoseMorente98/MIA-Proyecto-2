"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var comentario_controller_1 = __importDefault(require("../controller/comentario.controller"));
var router = express_1.Router();
router.get('/comentario', comentario_controller_1.default.getInstance().getAll);
router.get('/comentario/:id/:id2', comentario_controller_1.default.getInstance().getSingle);
router.post('/comentario', comentario_controller_1.default.getInstance().create);
router.put('/comentario/:id', comentario_controller_1.default.getInstance().update);
router.delete('/comentario/:id', comentario_controller_1.default.getInstance().delete);
exports.default = router;
