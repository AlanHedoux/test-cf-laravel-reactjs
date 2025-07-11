<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Seeder;

class ProjectWithTasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Create 10 projects, each with 5 tasks
        Project::factory()
            ->count(10)
            ->has(Task::factory()->count(5), 'tasks')
            ->create();
    }
}
