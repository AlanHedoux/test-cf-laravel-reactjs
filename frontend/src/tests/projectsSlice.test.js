import reducer, {
  addProject,
  updateProject,
  deleteProject,
  fetchProjects,
  fetchProjectById,
  deleteTask,
} from '../features/projects/projectsSlice';

const initialState = {
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 5,
  },
  current: null,
  loading: false,
  error: null,
};

// TESTS sync reducers

describe('projectsSlice reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle addProject', () => {
    const newProject = { id: 1, name: 'Test Project', tasks: [] };
    const nextState = reducer(initialState, addProject(newProject));
    expect(nextState.data).toHaveLength(1);
    expect(nextState.data[0]).toEqual(newProject);
  });

  it('should handle updateProject', () => {
    const prevState = {
      ...initialState,
      data: [{ id: 1, name: 'Old Name', tasks: [] }],
    };
    const updatedProject = { id: 1, name: 'Updated Name', tasks: [] };
    const nextState = reducer(prevState, updateProject(updatedProject));
    expect(nextState.data[0].name).toBe('Updated Name');
  });

  it('should handle deleteProject', () => {
    const prevState = {
      ...initialState,
      data: [
        { id: 1, name: 'To delete' },
        { id: 2, name: 'Keep' },
      ],
    };
    const nextState = reducer(prevState, deleteProject(1));
    expect(nextState.data).toHaveLength(1);
    expect(nextState.data[0].id).toBe(2);
  });
});

// TEST async extraReducers
describe('projectsSlice async thunks', () => {
  it('should handle fetchProjects.pending', () => {
    const action = { type: fetchProjects.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchProjects.fulfilled', () => {
    const action = {
      type: fetchProjects.fulfilled.type,
      payload: {
        data: [{ id: 1, name: 'Fetched' }],
        meta: { total: 1, current_page: 1, last_page: 1, per_page: 5 },
      },
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.data).toHaveLength(1);
    expect(state.meta.total).toBe(1);
  });

  it('should handle fetchProjects.rejected', () => {
    const action = {
      type: fetchProjects.rejected.type,
      payload: 'Erreur réseau',
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Erreur réseau');
  });

  it('should handle fetchProjectById.fulfilled', () => {
    const project = { id: 5, name: 'One project', tasks: [] };
    const action = {
      type: fetchProjectById.fulfilled.type,
      payload: project,
    };
    const state = reducer(initialState, action);
    expect(state.current).toEqual(project);
    expect(state.loading).toBe(false);
  });

  it('should handle deleteTask.fulfilled', () => {
    const prevState = {
      ...initialState,
      current: {
        id: 1,
        name: 'Project with tasks',
        tasks: [
          { id: 10, title: 'Task 1' },
          { id: 20, title: 'Task 2' },
        ],
      },
    };
    const action = {
      type: deleteTask.fulfilled.type,
      payload: { projectId: 1, taskId: 10 },
    };
    const state = reducer(prevState, action);
    expect(state.current.tasks).toHaveLength(1);
    expect(state.current.tasks[0].id).toBe(20);
  });
});
