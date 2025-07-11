<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of Project
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // @TODO : utiliser les resources Laravel
        // @TODO : implémenter ça dans un service
        // @TODO : implémenter la pagination
        // @TODO : implémenter la recherche
        // @TODO : implémenter le tri
        // @TODO : implémenter la gestion des erreurs
        // @TODO : Utiliser les Laravel API Resources pour formater la réponse
        return response([
            'message' => 'List of projects',
            'data' => [
                Project::with('tasks')->get()->map(function ($project) {
                    return [
                        'id' => $project->id,
                        'name' => $project->name,
                        'tasks' => $project->tasks->map(function ($task) {
                            return [
                                'id' => $task->id,
                                'title' => $task->title,
                                'status' => $task->status,
                            ];
                        }),
                    ];
                })
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
