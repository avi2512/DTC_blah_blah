import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { crewService } from '../../services/crew.service';

export const fetchCrewMembers = createAsyncThunk(
    'crew/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await crewService.getAllCrew();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const crewSlice = createSlice({
    name: 'crew',
    initialState: {
        crewMembers: [],
        loading: false,
        error: null,
        selectedCrew: null,
    },
    reducers: {
        setSelectedCrew: (state, action) => {
            state.selectedCrew = action.payload;
        },
        clearCrewError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCrewMembers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCrewMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.crewMembers = action.payload;
            })
            .addCase(fetchCrewMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedCrew, clearCrewError } = crewSlice.actions;
export default crewSlice.reducer; 