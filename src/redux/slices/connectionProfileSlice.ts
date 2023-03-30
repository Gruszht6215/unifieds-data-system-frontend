import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ConnectionProfile } from '../../interfaces/ConnectionProfile';
import { RootState } from '../store';
import { getAllConnectionProfiles, createConnectionProfile, deleteConnectionProfile, updateConnectionProfile } from '../../services/ConnectionProfileService';
import { setGlobalToastOpen } from '../../redux/slices/globalToastSlice'
interface ConnectionProfileState {
    connectionProfiles: ConnectionProfile[];
}

const initialState: ConnectionProfileState = {
    connectionProfiles: [],
};

//dispatch คือการส่งค่าไปยัง reducer
export const fetchConnectionProfiles = createAsyncThunk(
    'connectionProfile/fetchConnectionProfiles',
    async () => {
        const response = await getAllConnectionProfiles()
        return response.data;
    }
);
export const createConnectionProfileDispatch = createAsyncThunk(
    'connectionProfile/createConnectionProfile',
    async (connectionProfileBody: ConnectionProfile, thunkAPI) => {
        const response = await createConnectionProfile(connectionProfileBody);
        await thunkAPI.dispatch(setGlobalToastOpen(response))
        return response.data;
    }
);
export const deleteConnectionProfileDispatch = createAsyncThunk(
    'connectionProfile/deleteConnectionProfile',
    async (connectionProfileId: string, thunkAPI) => {
        const response = await deleteConnectionProfile(connectionProfileId);
        await thunkAPI.dispatch(setGlobalToastOpen(response))
        if (response) {
            return connectionProfileId;
        }
        return null;
    }
);
export const updateConnectionProfileDispatch = createAsyncThunk(
    'connectionProfile/updateConnectionProfile',
    async (connectionProfileBody: any, thunkAPI) => {
        const response = await updateConnectionProfile(connectionProfileBody);
        await thunkAPI.dispatch(setGlobalToastOpen(response))
        return response.data;
    }
);

export const connectionProfileSlice = createSlice({
    name: 'connectionProfile',
    initialState,
    reducers: {
        // addConnectionProfile: (state: ConnectionProfileState, action: PayloadAction<ConnectionProfile>) => {
        //     state.connectionProfiles.push(action.payload);
        // }
        // deleteConnectionProfile: (state: ConnectionProfileState) => {
        //     state.connectionProfiles = [];
        // }
    },
    extraReducers(builder) {
        builder.addCase(fetchConnectionProfiles.fulfilled, (state, action) => {
            state.connectionProfiles = [];
            state.connectionProfiles = action.payload;
        });
        builder.addCase(createConnectionProfileDispatch.fulfilled, (state, action) => {
            if (action.payload) {
                state.connectionProfiles.push(action.payload);
            }
        });
        builder.addCase(deleteConnectionProfileDispatch.fulfilled, (state, action) => {
            if (action.payload) {
                const connectionID = action.payload;
                const updatedArray = state.connectionProfiles.filter(connection => connection.id !== connectionID);
                state.connectionProfiles = [];
                state.connectionProfiles = updatedArray;
            }
        });
        builder.addCase(updateConnectionProfileDispatch.fulfilled, (state, action) => {
            if (action.payload) {
                const connectionID = action.payload.id;
                const index = state.connectionProfiles.findIndex(connection => connection.id === connectionID);
                if (index !== -1) {
                    state.connectionProfiles.splice(index, 1, action.payload);
                }
            }
        });
    },
});

// export const { /*addConnectionProfile*/deleteConnectionProfile } = connectionProfileSlice.actions;
export const connectionProfileSelector = (store: RootState) => store.connectionProfileReducer;
export default connectionProfileSlice.reducer;