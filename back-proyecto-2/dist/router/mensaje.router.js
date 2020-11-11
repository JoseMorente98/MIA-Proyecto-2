"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mensaje_controller_1 = __importDefault(require("../controller/mensaje.controller"));
var router = express_1.Router();
router.get('/mensaje', mensaje_controller_1.default.getInstance().getAll);
router.get('/mensaje/:id/:id2', mensaje_controller_1.default.getInstance().getSingle);
router.post('/mensaje', mensaje_controller_1.default.getInstance().create);
router.put('/mensaje/:id', mensaje_controller_1.default.getInstance().update);
router.delete('/mensaje/:id', mensaje_controller_1.default.getInstance().delete);
exports.default = router;
