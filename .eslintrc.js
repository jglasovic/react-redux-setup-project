module.exports = {
	extends: 'airbnb',
	plugins: ['react', 'jsx-a11y', 'import'],
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
		},
	},
	globals: {
		document: false,
		__APP__: false,
		__DEV__: false,
		__API_URL__: false,
		localStorage: false,
		window: false,
	},
	rules: {
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'global-require': 0,
		'no-underscore-dangle': 0,
		'no-warning-comments': 1,
		'no-constant-condition': 0,
		'arrow-body-style': 0,
		'react/no-multi-comp': 0,
		'import/first': 0,
		'import/prefer-default-export': 0,
		'import/no-named-as-default': 0,
		'jsx-a11y/href-no-hash': 0,
		'react/forbid-prop-types': 0,
		'no-tabs': 0,
	},
};
