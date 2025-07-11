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
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return TaskResource
     */
    public function store(Request $request): TaskResource
    {
        // @TODO pour le moment non fonctionnel
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
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
     * Remove the specified resource from storage.
     *
     * @param Task $task
     * @return Response
     */
    public function destroy(Task $task): Response
    {
        // delete task
        try {
            $task->delete();
        } catch (\Exception $e) {
            return response(['error' => 'Failed to delete task'], 500);
        }
        return response()->noContent();
    }
}
