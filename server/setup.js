const path = require('path');
const compression = require('koa-compress');
const Koa = require('koa');
const Router=require('koa-router');
const http = require('http');
const chalk = require('chalk');
var  static=require('koa-static');
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const session=require('koa-session-minimal');
 const initSocketServer=require('./socket');
module.exports = function (options) {
 const app =new Koa();

    app.use(session());
    const homeRouter=new Router();
    app.use( async ( ctx,next ) => {
        if ( ctx.url === '/' ) {
            ctx.cookies.set(
                `ip`,
                ctx.request.ip
            );
        }
        await next();
    })

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../internals/webpack/webpack.dev.config');
    addDevMiddlewares(app, webpackConfig);
  }
      homeRouter.get("/*", function(ctx) {
   renderer.render(
      ctx.request.path,
      function(err, html) {
        if(err) {
            ctx.response.statusCode = 500;
            ctx.response.contentType = "text; charset=utf8";
            ctx.response.end(err.message);
          return;
        }
          ctx.response.contentType = "text/html; charset=utf8";
          ctx.response.end(html);
      }
    );
  });
    const server =initSocketServer(app);

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
  });
}

function addProdMiddlewares(app, options) {
    const publicPath = options.publicPath || '/';
    const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

    app.use(compression());
    app.use(publicPath,static(outputPath));
    const indexRouter=new Router();
    indexRouter.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
}