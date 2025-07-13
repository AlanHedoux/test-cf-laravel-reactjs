import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectDetailPage from '../pages/ProjectDetailPage';
import ProjectFormPage from '../pages/ProjectFormPage';
import TaskFormPage from '../pages/TaskFormPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection par défaut vers /projects */}
        <Route path="/" element={<Navigate to="/projects" replace />} />

        {/* Liste des projets */}
        <Route path="/projects" element={<ProjectsPage />} />

        {/* Détail d’un projet */}
        <Route path="/projects/:id" element={<ProjectDetailPage />} />

        {/* Formulaire de création de projet */}
        <Route path="/projects/new" element={<ProjectFormPage />} />

        {/* Formulaire de modification de projet */}
        <Route path="/projects/:id/edit" element={<ProjectFormPage />} />

        {/* Formulaire de création de tâche */}
        <Route path="/tasks/new" element={<TaskFormPage />} />

        {/* Formulaire de modification de tâche */}
        <Route path="/tasks/:taskId/edit" element={<TaskFormPage />} />

        {/* Optionnel : route 404 si aucune correspondance */}
        <Route path="*" element={<h2>Page non trouvée</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
