# a-snakegame
game using typescript, react styled with scss

Clone of the famous snake game.
On the cell floor, using the arrows, you can move the snake's head (symbol '@'),
when it encounters food (symbol '$'), the head eats the prey and its tail grows.
The game continues until the snake is no longer able to move.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Bugs:

when

[DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: ‘onAfterSetupMiddleware’ option is deprecated.
Please use the ‘setupMiddlewares’ option. (Use node --trace-deprecation ... to show where the warning was created)
[DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: ‘onBeforeSetupMiddleware’ option is deprecated.
Please use the ‘setupMiddlewares’ option.

in file: node_modules\react-scripts\config\webpackDevServer.config.js 

    onBeforeSetupMiddleware(devServer) {
      // Keep `evalSourceMapMiddleware`
      // middlewares before `redirectServedPath` otherwise will not have any effect
      // This lets us fetch source contents from webpack for the error overlay
      devServer.app.use(evalSourceMapMiddleware(devServer));

      if (fs.existsSync(paths.proxySetup)) {
        // This registers user provided middleware for proxy reasons
        require(paths.proxySetup)(devServer.app);
      }
    },
    onAfterSetupMiddleware(devServer) {
      // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));

      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },


replace to

	setupMiddlewares: (middlewares, devServer) => {
		if (!devServer) {
			throw new Error('webpack-dev-server is not defined')
		}

		if (fs.existsSync(paths.proxySetup)) {
			require(paths.proxySetup)(devServer.app)
		}

		middlewares.push(
			evalSourceMapMiddleware(devServer),
			redirectServedPath(paths.publicUrlOrPath),
			noopServiceWorkerMiddleware(paths.publicUrlOrPath)
		)

		return middlewares;
	},
