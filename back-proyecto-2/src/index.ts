import Server from "./server/server";
import bodyParser = require('body-parser');
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const server = Server.init(PORT);
const api:string = "/api/"

/**
 * IMPORTACIONES
 */
import pais from "./router/pais.router";
import usuario from "./router/usuario.router";
import categoria from "./router/categoria.router";
import producto from "./router/producto.router";
import denuncia from "./router/denuncia.router";

/**
 * HTTP CORS
 */
server.app.use((req:any, res:any, next:any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if(req.methods == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

server.app.use(bodyParser.json())
server.app.use(bodyParser.urlencoded({ extended: false }))

/**
 * RUTAS
 */
server.app.use(api, pais);
server.app.use(api, usuario);
server.app.use(api, categoria);
server.app.use(api, producto);
server.app.use(api, denuncia);

/**
 * INICIA SERVIDOR
 */
server.start(()=> {
  console.log(`Servidor corriendo en el puerto ${PORT} :D`)
});


