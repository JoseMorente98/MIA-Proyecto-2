"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var producto_controller_1 = __importDefault(require("../controller/producto.controller"));
var router = express_1.Router();
router.get('/producto', producto_controller_1.default.getInstance().getAll);
router.get('/producto/:id', producto_controller_1.default.getInstance().getSingle);
router.post('/producto', producto_controller_1.default.getInstance().create);
router.put('/producto/:id', producto_controller_1.default.getInstance().update);
router.delete('/producto/:id', producto_controller_1.default.getInstance().delete);
exports.default = router;
