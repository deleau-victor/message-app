/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/*.tsx',
		'./src/**/*.tsx',
		'./src/Components/**/*.tsx',
		'./src/Components/**/**/*.tsx',
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				field: 'repeat(2, minmax(350px, 1fr))',
			},
		},
	},
	plugins: [require('daisyui')],
}
