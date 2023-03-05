<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:120',
            'username' => 'required|string|max:120|unique:users,username,'. $this->id,
            'email' => 'required|email|max:255|unique:users,email,'. $this->id,
            'password' => ['confirmed', 'min:8', Password::defaults()],
        ];
    }
}
