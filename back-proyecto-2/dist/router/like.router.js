"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var like_controller_1 = __importDefault(require("../controller/like.controller"));
var router = express_1.Router();
router.get('/like', like_controller_1.default.getInstance().getAll);
router.get('/like/:id/:id2', like_controller_1.default.getInstance().getSingle);
router.post('/like', like_controller_1.default.getInstance().create);
router.put('/like/:id', like_controller_1.default.getInstance().update);
router.delete('/like/:id', like_controller_1.default.getInstance().delete);
exports.default = router;
