import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';

const port = process.env.PORT || 8082;
const app = express();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'developmenet';
console.log(`isDeveloment: ${isDevelopment}`);
if (isDevelopment) {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.dev');

  const compiler = webpack(webpackConfig);

  // Webpack hook event to write html file
  compiler.plugin('emit', (compilation: any, callback: any) => {
    const { assets } = compilation;
    let file;
    let data;

    Object.keys(assets).forEach((key) => {
      if (key.match(/\.html$/)) {
        file = path.resolve(__dirname, 'static', key);
        data = assets[key].source();
        if (!fse.pathExistsSync(path.resolve(__dirname, 'static'))) {
          fse.mkdirsSync(path.resolve(__dirname, 'static'));
        }
        fse.writeFileSync(file, data);
      }
    });
    callback();
  });

  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {
      colors: true,
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  // for react files.
  app.use(express.static(path.join(__dirname, 'static')));
}

app.get('/*', (request: express.Request, response: express.Response) => {
  const htmlPath = path.join(__dirname, 'static', 'index.html');
  response.sendFile(htmlPath);
});

app.listen(port);
console.log(`server started on port: ${port}`);
