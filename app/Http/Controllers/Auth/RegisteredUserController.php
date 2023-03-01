<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\SignupRequest;
// use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(SignupRequest $request): JsonResponse
    {
        $request->validated();

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // event(new Registered($user));

        $token = $user->createToken('_token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }
}
