<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Task;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class SendPendingTasksReminder extends Command
{
    protected $signature = 'tasks:send-reminders';
    protected $description = 'Envoie un rappel pour les tâches en attente depuis plus de 7 jours';

    public function handle(): void
    {
        $sevenDaysAgo = Carbon::now()->subDays(7);

        $tasks = Task::where('status', 'pending')
            ->where('created_at', '<=', $sevenDaysAgo)
            ->get();

        if ($tasks->isEmpty()) {
            // Aucune tâche en attente à rappeler
            return;
        }

        foreach ($tasks as $task) {
            // Simulation envoi de mail
            Log::info(
                "Rappel : La tâche '{$task->title}' (ID: {$task->id}) est en attente depuis plus de 7 jours."
            );
        }
    }
}
