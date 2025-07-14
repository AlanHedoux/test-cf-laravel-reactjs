<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of Tasks
     *
     * @return Response
     */
    public function index()
    {
        // no need for the moment
    }

    /**
     * Store a newly created Task
     *
     * @param Request $request
     * @return TaskResource
     */
    public function store(Request $request): TaskResource
    {
        $data = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string',
            'status' => 'required|in:pending,completed',
        ]);
        $task = new Task($data);
        $task->save();

        return new TaskResource($task);
    }

    /**
     * Display the specified Task.
     *
     * @param  int  $id
     * @return Response
     */
    public function show(Task $task): TaskResource
    {
        return new TaskResource($task);
    }

    /**
     * Update the specified Task
     *
     * @param Request $request
     * @param Task $task
     * @return TaskResource
     */
    public function update(Request $request, Task $task) : TaskResource
    {
        $data = $request->validate([
            'title' => 'required|string',
            'status' => 'required|in:pending,completed',
        ]);
        $task->update($data);
        return new TaskResource($task);
    }

    /**
     * Remove the specified Task
     *
     * @param Task $task
     * @return Response
     */
    public function destroy(Task $task): Response
    {
        try {
            $task->delete();
        } catch (\Exception $e) {
            return response(['error' => 'Failed to delete task'], 500);
        }
        return response()->noContent();
    }
}
