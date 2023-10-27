<?php

namespace App\Http\Requests\Admin\Admin;

use App\Constants\Role;
use App\Rules\NoSpaces;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => ['required', 'unique:admins,username', 'min:4', 'max:12', new NoSpaces],
            'email' => ['required', 'email', 'unique:admins,email', 'max:64', new NoSpaces],
            'password' => 'required|min:6',
            'role' => 'in:' . implode(',', [Role::ROLE_ADMIN, Role::ROLE_STAFF]),
        ];
    }
}
