<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    protected $loginField;
    protected $loginValue;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    // auto switch between username or email
    protected function prepareForValidation()
    {
        $this->loginField = filter_var($this->input('login'),
        FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $this->loginValue = $this->input('login');

        $this->merge([$this->loginField => $this->loginValue]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'login' => $this->loginField == 'email'
            ?
            'required_without:username|string|email|exists:users,email'
            :
            'required_without:email|string|min:4|exists:users,username',

            'password' => 'required|string|min:8',
            'remember' => 'boolean',
        ];
    }

    public function credentials()
    {
        return array_merge($this->only($this->loginField, 'password'), ['isActive' => 1]);
    }

}
