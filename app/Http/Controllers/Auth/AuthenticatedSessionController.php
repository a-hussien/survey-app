<?php

namespace App\Http\Controllers\Auth;

use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
    use ApiResponses;
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
            return $this->error('', __('auth.failed') , 401);
        }

        $user = Auth::user();

        $token = $user->createToken('_token')->plainTextToken;

        return $this->success([
            'user' => new UserResource($user),
            'token' => $token,
        ], 'User Logged In Successfully');

    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        if(Auth::check())
        {
            //delete current token
            Auth::user()->currentAccessToken()->delete();

            // response
            return $this->success('', 'User Logged out successfully');
        }
    }
}
