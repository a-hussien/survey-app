<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(100)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'username' => 'tester',
        //     'email' => 'test@test.com',
        //     'email_verified_at' => now(),
        //     'password' => bcrypt('12345678'),
        //     'remember_token' => \Str::random(10),
        // ]);
    }
}
