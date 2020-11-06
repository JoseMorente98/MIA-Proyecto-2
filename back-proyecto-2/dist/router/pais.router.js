"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var pais_controller_1 = __importDefault(require("../controller/pais.controller"));
var router = express_1.Router();
router.get('/pais', pais_controller_1.default.getInstance().getAll);
router.get('/pais/:id', pais_controller_1.default.getInstance().getSingle);
router.post('/pais', pais_controller_1.default.getInstance().create);
router.put('/pais/:id', pais_controller_1.default.getInstance().update);
router.delete('/pais/:id', pais_controller_1.default.getInstance().delete);
exports.default = router;
