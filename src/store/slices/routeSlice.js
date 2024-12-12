import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { routeService } from '../../services/route.service';

export const fetchRoutes = createAsyncThunk(
    'routes/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await routeService.getAllRoutes();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createRoute = createAsyncThunk(
    'routes/create',
    async (routeData, { rejectWithValue }) => {
        try {
            const response = await routeService.createRoute(routeData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const routeSlice = createSlice({
    name: 'routes',
    initialState: {
        routes: [],
        loading: false,
        error: null,
        selectedRoute: null,
    },
    reducers: {
        setSelectedRoute: (state, action) => {
            state.selectedRoute = action.payload;
        },
        clearRouteError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoutes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRoutes.fulfilled, (state, action) => {
                state.loading = false;
                state.routes = action.payload;
            })
            .addCase(fetchRoutes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createRoute.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRoute.fulfilled, (state, action) => {
                state.loading = false;
                state.routes.push(action.payload);
            })
            .addCase(createRoute.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedRoute, clearRouteError } = routeSlice.actions;
export default routeSlice.reducer; 