"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server"));
var bodyParser = require("body-parser");
var PORT = parseInt(process.env.PORT, 10) || 3000;
var server = server_1.default.init(PORT);
var api = "/api/";
/**
 * IMPORTACIONES
 */
var pais_router_1 = __importDefault(require("./router/pais.router"));
var usuario_router_1 = __importDefault(require("./router/usuario.router"));
var categoria_router_1 = __importDefault(require("./router/categoria.router"));
var producto_router_1 = __importDefault(require("./router/producto.router"));
var denuncia_router_1 = __importDefault(require("./router/denuncia.router"));
/**
 * HTTP CORS
 */
server.app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if (req.methods == "OPTIONS") {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: false }));
/**
 * RUTAS
 */
server.app.use(api, pais_router_1.default);
server.app.use(api, usuario_router_1.default);
server.app.use(api, categoria_router_1.default);
server.app.use(api, producto_router_1.default);
server.app.use(api, denuncia_router_1.default);
/**
 * INICIA SERVIDOR
 */
server.start(function () {
    console.log("Servidor corriendo en el puerto " + PORT + " :D");
});
