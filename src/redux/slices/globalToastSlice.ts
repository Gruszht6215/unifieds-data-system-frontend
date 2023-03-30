import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { GlobalModal, GlobalModalProps, GlobalModalType, GlobalModalPropsType } from '../../interfaces/GlobalModal';

const initialState = {
    isToastOpen: false,
    modalState: {} as GlobalModal,
};

export const openGlobalToast = createAsyncThunk(
    'globalToast/openGlobalToast',
    async (globalModal: GlobalModal, thunkAPI) => {
        setTimeout(() => {
            thunkAPI.dispatch(closeGlobalToast())
        }, 3500)
        return globalModal;
    }
);

//Example Usage:
// const toastMsg = {
//     status: 'error',
//     message: 'Error updating table description'
// }
// dispatch(setGlobalToastOpen(toastMsg));
export const setGlobalToastOpen = createAsyncThunk(
    'globalToast/setGlobalToastOpen',
    async (response: any, thunkAPI) => {
        let modalProps: GlobalModalProps = {
            type: GlobalModalPropsType.ERROR,
            title: "Error",
            description: "Somethin went wrong",
            confirmAction: () => { }
        }
        if (response.status === 'error') {
            modalProps = {
                type: GlobalModalPropsType.ERROR,
                title: "Failed",
                description: response.message,
                confirmAction: () => { }
            }
            const modalPayload: GlobalModal = {
                modalType: GlobalModalType.TWO_BUTTONS,
                modalProps: modalProps,
            }
            await thunkAPI.dispatch(openGlobalToast(modalPayload))
        } else if (response.status === 'success') {
            modalProps = {
                type: GlobalModalPropsType.SUCCESS,
                title: "Success",
                description: response.message,
                confirmAction: () => { }
            }
            const modalPayload: GlobalModal = {
                modalType: GlobalModalType.TWO_BUTTONS,
                modalProps: modalProps,
            }
            await thunkAPI.dispatch(openGlobalToast(modalPayload))
        } else {
            modalProps = {
                type: GlobalModalPropsType.ERROR,
                title: "Error",
                description: "Something went wrong",
                confirmAction: () => { }
            }
            const modalPayload: GlobalModal = {
                modalType: GlobalModalType.TWO_BUTTONS,
                modalProps: modalProps,
            }
            await thunkAPI.dispatch(openGlobalToast(modalPayload))
        }
    }
);

export const globalToastSlice = createSlice({
    name: 'globalToast',
    initialState,
    reducers: {
        closeGlobalToast: (state) => {
            state.isToastOpen = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(openGlobalToast.fulfilled, (state, action) => {
            state.isToastOpen = true;
            state.modalState = action.payload;
        });
    }
});

export const { closeGlobalToast } = globalToastSlice.actions;
export const globalToastSelector = (store: RootState) => store.globalToastReducer;
export default globalToastSlice.reducer;