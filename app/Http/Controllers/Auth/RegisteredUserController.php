<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
// use Illuminate\Auth\Events\Registered;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Auth\Events\Registered;
use App\Http\Requests\Auth\SignupRequest;

class RegisteredUserController extends Controller
{
    use ApiResponses;
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

        return $this->success([
            'user' => new UserResource($user),
            'token' => $token,
        ], 'User Created Successfully');
    }
}
