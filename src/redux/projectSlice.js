import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload); 
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload); 
    },
    updateProject: (state, action) => {
      const { id, updatedData } = action.payload;
      const existingProject = state.projects.find((project) => project.id === id);
      if (existingProject) {
        Object.assign(existingProject, updatedData); 
      }
    },
    setProjects: (state, action) => {
      state.projects = action.payload; 
    },
  },
});


export const { addProject, removeProject, updateProject, setProjects } = projectSlice.actions;


export default projectSlice.reducer;
