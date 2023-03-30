import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { GlobalModal } from '../../interfaces/GlobalModal';

const initialState = {
    isModalOpen: false,
    modalState: {} as GlobalModal,
};

export const globalModalSlice = createSlice({
    name: 'globalModal',
    initialState,
    reducers: {
        openGlobalModal: (state, action: PayloadAction<GlobalModal>) => {
            state.isModalOpen = true;
            state.modalState = action.payload;
        },
        closeGlobalModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { openGlobalModal, closeGlobalModal } = globalModalSlice.actions;
export const globalModalSelector = (store: RootState) => store.globalModalReducer;
export default globalModalSlice.reducer;