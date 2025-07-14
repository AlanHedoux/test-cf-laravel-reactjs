<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;

use App\Models\Project;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of Project
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return ProjectResource::collection(
            Project::with('tasks')
                ->paginate(5)
        );
    }

    /**
     * Store a newly created Project
     *
     * @param Request $request
     * @return ProjectResource
     */
    public function store(Request $request) : ProjectResource
    {
        $data = $request->validate(['name' => 'required|string']);// TODO : créer un validator spécifique?
        $project = new Project($data);
        $project->save();
        return new ProjectResource($project);
    }

    /**
     * Display the specified Project.
     *
     * @param Project $project
     * @return ProjectResource
     */
    public function show(Project $project) : ProjectResource
    {
        return new ProjectResource($project->load('tasks'));
    }

    /**
     * Update the specified Project
     *
     * @param Request $request
     * @param Project $project
     * @return ProjectResource
     */
    public function update(Request $request, Project $project) : ProjectResource
    {
        $data = $request->validate(['name' => 'required|string']);
        $project->update($data);
        return new ProjectResource($project);
    }

    /**
     * Remove the specified Project
     *
     * @param Project $project
     * @return Response
     */
    public function destroy(Project $project) : Response
    {
        // delete project and cascade delete associated tasks
        try {
            $project->tasks()->each(function ($task) {
                $task->delete();
            });
            $project->delete();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete project and tasks'], 500);
        }
        return response()->noContent();
    }
}
