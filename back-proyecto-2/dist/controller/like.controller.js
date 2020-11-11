"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var oracle_1 = __importDefault(require("../oracle/oracle"));
var LikeController = /** @class */ (function () {
    function LikeController() {
        var _this = this;
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT * FROM MEGUSTA\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            data_1 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "estado": element[1],
                                    "producto": element[2],
                                    "usario": element[3],
                                };
                                data_1.push(dataSchema);
                            });
                            return [2 /*return*/, res.json(data_1)];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "No existen datos."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.getSingle = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result, data_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            id: req.params.id,
                            id2: req.params.id2,
                        };
                        query = "\n            SELECT * FROM MEGUSTA \n            WHERE usuario = " + body.id + " AND producto = " + body.id2 + "\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            data_2 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "estado": element[1],
                                    "producto": element[2],
                                    "usario": element[3],
                                };
                                data_2.push(dataSchema);
                            });
                            if (data_2.length > 0) {
                                return [2 /*return*/, res.json(data_2[0])];
                            }
                            else {
                                return [2 /*return*/, res.status(400).json({
                                        ok: false,
                                        status: 400,
                                        error: "No existen datos."
                                    })];
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "No existen datos."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result, data_3, query3, result3, query3, result3, query4, result4, query2, result2, query2, result2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            estado: req.body.estado,
                            producto: req.body.producto,
                            usuario: req.body.usuario,
                        };
                        query = "\n            SELECT * FROM MEGUSTA \n            WHERE usuario = " + body.usuario + " AND producto = " + body.producto + "\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 11];
                        data_3 = [];
                        result.rows.map(function (element) {
                            var dataSchema = {
                                "id": element[0],
                                "estado": element[1],
                                "producto": element[2],
                                "usario": element[3],
                            };
                            data_3.push(dataSchema);
                        });
                        if (!(data_3.length > 0)) return [3 /*break*/, 8];
                        if (!(data_3[0].estado == 0)) return [3 /*break*/, 3];
                        query3 = "\n                        UPDATE MEGUSTA SET \n                        estado = " + body.estado + "\n                        WHERE usuario = " + body.usuario + " AND producto = " + body.producto + "\n                    ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query3)];
                    case 2:
                        result3 = _a.sent();
                        if (result3) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos actualizados correctamente :D"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "Ha ocurrido un error."
                                })];
                        }
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(data_3[0].estado == 1)) return [3 /*break*/, 5];
                        query3 = "\n                        UPDATE MEGUSTA SET \n                        estado = " + body.estado + "\n                        WHERE usuario = " + body.usuario + " AND producto = " + body.producto + "\n                    ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query3)];
                    case 4:
                        result3 = _a.sent();
                        if (result3) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos actualizados correctamente :D"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "Ha ocurrido un error."
                                })];
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        query4 = "\n                        UPDATE MEGUSTA SET \n                        estado = " + body.estado + "\n                        WHERE usuario = " + body.usuario + " AND producto = " + body.producto + "\n                    ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query4)];
                    case 6:
                        result4 = _a.sent();
                        if (result4) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos actualizados correctamente :D"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "Ha ocurrido un error."
                                })];
                        }
                        _a.label = 7;
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        query2 = "\n                    INSERT INTO MEGUSTA(estado, producto, usuario) \n                    VALUES (" + body.estado + ", " + body.producto + ",\n                    " + body.usuario + ")\n                ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query2)];
                    case 9:
                        result2 = _a.sent();
                        if (result2) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos agregados correctamente :D"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "Ha ocurrido un error."
                                })];
                        }
                        _a.label = 10;
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        query2 = "\n                INSERT INTO MEGUSTA(estado, producto, usuario) \n                VALUES (" + body.estado + ", " + body.producto + ",\n                " + body.usuario + ")\n            ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query2)];
                    case 12:
                        result2 = _a.sent();
                        if (result2) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos agregados correctamente :D"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "Ha ocurrido un error."
                                })];
                        }
                        _a.label = 13;
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            estado: req.body.estado,
                            id: req.params.id
                        };
                        query = "\n            UPDATE MEGUSTA SET \n            estado = '" + body.estado + "'\n            WHERE id = " + body.id + "\n        ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos actualizados correctamente :D"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "Ha ocurrido un error."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            id: req.params.id
                        };
                        query = "\n            DELETE FROM MEGUSTA WHERE id = " + body.id + "\n        ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos eliminados correctamente :D"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "No existen datos."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    }
    LikeController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return LikeController;
}());
exports.default = LikeController;
