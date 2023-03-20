<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RolesSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesSeeder::class);

        $user = \App\Models\User::firstOrCreate([
            'name' => 'Ahmed Hussein',
            'username' => 'a-hussien',
            'email' => 'test@test.com',
            'email_verified_at' => now(),
            'password' => bcrypt('12345678'),
            'remember_token' => \Str::random(10),
        ]);

        $user->assignRole('super-admin');

        \App\Models\User::factory(150)->create();
    }
}
