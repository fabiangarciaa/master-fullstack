<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;

class UserController extends Controller {

    public function pruebas(Request $request) {
        return "Accion de pruebas de USER-CONTROLLER";
    }

    public function register(Request $request) {

        //recoger los datos del usuario por post
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); //array
        //validar datos
        $validate = \Validator::make($params_array, [
                    'name' => 'required|alpha',
                    'surname' => 'required|alpha',
                    'email' => 'required|email|unique:users', //comprobar si el usuario existe ya
                    'password' => 'required'
        ]);

        if ($validate->fails()) {
            //Validacion fallo
            $data = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'El usuario no se ha creado',
                'errors' => $validate->errors()
            );
        } else {
            //Validacion fue correcta
            //cifrar la contrasena
            //$pwd = password_hash($params->password, PASSWORD_BCRYPT, ['cost' => 4]);
            $pwd = hash('sha256', $params->password);


            //crear el usuario
            $user = new User();
            $user->name = $params_array['name'];
            $user->surname = $params_array['surname'];
            $user->email = $params_array['email'];
            $user->password = $pwd;
            $user->role = 'ROLE_USER';

            //Guardar el usuario
            $user->save();

            $data = array(
                'status' => 'Success',
                'code' => 200,
                'message' => 'El usuario se ha creado correctamente',
                'user' => $user
            );
        }



        return response()->json($data, $data['code']);
    }

    public function login(Request $request) {
        $jwtAuth = new \JwtAuth();
        //Recibir los datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        //Validar esos datos
        $validate = \Validator::make($params_array, [
                    'email' => 'required|email',
                    'password' => 'required'
        ]);

        if ($validate->fails()) {
            //Validacion fallo
            $signup = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'El usuario no se ha podido identificar',
                'errors' => $validate->errors()
            );
        } else {
            //cifrar la contrasena
            $pwd = hash('sha256', $params->password);
            //Devolver token o datos
            $signup = $jwtAuth->signup($params->email, $pwd);

            if (!empty($params->gettoken)) {
                $signup = $jwtAuth->signup($params->email, $pwd, true);
            }
        }

        return response()->json($signup, 200);
    }

    public function update(Request $request) {
        //Comprobar si el usuario esta identificado
        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();

        $checkToken = $jwtAuth->checkToken($token);

        //Recoger los datos por POST
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if ($checkToken && !empty($params_array)) {



            //Sacar usuario identificado
            $user = $jwtAuth->checkToken($token, true);
            //Validar los datos
            $validate = \Validator::make($params_array, [
                        'name' => 'required|alpha',
                        'surname' => 'required|alpha',
                        'email' => 'required|email|unique:users,' . $user->sub
            ]);
            //Quitar los campos que no quiero actualizar
            unset($params_array['id']);
            unset($params_array['role']);
            unset($params_array['password']);
            unset($params_array['created_at']);
            unset($params_array['remember_token']);

            //Actualizar el usuario 
            $user_update = User::where('id', $user->sub)->update($params_array);
            //Devolver un array con el resultado
            $data = array(
                'code' => 200,
                'status' => 'success',
                'user' => $user,
                'changes' => $params_array
            );
        } else {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'El usuario no esta identificado.'
            );
        }

        return response()->json($data, $data['code']);
    }

    public function upload(Request $request) {
        //Recoger datos de la peticion
        $image = $request->file('file0');

        //Validacion de la imagen
        $validate = \Validator::make($request->all(), [
                    'file0' => 'required|image|mimes:jpg,jpeg,png'
        ]);

        //Guardar imagen
        if (!$image || $validate->fails()) {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Error al subir imagen'
            );
        } else {
            $image_name = time() . $image->getClientOriginalName();
            \Storage::disk('users')->put($image_name, \File::get($image));

            $data = array(
                'code' => 200,
                'status' => 'Success',
                'image' => $image_name
            );
        }
        //Devolver el resultado

        return response()->json($data, $data['code']);
    }

    public function getImage($filename) {
        $isset = \Storage::disk('users')->exists($filename);
        if ($isset) {
            $file = \Storage::disk('users')->get($filename);
            return new Response($file, 200);
        } else {
            $data = array(
                'code' => 404,
                'status' => 'error',
                'message' => 'La imagen no existe.'
            );

            return response()->json($data, $data['code']);
        }
    }

    public function details($id) {
        $user = User::find($id);

        if (is_object($user)) {
            $data = array(
                'code' => 200,
                'status' => 'success',
                'user' => $user
            );
        } else {
            $data = array(
                'code' => 404,
                'status' => 'error',
                'message' => 'El usuario no existe'
                );
        }
        
        return response()->json($data, $data['code']);
    }

}
