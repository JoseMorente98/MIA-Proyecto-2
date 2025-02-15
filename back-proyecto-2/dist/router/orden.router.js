"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var orden_controller_1 = __importDefault(require("../controller/orden.controller"));
var router = express_1.Router();
router.get('/orden', orden_controller_1.default.getInstance().getAll);
router.get('/orden/:id/', orden_controller_1.default.getInstance().getSingle);
router.post('/orden', orden_controller_1.default.getInstance().create);
router.put('/orden/:id', orden_controller_1.default.getInstance().update);
router.delete('/orden/:id', orden_controller_1.default.getInstance().delete);
exports.default = router;
