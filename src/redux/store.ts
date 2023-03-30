import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

import globalModalReducer from "./slices/globalModalSlice";
import globalToastReducer from "./slices/globalToastSlice";
import globalLoadingReducer from "./slices/globalLoadingSlice";
import connectionProfileReducer from "./slices/connectionProfileSlice";
import importedDatabaseReducer from "./slices/importedDatabaseSlice";
import clusterReducer from "./slices/clusterSlice";


// create reducer
const reducer = {
    globalToastReducer,
    globalModalReducer,
    globalLoadingReducer,
    connectionProfileReducer,
    importedDatabaseReducer,
    clusterReducer,
}

export const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // serializableCheck: false,
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [
                    'globalModal/openGlobalModal',
                    'globalToast/openGlobalToast/fulfilled',
                ],
                // Ignore these paths in the state
                ignoredPaths: [
                    `globalModalReducer.modalState.modalProps.confirmAction`,
                    `globalToastReducer.modalState.modalProps.confirmAction`
                ],
            },

        }),
});

// export type of root state from reducer
export type RootState = ReturnType<typeof store.getState>;
//export AppDispatch type
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

//export wrapper
export const wrapper = createWrapper(() => store, { debug: true });