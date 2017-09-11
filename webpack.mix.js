const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */
mix.scripts([
	'resources/assets/js/jquery-3.2.1.js',
	'resources/assets/js/bootstrap-3.3.7.js',
	'resources/assets/js/toastr.js',
	'resources/assets/js/sweetalert.min.js',
	'resources/assets/js/masonry.pkgd.min.js',
	'resources/assets/js/vue-2.2.6.js',
	'resources/assets/js/axios-0.16.1.js',
	'resources/assets/js/app.js',
	'resources/assets/js/productos.js',
	'resources/assets/js/marcas.js',
	], 'public/js/app.js')
	.styles([
	'resources/assets/css/bootstrap-3.3.7.css',
	'resources/assets/css/font-awesome-4.7.0.css',
	'resources/assets/css/toastr.css',
	'resources/assets/css/sweetalert.css',
	'resources/assets/css/app.css',
	], 'public/css/app.css');