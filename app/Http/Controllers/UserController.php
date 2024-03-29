<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;
// use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    /**
     * UserController constructor.
     *
     * @param User $user
     */
    public function __construct(public User $user)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        return UserResource::collection(
            $this->user->with('roles')->search($request->query('search', ''))
            ->orderBy($request->sort_field, $request->sort_order)
            ->paginate((int) $request->query('per_page')));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $validated_data = $request->validated();
        $validated_data['password'] = Hash::make($validated_data['password']);

        $user = $this->user->create($validated_data);

        return response()->json([
            'user' => new UserResource($user),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $validated_data = $request->validate([
            'name' => "required|string|max:120",
            'username' => "required|string|max:120|unique:users,username,{$user->id}",
            'email' => "required|email|max:255|unique:users,email,{$user->id}",
            'password' => ['confirmed', 'min:8', Password::defaults()],
        ]);

        if(isset($validated_data['password'])) {
            $validated_data['password'] = Hash::make($validated_data['password']);
        }

        $user->update($validated_data);

        return response()->json([
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
