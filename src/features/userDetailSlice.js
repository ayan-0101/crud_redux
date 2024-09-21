import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filter, map } from "lodash";


// create action   
// using mockapi to fetch and use CRUD 

export const createUser = createAsyncThunk('createUser', async (data, { rejectWithValue }) => {
    const response = await fetch('https://66e86955b17821a9d9dc9df9.mockapi.io/crud', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})


//read action

export const showUser = createAsyncThunk('showUser', async (data, { rejectWithValue }) => {
    const response = await fetch('https://66e86955b17821a9d9dc9df9.mockapi.io/crud');
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

//Delete action

export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
    const response = await fetch(`https://66e86955b17821a9d9dc9df9.mockapi.io/crud/${id}`, {
        method: 'DELETE',
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

// update action

export const updateUser = createAsyncThunk('updateUser', async (data, { rejectWithValue }) => {
    
    const response = await fetch(`https://66e86955b17821a9d9dc9df9.mockapi.io/crud/${data.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})


// creating a  slice
export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        user: [],
        loading: false,
        error: null,
        searchData:[]
    },
    reducers:{
        searchUser : (state, action) => {
            state.searchData = action.payload;
        }
    },

    // handling the promise return by functions

    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user.push(action.payload)
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.user = action.payload.message;
            })
            .addCase(showUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.user = action.payload.message;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.user = filter(state.user, (element) => element.id !== id)
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.user = action.payload.message;
            })

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = map(state.user, (element)=>(
                    element.id === action.payload.id ? action.payload : element
                ))
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.user = action.payload.message;
            })
    }
})

export default userDetail.reducer;
export const {searchUser} =userDetail.actions;