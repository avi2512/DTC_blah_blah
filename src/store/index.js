import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import routeReducer from './slices/routeSlice';
import crewReducer from './slices/crewSlice';
import scheduleReducer from './slices/scheduleSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        routes: routeReducer,
        crew: crewReducer,
        schedules: scheduleReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
}); 