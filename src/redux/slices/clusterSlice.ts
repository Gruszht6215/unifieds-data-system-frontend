import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { setGlobalToastOpen } from './globalToastSlice'
import { Cluster } from '../../interfaces/Cluster';
import { getAllClustersByUserID, createCluster, updateTagsClusterByClusterId, updateOneClusterByClusterId, deleteClusterByClusterId } from '../../services/ClusterService';
import { Tag } from '../../interfaces/Tag';

interface ClusterState {
    clusters: Cluster[];
}

const initialState: ClusterState = {
    clusters: [],
};

export const fetchClusters = createAsyncThunk(
    'cluster/fetchClusters',
    async () => {
        const response = await getAllClustersByUserID()
        return response.data;
    }
);

export const createClusterDispatch = createAsyncThunk(
    'cluster/createCluster',
    async (clusterBody: Cluster, thunkAPI) => {
        const response = await createCluster(clusterBody);
        await thunkAPI.dispatch(setGlobalToastOpen(response))
        return response.data;
    }
);

export const updateTagsClusterByClusterIdDispatch = createAsyncThunk(
    'cluster/updateTagsClusterByClusterId',
    async (payload: { clusterId: string, tagIds: string[] | undefined }, thunkAPI) => {
        const response = await updateTagsClusterByClusterId(payload);
        await thunkAPI.dispatch(setGlobalToastOpen(response))
        return response.data;
    }
);

export const updateOneClusterByClusterIdDispatch = createAsyncThunk(
    'cluster/updateOneClusterByClusterId',
    async (cluster: any, thunkAPI) => {
        const response = await updateOneClusterByClusterId(cluster);
        await thunkAPI.dispatch(setGlobalToastOpen(response))
        return response.data;
    }
);

export const deleteClusterByClusterIdDispatch = createAsyncThunk(
    'cluster/deleteClusterByClusterId',
    async (clusterId: string, thunkAPI) => {
        const response = await deleteClusterByClusterId(clusterId);
        await thunkAPI.dispatch(setGlobalToastOpen(response))
        if (response) {
            return clusterId;
        }
        return null;
    }
);

export const clusterSlice = createSlice({
    name: 'cluster',
    initialState,
    reducers: {
        addTagToCluster: (state, action: PayloadAction<Tag>) => {
            const index = state.clusters.findIndex((cluster) => cluster.id === action.payload.clusters![0].id);
            state.clusters[index].tags!.push(action.payload);
        },
        updateTagByTagIdToCluster: (state, action: PayloadAction<Tag>) => {
            if (!action.payload) {
                return
            }
            let tagId = action.payload.id
            state.clusters.forEach((cluster) => {
                if (cluster.tags) {
                    let tagIndex = cluster.tags.findIndex((tag) => tag.id === tagId);
                    if (tagIndex !== -1) {
                        cluster.tags[tagIndex] = action.payload;
                    }
                }
            })
        },
        clearClusters: (state) => {
            state.clusters = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchClusters.fulfilled, (state, action) => {
            state.clusters = [];
            state.clusters = action.payload;
        });
        builder.addCase(createClusterDispatch.fulfilled, (state, action) => {
            state.clusters.push(action.payload);
        });
        builder.addCase(updateTagsClusterByClusterIdDispatch.fulfilled, (state, action) => {
            const index = state.clusters.findIndex((cluster) => cluster.id === action.payload.id);
            state.clusters[index] = action.payload;
        });
        builder.addCase(updateOneClusterByClusterIdDispatch.fulfilled, (state, action) => {
            const index = state.clusters.findIndex((cluster) => cluster.id === action.payload.id);
            state.clusters[index] = action.payload;
        });
        builder.addCase(deleteClusterByClusterIdDispatch.fulfilled, (state, action) => {
            const index = state.clusters.findIndex((cluster) => cluster.id === action.payload);
            state.clusters.splice(index, 1);
        });
    }
});

export const { addTagToCluster, updateTagByTagIdToCluster, clearClusters } = clusterSlice.actions;
export const clusterSelector = (store: RootState) => store.clusterReducer;
export default clusterSlice.reducer;


