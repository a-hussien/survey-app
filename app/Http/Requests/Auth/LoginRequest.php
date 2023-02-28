<?php

namespace App\Http\Requests\Auth;

use App\Traits\ApiResponses;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class LoginRequest extends FormRequest
{
    use ApiResponses;

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
        ];
    }

    public function credentials()
    {
        return array_merge($this->only($this->loginField, 'password'), ['isActive' => 1]);
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
    */
    public function authenticate(): JsonResponse
    {
        $this->ensureIsNotRateLimited();

        if (! Auth::attempt($this->credentials(), $this->boolean('remember'))) {

            RateLimiter::hit($this->throttleKey());

            return $this->error([], 'Not Authenticated', 401);
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
    */
    public function ensureIsNotRateLimited()
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        return $this->error([
            'error' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ], 'Something went wrong', 419);

    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('login')).'|'.$this->ip());
    }
}
