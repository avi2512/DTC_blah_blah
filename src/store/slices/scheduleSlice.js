import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { scheduleService } from '../../services/schedule.service';

export const fetchSchedules = createAsyncThunk(
    'schedules/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await scheduleService.getAllSchedules();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const scheduleSlice = createSlice({
    name: 'schedules',
    initialState: {
        schedules: [],
        loading: false,
        error: null,
        selectedSchedule: null,
    },
    reducers: {
        setSelectedSchedule: (state, action) => {
            state.selectedSchedule = action.payload;
        },
        clearScheduleError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedules.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSchedules.fulfilled, (state, action) => {
                state.loading = false;
                state.schedules = action.payload;
            })
            .addCase(fetchSchedules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedSchedule, clearScheduleError } = scheduleSlice.actions;
export default scheduleSlice.reducer; 