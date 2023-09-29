const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve(process.cwd(), './src/index.tsx'),
		frontend: path.resolve(process.cwd(), './src/frontend.tsx'),
	},
};

// const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// module.exports = {
// 	...defaultConfig,
// 	entry: {
// 		...defaultConfig.entry,
// 		frontend: './src/frontend.js',
// 		index: './src/index.js',
// 	},
// };
