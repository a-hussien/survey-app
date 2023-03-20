<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = ['add', 'edit', 'delete', 'list'];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $roles = ['super-admin', 'normal-user'];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        $createdRoles = Role::all();
        $createdRoles[0]->syncPermissions(Permission::all());
        $createdRoles[1]->syncPermissions(['list', 'add']);
    }
}
