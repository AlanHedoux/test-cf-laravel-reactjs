<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Project;
use App\Models\Task;

class ProjectControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_lists_projects_with_tasks()
    {
        $project = Project::factory()->hasTasks(3)->create();

        $response = $this->getJson('/api/projects');

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => $project->name])
            ->assertJsonStructure(['data' => [['id', 'name', 'tasks']]]);
    }

    /** @test */
    public function it_creates_a_project()
    {
        $response = $this->postJson('/api/projects', [
            'name' => 'My Test Project'
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'My Test Project']);

        $this->assertDatabaseHas('projects', ['name' => 'My Test Project']);
    }

    /** @test */
    public function it_shows_a_project_with_tasks()
    {
        $project = Project::factory()->hasTasks(2)->create();

        $response = $this->getJson("/api/projects/{$project->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $project->id])
            ->assertJsonStructure(['data' => ['id', 'name', 'tasks']]);
    }

    /** @test */
    public function it_updates_a_project()
    {
        $project = Project::factory()->create(['name' => 'Old Name']);

        $response = $this->putJson("/api/projects/{$project->id}", [
            'name' => 'Updated Name'
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Updated Name']);

        $this->assertDatabaseHas('projects', ['id' => $project->id, 'name' => 'Updated Name']);
    }

    /** @test */
    public function it_deletes_a_project_and_its_tasks()
    {
        $project = Project::factory()->create();
        $task = Task::factory()->create(['project_id' => $project->id]);

        $response = $this->deleteJson("/api/projects/{$project->id}");

        $response->assertNoContent();
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    /** @test */
    public function it_validates_project_creation()
    {
        $response = $this->postJson('/api/projects', []); // no name provided

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }
}
