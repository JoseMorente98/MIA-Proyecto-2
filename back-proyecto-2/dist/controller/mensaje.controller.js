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
var socket_1 = __importDefault(require("../socket/socket"));
var MensajeController = /** @class */ (function () {
    function MensajeController() {
        var _this = this;
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT * FROM MENSAJE\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            data_1 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "mensaje": element[1],
                                    "fecha": element[2],
                                    "usuario1": element[3],
                                    "usuario2": element[4],
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
                        query = "\n            SELECT MENSAJE.usuario1, MENSAJE.usuario2, MENSAJE.id, MENSAJE.mensaje, MENSAJE.fecha FROM MENSAJE\n            WHERE usuario1 = " + body.id + " AND usuario2 = " + body.id2 + "\n            UNION \n            SELECT MENSAJE.usuario1, MENSAJE.usuario2, MENSAJE.id, MENSAJE.mensaje, MENSAJE.fecha FROM MENSAJE\n            WHERE usuario1 = " + body.id2 + " AND usuario2 = " + body.id + "\n            ORDER BY id\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            data_2 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "usuario1": element[0],
                                    "usuario2": element[1],
                                    "id": element[2],
                                    "mensaje": element[3],
                                    "hora": element[4],
                                };
                                data_2.push(dataSchema);
                            });
                            return [2 /*return*/, res.json(data_2)];
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
            var body, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            mensaje: req.body.mensaje,
                            usuario1: req.body.usuario1,
                            usuario2: req.body.usuario2,
                        };
                        query = "\n            INSERT INTO MENSAJE(mensaje, usuario1, usuario2) \n            VALUES ('" + body.mensaje + "', " + body.usuario1 + ",\n            " + body.usuario2 + ")\n        ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            socket_1.default.getInstance().sendMessage(body.usuario1, body.usuario2);
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
                        return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            descripcion: req.body.descripcion,
                            id: req.params.id
                        };
                        query = "\n            UPDATE MENSAJE SET \n            descripcion = '" + body.descripcion + "'\n            WHERE id = " + body.id + "\n        ";
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
                        query = "\n            DELETE FROM MENSAJE WHERE id = " + body.id + "\n        ";
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
    MensajeController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return MensajeController;
}());
exports.default = MensajeController;
