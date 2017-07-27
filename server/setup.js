const path = require('path');
const compression = require('koa-compress');
const Koa = require('koa');
const Router=require('koa-router');
const http = require('http');
const chalk = require('chalk');
const fs=require('fs');
var  static=require('koa-static');
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const session=require('koa-session-minimal');
const redis=require('redis').createClient();
const initSocketServer=require('./socket');
module.exports = function (options) {
    const app =new Koa();
    const apiRouter=new Router();
    readdirToRouter(apiRouter);
    app.use(apiRouter.routes(), apiRouter.allowedMethods());
    app.use(session({store:redis}));
    app.use( async ( ctx,next ) => {
        if ( ctx.url === '/' ) {
            ctx.cookies.set(
                `id`,
                ctx.request.ip
            );
        }
        return await next();
    })

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../internals/webpack/webpack.dev.config');
    addDevMiddlewares(app, webpackConfig);
  }
    const server=http.Server(app.callback());
    initSocketServer(server);

    server.listen(port, function () {
    console.log(chalk.green('Server started at http://localhost:' + port + '\n'));
  });

};


// Dev middleware
function addDevMiddlewares(app, webpackConfig){
  const webpack = require('webpack');
  const  { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(hotMiddleware(compiler));
  const fs = middleware.fileSystem;
  const indexRouter=new Router();
    indexRouter.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
    return;
  });
}

function addProdMiddlewares(app, options) {
    const publicPath = options.publicPath || '/';
    const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

    app.use(compression());
    app.use(publicPath,static(outputPath));
    const indexRouter=new Router();
    indexRouter.get('*', (req, res) => {res.sendFile(path.resolve(outputPath, 'index.html'));return;});
}

  function readdirToRouter(apiRouter,child = '') {
    let path = `${__dirname}/controller${child ? `/${child}` : ''}`

      fs.readdirSync(path).forEach((file) => {
        let path = file.split('.')
        let name = path[0]
        if (path.length > 1) {
                let child_path = child ? `${child}/` : ''
                let route = require(`./controller/${child_path}${name}`);
                if (name === 'index') {
                    apiRouter.use(`/api/${child}`, route.routes(), route.allowedMethods())
                } else {
                    apiRouter.use(`/api/${child_path}${name}`, route.routes(), route.allowedMethods())
                }
        } else {
             readdirToRouter(file)
        }
    })
      return;
};