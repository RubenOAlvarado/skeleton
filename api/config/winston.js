var appRoot = require('app-root-path');
var winston = require('winston');

//definimos la configuración de los loggers que queremos usar
//generamos un objeto que contiene dos objetos de configuracion, uno para el archivo de logs, y otro que contiene la configuración a nivel consola
var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console:{
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }
};

//declaramos los loggers que configuramos anteriormente
//a partir de la version 3.0.0 de winston, el constructor winston.Logger fue reemplazado por winstons.createLogger
var logger = new winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

//Por default, morgan solo logea en consola, asi que generamos un stream que será capaz de obtener los logs generados por morgan y los agregará al archivo 
//al archivo de logs de winston
logger.stream = {
    write: (message, encoding) => logger.info(message)
};

module.exports = logger;