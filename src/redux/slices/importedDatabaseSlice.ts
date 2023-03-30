import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImportedDatabase } from '../../interfaces/ImportedDatabase';
import { RootState } from '../store';
import { getImportedDatabasesByUserID, deleteImportedDatabase } from '../../services/ImportedDatabaseService';
import { setGlobalToastOpen } from '../../redux/slices/globalToastSlice'
import { Tag } from '../../interfaces/Tag';
import { updateTagsColumnByColumnId } from '../../services/ColumnService';
interface ImportedDatabaseState {
    importedDatabases: ImportedDatabase[];
}

const initialState: ImportedDatabaseState = {
    importedDatabases: [],
};

export const fetchImportedDatabases = createAsyncThunk(
    'importedDatabase/fetchImportedDatabases',
    async () => {
        const response = await getImportedDatabasesByUserID()
        return response.data;
    }
);

export const deleteImportedDatabaseDispatch = createAsyncThunk(
    'importedDatabase/deleteImportedDatabase',
    async (importedDbId: string, thunkAPI) => {
        const response = await deleteImportedDatabase(importedDbId)
        await thunkAPI.dispatch(setGlobalToastOpen(response))
        await thunkAPI.dispatch(fetchImportedDatabases())
        return response.data;
    }
);

export const updateTagsColumnByColumnIdDispatch = createAsyncThunk(
    'importedDatabase/updateTagsColumnByColumnId',
    async (payload: { columnId: string, tagIds: any }, thunkAPI) => {
        // Payload example:
        // {    
        //     "columnId": 1,
        //     "tagIds": [6]
        // }
        const response = await updateTagsColumnByColumnId(payload);
        await thunkAPI.dispatch(setGlobalToastOpen(response))
        return response.data;
    }
);

export const importedDatabaseSlice = createSlice({
    name: 'importedDatabase',
    initialState,
    reducers: {
        addTagToColumn: (state, action: PayloadAction<{ tag: Tag, columnId: string }>) => {
            if (!action.payload) {
                return
            }
            let columnId = action.payload.columnId
            //find which table in imported database the column belongs to then add the tag to the column
            state.importedDatabases.forEach((importedDatabase) => {
                importedDatabase.tables!.forEach((table) => {
                    let index = table.columns!.findIndex((column) => column.id === columnId)
                    if (index !== -1) {
                        table.columns![index].tags!.push(action.payload.tag)
                    }
                })
            })
        },
        addColumnDescription: (state, action: PayloadAction<{ columnId: string, description: string }>) => {
            if (!action.payload) {
                return
            }
            let columnId = action.payload.columnId
            state.importedDatabases.forEach((importedDatabase) => {
                importedDatabase.tables!.forEach((table) => {
                    let index = table.columns!.findIndex((column) => column.id === columnId)
                    if (index !== -1) {
                        table.columns![index].description = action.payload.description
                    }
                })
            })
        },
        editTableDescription: (state, action: PayloadAction<{ tableId: string, description: string }>) => {
            if (!action.payload) {
                return
            }
            let tableId = action.payload.tableId
            state.importedDatabases.forEach((importedDatabase) => {
                let index = importedDatabase.tables!.findIndex((table) => table.id === tableId)
                if (index !== -1) {
                    importedDatabase.tables![index].description = action.payload.description
                }
            })
        },
        updateTagByTagIdToColumn: (state, action: PayloadAction<{ tagId: string, tag: Tag }>) => {
            if (!action.payload) {
                return
            }
            let tagId = action.payload.tagId
            state.importedDatabases.forEach((importedDatabase) => {
                importedDatabase.tables!.forEach((table) => {
                    table.columns!.forEach((column) => {
                        let index = column.tags!.findIndex((tag) => tag.id === tagId)
                        if (index !== -1) {
                            column.tags![index] = action.payload.tag
                        }
                    })
                })
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchImportedDatabases.fulfilled, (state, action) => {
            state.importedDatabases = [];
            state.importedDatabases = action.payload;
        });
        builder.addCase(updateTagsColumnByColumnIdDispatch.fulfilled, (state, action) => {
            if (!action.payload) {
                return
            }
            let columnId = action.payload.id
            //find which table in imported database the column belongs to then replace the column with the updated one
            state.importedDatabases.forEach((importedDatabase) => {
                importedDatabase.tables!.forEach((table) => {
                    let index = table.columns!.findIndex((column) => column.id === columnId)
                    if (index !== -1) {
                        table.columns![index] = action.payload
                    }
                })
            })
        });
    },
});

export const { addTagToColumn, addColumnDescription, editTableDescription, updateTagByTagIdToColumn } = importedDatabaseSlice.actions;
export const importedDatabaseSelector = (store: RootState) => store.importedDatabaseReducer;
export default importedDatabaseSlice.reducer;