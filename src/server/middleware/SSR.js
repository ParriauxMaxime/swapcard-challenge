const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const appEmulation = require('./app-emulation');
const serveStatic = require('serve-static');
const { createElement: h } = require('react');
const createGenerateClassName = require('material-ui/styles').createGenerateClassName;
const MuiThemeProvider = require('material-ui/styles').MuiThemeProvider;
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const requireFromString = require('require-from-string');
const serialize = require('serialize-javascript');
const theme = require('../../client/theme').theme;
const SheetsRegistry = require('react-jss/lib/jss').SheetsRegistry;
const JssProvider = require('react-jss/lib/JssProvider').default;

const defaultOptions = {
    isProductionMode: () => process.env.NODE_ENV === 'production',
    isRoutingUrl: (url, req) => 
        (/\.html?$/.test(url) || !/\.\w+$/.test(url)) 
        && req.header('accept') !== 'text/event-stream',
    dirSourceClient: './src/client',
    dirBuildClient: './build/client',
    fileIndexHtml: 'index.html',
    fileIndexJs: 'index.js',
    fileAppJs: 'App.js',
    fileReducerJs: 'reducer.js',
    dirSourceServer: './src/server',
    dirBuildServer: './build/server',
    optsServeClient: {
        redirect: false
    },
    webpackDevConfig: require('./webpack-dev-config.js'),
    webpackDevOptions: {
        noInfo: true,
        publicPath: '/'
    },
    webpackDevBuildCallback: () => console.log('webpack dev build done.'),
    indexSSR: true,
    beforeSSR: (store, req, cb) => cb(),
};

function SSR(options = {}) {
    options = _.merge(defaultOptions, options);
    if (options.indexSSR) {
        options.optsServeClient.index = false;
        options.webpackDevOptions.index = false;
    }

    // STEP-01 check production mode
    const productionMode = options.isProductionMode();
    let compiler; // webpack compiler only used in non-production mode
    const getCompiler = filename => (
        compiler.compilers &&
        compiler.compilers.find(x => x.options.output.filename.endsWith(filename))
    ) || compiler;

    // STEP-02 serve assets and index.html
    if (productionMode) {
        appEmulation.use(serveStatic(options.dirBuildClient, options.optsServeClient));
    } else {
        compiler = require('webpack')(options.webpackDevConfig);
        compiler.plugin('done', options.webpackDevBuildCallback);
        compiler.plugin('failed', options.webpackDevBuildCallback);
        appEmulation.use(require('webpack-dev-middleware')(compiler, options.webpackDevOptions));

        appEmulation.get('/', (req, res) => {
            const c = getCompiler(options.fileIndexJs);
            const html = c.outputFileSystem.readFileSync(path.join(c.outputPath, options.fileIndexHtml), 'utf8');
            res.set('content-type', 'text/html');
            res.send(html);
        });
        appEmulation.use(require('webpack-hot-middleware')(compiler, options.webpackHotOptions));
    }

    // STEP-03 serve prerendered html
    const clientModuleMap = new Map();
    const getClientModule = (file) => {
        let module;
        if (productionMode) {
            module = clientModuleMap.get(file);
            if (!module) {
                // eslint-disable-next-line import/no-dynamic-require
                module = require(path.resolve(options.dirBuildClient, file));
                clientModuleMap.set(file, module);
            }
        } else {
            module = clientModuleMap.get(file);
            if (!module) {
                const c = getCompiler(file);
                const filename = path.join(c.outputPath, file);
                const content = c.outputFileSystem.readFileSync(filename, 'utf8');
                module = requireFromString(content.replace(/.*?window.*?/,'var window = {}; $&'), filename);
                clientModuleMap.set(file, module);
                c.watch({}, () => clientModuleMap.delete(file));
            }
        }
        if (module.default) module = module.default;
        return module;
    };
    let indexHtml;
    const getIndexHtml = () => {
        if (productionMode) {
            if (!indexHtml) {
                indexHtml = fs.readFileSync(path.resolve(options.dirBuildClient, options.fileIndexHtml), 'utf8');
            }
            return indexHtml;
        }
        // non-production mode
        if (!indexHtml) {
            const c = getCompiler(options.fileIndexJs);
            indexHtml = c.outputFileSystem.readFileSync(path.join(c.outputPath, options.fileIndexHtml), 'utf8');
        }
        return indexHtml;
    };
    appEmulation.use((req, res, next) => {
        console.log(req.url);
        if ((req.url === '/') && !options.indexSSR) return next();
        if (!options.isRoutingUrl(req.url, req)) return next();
        const reducer = getClientModule(options.fileReducerJs);            
        const App = getClientModule(options.fileAppJs);
        if (!reducer || !App) return next();
        const store = createStore(reducer);
        const sheetsRegistry = new SheetsRegistry();
        const generateClassName = createGenerateClassName();
        const render = (err) => {
            if (err) return next(err);
            const context = {};
            const appHtml = renderToString(
                h(Provider, { store },
                    h(JssProvider, {registry: sheetsRegistry, generateClassName},
                        h(MuiThemeProvider, {theme, sheetsManager: new Map()}, 
                            h(StaticRouter, { 
                                location: req.url,
                                context
                            },
                                h(App)
                ))))
            );
            const css = sheetsRegistry.toString()
            if (context.url) {
                res.redirect(302, context.url);
            } else {
                let html = getIndexHtml();
                const cssString = '<style id="jss-server-side">' + css + '</style>';
                const appDiv = '<div id="app">';
                html = html.replace(appDiv, appDiv + appHtml + cssString);
                const preloadedState = `<script>window.__PRELOADED_STATE__=${serialize(store.getState())}</script>`;
                const scriptTag = '<script type';
                html = html.replace(scriptTag, preloadedState + scriptTag);
                res.set('content-type', 'text/html');
                res.send(html);
            }
            return null;
        };
        const promise = options.beforeSSR(store, req, render);
        if (promise && promise.then) promise.then(() => render()).catch(err => render(err));
        return null; // just to make eslint happy
    });

    return (req, res, next) => {
        appEmulation.handle(0, req, res, next);
    };
}

module.exports = SSR;