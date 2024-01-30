"use client"

// slices/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string | any;
  title: string | undefined;
  description: string | undefined;
  dueDate: Date | string | number;
  status: string | any;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") as string) ?? [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
          state.tasks.push(action.payload);
          localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
      updateTask: (state, action: PayloadAction<Task>) => {
        const { payload: { id, title, description, dueDate } } = action
          
        state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, description, title, dueDate } : task
      );
          localStorage.setItem("tasks", JSON.stringify(state.tasks))
        
    },
    deleteTask: (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
          localStorage.setItem("tasks", JSON.stringify(state.tasks))
        
      },
    updateStatus: (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
          localStorage.setItem("tasks", JSON.stringify(state.tasks))
        
    },
  },
});

export const { addTask, updateTask, deleteTask, updateStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
