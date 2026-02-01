import js from '@eslint/js';

export default [
	{
		files: ['**/*.js'],
		ignores: ['node_modules/**', 'dist/**', 'build/**'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				process: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				module: 'readonly',
				require: 'readonly',
			},
		},
		rules: {
			...js.configs.recommended.rules,

			// Code quality
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'no-console': 'off',

			// Style
			semi: ['error', 'always'],
			quotes: ['error', 'single'],
			indent: ['error', 2],
			'comma-dangle': ['error', 'always-multiline'],

			// Best practices
			eqeqeq: ['error', 'always'],
			curly: ['error', 'all'],
		},
	},
];
