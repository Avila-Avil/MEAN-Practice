const http = require('http');
const app = require('./app');
const debug = require("debug")("node-angular");


const normalizeport = val =>{
  var port = parseInt(val,10);

  if(isNaN(port)){
    //named pipe
    return val;
  }
if (port >= 0){
  //port number
  return port;
}

return false;
};

const onError = error =>{
  if(error.syscall !== "listen"){
    throw error;

  }

    const bind = typeof port === "string" ? "pipe"+port: "port" + port;
      switch(error.code){
        case "EACCES":
          console.error (bind + "requires elevated privilage");
          process.exit(1);
          break;
        default:
          throw error;
      }
};

const onListening = () =>{
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe"+port: "port" + port;
  debug("listening on" + bind);
};

const port  =normalizeport(process.env.PORT|| "3000");
app.set('PORTT', port );

const server = http.createServer(app);
server.on("error", onError);
server.on("listeining", onListening);
server.listen(port);
