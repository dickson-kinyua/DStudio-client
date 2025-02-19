import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk("tasks/fetchTodo", async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/fetchPosts`, {
    credentials: "include",
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok || !Array.isArray(data)) {
    console.error("Invalid API response:", data);
    return []; // Return an empty array instead of breaking Redux state
  }

  return data;
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteAllTasks: (state) => {
      state.tasks = [];
    },
    updateTasks: (state, action) => {
      const task = state.tasks.find((task) => task._id === action.payload);
      if (item) {
        task.completed = !task.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("No payload received");
          return;
        } else {
          state.loading = false;
          state.tasks = action.payload;
        }
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteAllTasks, updateTasks } = taskSlice.actions;
export default taskSlice.reducer;
