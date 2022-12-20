import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { CreateTodo,DeleteTodo,FetchTodos, UpdateTodo } from '../../Apis/Apis';

// Get Today Date
const getDate = () => {
  let todayDate = new Date();
  let dd = todayDate.getDate();
  let mm = todayDate.getMonth() + 1;
  let yyyy = todayDate.getFullYear();
  return todayDate = yyyy + '-' + mm + '-' + dd;
}

const initialState = {
    loading:false,
    message:"",
    todoIdForDel:"",
    editModal:false,
    delModal:false,
    statusArray:["PENDING","COMPLETED", "DELAYED"],
    today:getDate(),
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
      EditModal(state, action) {
        return {
          ...state,
            editModal:action.payload
        };
      },
      DelModal(state, action) {
        return {
          ...state,
            delModal:action.payload
        };
      },
      SetToday(state) {
        return {
          ...state,
            today:getDate()
        };
      },
      SetTodoDelId(state, action){
        return {
          ...state,
            todoIdForDel:action.payload
        };
      },
      SetStatusArray(state, action){
        return {
          ...state,
            statusArray:action.payload
        };
      },
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

const { reducer, actions } = todoReducers;

export const { EditModal,DelModal,SetToday,SetTodoDelId,SetStatusArray} = actions;

export default reducer;