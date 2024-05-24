import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
   'todos/fetchTodos',
   async function (_, {rejectWithValue}) {
      try {
         const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
         
         if (!response.ok) {
            throw new Error('Server Error!');
         }
         const data = await response.json();
         return data;

      } catch (error) {
         return rejectWithValue(error.message);
      }
      
   }
);

export const deleteTodos = createAsyncThunk(
   'todos/deleteTodo',
   async function(id, {rejectWithValue, dispatch}) {
      try {
         const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
         })
         
         if (!response.ok) {
            throw new Error('Can\'t delete task. Server error.');
         }
         dispatch(removeTodo({ id }));

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const setError = (state, action) => {
   state.status = 'rejected';
   state.error = action.payload;
};

const todoSlise = createSlice({
   name: 'todos',
   initialState: {
      todos: [],
      status: null,
      error: null,
   },
   reducers: {
      addTodo(state, action) {
         state.todos.push({
            id: new Date().toISOString(),
            text: action.payload.text,
            completed: false,
         });
      },
      removeTodo(state, action) {
         state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
      },
      toggleTodoComplete(state, action) {
         const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
         toggledTodo.completed = !toggledTodo.completed;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchTodos.pending, (state) => {
         state.status = 'loading';
         state.error = null;
      });
      builder.addCase(fetchTodos.fulfilled, (state, action) => {
         state.status = 'resolved';
         state.todos = action.payload;
      });
      builder.addCase(fetchTodos.rejected, setError);
      builder.addCase(deleteTodos.rejected, setError);
      // builder.addCase(toggleStatusTodos.rejected, setError);
   },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlise.actions;

export default todoSlise.reducer;