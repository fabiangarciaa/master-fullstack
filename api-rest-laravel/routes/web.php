<?php

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register web routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | contains the "web" middleware group. Now create something great!
  |
 */

//Cargando clases
use App\Http\Middleware\ApiAuthMiddleware;

Route::get('/', function () {
    return view('welcome');
});

//Rutas de prueba
Route::get('/test-orm', 'PruebasController@testORM');

//Rutas del API
//        Route::get('/usuario/pruebas', 'UserController@pruebas');
//
//        Route::get('/categoria/pruebas', 'CategoryController@pruebas');
//
//        Route::get('/entradas/pruebas', 'PostController@pruebas');

/* METODOS HTTP COMUNES
 * GET: CONSEGUIR DATOS O RECURSOS
 * POST: GUARDAR DATOS O RECURSOS O HACER LOGICA DESDE UN FORMULARIO
 * PUT: ACTUALIZAR RECURSOS O DATOS
 * DELETE: ELIMINAR DATOS O RECURSOS
 */

//Rutas funcionales de la API
//Rutas del controlador usuarios
Route::post('/api/register', 'UserController@register');
Route::post('/api/login', 'UserController@login');
Route::put('/api/user/update', 'UserController@update');
Route::post('/api/user/upload', 'UserController@upload')->middleware(ApiAuthMiddleware::class);
Route::get('/api/user/avatar/{filename}', 'UserController@getImage');
Route::get('/api/user/detail/{id}', 'UserController@details');

//Rutas del controlador Categorias
Route::resource('/api/category', 'CategoryController');

//Rutas del controlador de entradas
Route::resource('/api/post', 'PostController');
Route::post('/api/post/upload', 'PostController@upload');
Route::get('/api/post/image/{filename}', 'PostController@getImage');
Route::get('/api/post/category/{id}', 'PostController@getPostsByCategory');
Route::get('/api/post/user/{id}', 'PostController@getPostsByUser');
