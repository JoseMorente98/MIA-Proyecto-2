"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bitacora_controller_1 = __importDefault(require("../controller/bitacora.controller"));
var router = express_1.Router();
router.get('/bitacora', bitacora_controller_1.default.getInstance().getAll);
router.get('/bitacora/:id', bitacora_controller_1.default.getInstance().getSingle);
router.post('/bitacora', bitacora_controller_1.default.getInstance().create);
router.put('/bitacora/:id', bitacora_controller_1.default.getInstance().update);
router.delete('/bitacora/:id', bitacora_controller_1.default.getInstance().delete);
exports.default = router;
