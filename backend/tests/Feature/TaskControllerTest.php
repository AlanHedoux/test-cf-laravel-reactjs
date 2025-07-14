<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_task()
    {
        $project = Project::factory()->create();

        $response = $this->postJson('/api/tasks', [
            'project_id' => $project->id,
            'title' => 'Ma tâche',
            'status' => 'pending',
        ]);

        $response->assertStatus(201)// créé avec JsonResource donc retourne http code 201 Created
            ->assertJsonStructure([
                'data' => ['id', 'title', 'status', 'project_id'],
            ])
            ->assertJsonFragment(['title' => 'Ma tâche']);

        $this->assertDatabaseHas('tasks', [
            'title' => 'Ma tâche',
            'status' => 'pending',
            'project_id' => $project->id,
        ]);
    }

    /** @test */
    public function it_returns_a_task()
    {
        $task = Task::factory()->create();

        $response = $this->getJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $task->id]);
    }

    /** @test */
    public function it_updates_a_task()
    {
        $task = Task::factory()->create([
            'title' => 'Initial',
            'status' => 'pending',
        ]);

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => 'Modifiée',
            'status' => 'completed',
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Modifiée', 'status' => 'completed']);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Modifiée',
            'status' => 'completed',
        ]);
    }

    /** @test */
    public function it_deletes_a_task()
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertNoContent();
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }
}
