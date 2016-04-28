import * as express from 'express';
import * as http from 'http';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as routes from './routes'
import {Server} from "http";
import {Request, Response, NextFunction} from "express-serve-static-core";

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  var err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

var server: Server = http.createServer(app);
server.listen(process.env.PORT || '4000');
server.on('listening', function() {
  var addr: any = server.address();
  var bind: string = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});
