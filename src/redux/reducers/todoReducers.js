import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { CreateTodo,DeleteTodo,FetchTodos, UpdateTodo } from '../../Apis/Apis';
const initialState = {
    loading:false,
    message:"",
    todos:[]
};

export const createTodo = createAsyncThunk(
    "createTodo",
    async (body, thunkAPI) => {
      try {
        const response = await axios.post(CreateTodo, body);
        return response.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return thunkAPI.rejectWithValue({
            message: err.response.data,
          });
        } else {
          return thunkAPI.rejectWithValue({
            message: "Network Error",
          });
        }
      }
    }
  );

export const fetchTodos = createAsyncThunk(
    "fetchTodos",
    async (thunkAPI) => {
      try {
        const response = await axios.get(FetchTodos);
        return response.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return thunkAPI.rejectWithValue({
            message: err.response.data,
          });
        } else {
          return thunkAPI.rejectWithValue({
            message: "Network Error",
          });
        }
      }
    }
  );

  export const deleteTodo = createAsyncThunk(
    "deleteTodo",
    async (id,thunkAPI) => {
      try {
        const response = await axios.delete(`${DeleteTodo}/${id}`);
        return response.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return thunkAPI.rejectWithValue({
            message: err.response.data,
          });
        } else {
          return thunkAPI.rejectWithValue({
            message: "Network Error",
          });
        }
      }
    }
  );

  export const updateTodo = createAsyncThunk(
    "updateTodo",
    async (body,thunkAPI) => {
      let id=body.id;
      try {
        const response = await axios.patch(`${UpdateTodo}/${id}`,body);
        return response.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return thunkAPI.rejectWithValue({
            message: err.response.data,
          });
        } else {
          return thunkAPI.rejectWithValue({
            message: "Network Error",
          });
        }
      }
    }
  );



const todoReducers = createSlice({
    name: 'Todo',
    initialState,
    reducers: {
    },
    extraReducers: {
        [createTodo.pending]: (state, action) => {
          return {
            ...state,
            message:"",
            loading: true,
          };
        },
        [createTodo.fulfilled]: (state, action) => {
          return {
            ...state,
            todos:[...state.todos,action.payload.todo],
            message:action.payload.message,
            loading: false,
          };
        },
        [createTodo.rejected]: (state, action) => {
          return {
            ...state,
            loading: false,
            message: action.payload.message,
          };
        },
        [fetchTodos.pending]: (state, action) => {
          return {
            ...state,
            message:"",
            loading: true,
          };
        },
        [fetchTodos.fulfilled]: (state, action) => {
          return {
            ...state,
            todos:action.payload,
            loading: false,
          };
        },
        [fetchTodos.rejected]: (state, action) => {
          return {
            ...state,
            loading: false,
            message: action.payload.message,
          };
        },
        [deleteTodo.pending]: (state, action) => {
          return {
            ...state,
            message:"",
            loading: true,
          };
        },
        [deleteTodo.fulfilled]: (state, action) => {
          return {
            ...state,
            message:action.payload,
            loading: false,
          };
        },
        [deleteTodo.rejected]: (state, action) => {
          return {
            ...state,
            loading: false,
            message: action.payload.message,
          };
        },
        [updateTodo.pending]: (state, action) => {
          return {
            ...state,
            message:"",
            loading: true,
          };
        },
        [updateTodo.fulfilled]: (state, action) => {
          return {
            ...state,
            message:action.payload.message,
            loading: false,
          };
        },
        [updateTodo.rejected]: (state, action) => {
          return {
            ...state,
            loading: false,
            message: action.payload.message,
          };
        },


    }
});


export default todoReducers.reducer;