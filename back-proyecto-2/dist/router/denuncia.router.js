"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var denuncia_controller_1 = __importDefault(require("../controller/denuncia.controller"));
var router = express_1.Router();
router.get('/denuncia', denuncia_controller_1.default.getInstance().getAll);
router.get('/denuncia/:id', denuncia_controller_1.default.getInstance().getSingle);
router.post('/denuncia', denuncia_controller_1.default.getInstance().create);
router.put('/denuncia/:id', denuncia_controller_1.default.getInstance().update);
router.delete('/denuncia/:id', denuncia_controller_1.default.getInstance().delete);
exports.default = router;
