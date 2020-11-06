"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var categoria_controller_1 = __importDefault(require("../controller/categoria.controller"));
var router = express_1.Router();
router.get('/categoria', categoria_controller_1.default.getInstance().getAll);
router.get('/categoria/:id', categoria_controller_1.default.getInstance().getSingle);
router.post('/categoria', categoria_controller_1.default.getInstance().create);
router.put('/categoria/:id', categoria_controller_1.default.getInstance().update);
router.delete('/categoria/:id', categoria_controller_1.default.getInstance().delete);
exports.default = router;
