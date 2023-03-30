 import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
    isLoading: false,
};

export const globalLoadingSlice = createSlice({
    name: 'globalLoading',
    initialState,
    reducers: {
        openGlobalLoading: (state) => {
            state.isLoading = true;
        },
        closeGlobalLoading: (state) => {
            state.isLoading = false;
        }
    },
});

export const { openGlobalLoading, closeGlobalLoading } = globalLoadingSlice.actions;
export const globalLoadingSelector = (store: RootState) => store.globalLoadingReducer;
export default globalLoadingSlice.reducer;