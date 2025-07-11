<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // inherit
        User::factory()->create([
            'name' => 'Alan H',
            'email' => 'alan.hedoux+clubfunding@gmail.com',
        ]);

        // custom seeders
        $this->call([
            ProjectWithTasksSeeder::class,
        ]);
    }
}
