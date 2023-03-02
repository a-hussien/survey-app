<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $credentials = $request->credentials();

        $credentials['isActive'] = 1;
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        // check credentials
        if(!Auth::attempt($credentials, $remember))
        {
            return response()->json([
                'error' => __('auth.failed'),
            ], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('_token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(): Response
    {
        if(Auth::check())
        {
            //delete current token
            Auth::user()->currentAccessToken()->delete();
            // response
            return response()->noContent();
        }
    }

    /**
     * get current user informations.
     */
    public function getCurrentUser(): JsonResponse
    {
        if(Auth::check())
        {
            $user = Auth::user();
            return response()->json([
                'user' => new UserResource($user),
            ]);
        }
    }

}
