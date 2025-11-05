import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import JobService from "../api/JobService";
import type { JobsState, FetchJobsArgs } from "../types/typeRedux";
import type { typeJob } from "../types/typeJob";
import { DEFAULT_SKILLS } from "../constants/constantsMain";

export const initialState: JobsState = {
    query: "",
    jobs: [],
    loading: false,
    error: null,
    page: 0,
    itemsPerPage: 10,
    lastQuery: "",
    cityFilter: "all",
    skills: DEFAULT_SKILLS, 
};

let lastController: AbortController | null = null;

export const fetchJobs = createAsyncThunk<
    typeJob[],
    FetchJobsArgs,
    { state: { jobs: JobsState }; rejectValue: string }
>(
  "jobs/fetchJobs",
  async ( {query, ignoreLastQueryCheck} , { getState, rejectWithValue }) => {
    const trimmed = query.trim();
    const { lastQuery } = getState().jobs;

    if (!trimmed) {
        return rejectWithValue("empty-query");
    }

    if (!ignoreLastQueryCheck && trimmed === lastQuery.trim()) {
        return rejectWithValue("same-query");
    }

    try {

        if (lastController) lastController.abort();
        const controller = new AbortController();
        lastController = controller;

        const { cityFilter } = getState().jobs;
        const data = await JobService.searchByQuery(trimmed, 0, cityFilter, controller.signal);

        lastController = null;

        if (!data.items?.length) {
            return rejectWithValue("По вашему запросу ничего не найдено");
        }


        return data.items;
    } catch (e) {
        if ((e as any).name === "AbortError") return rejectWithValue("aborted"); 
        if (e instanceof HTTPError) {
            const status = e.response.status;
            const statusText = e.response.statusText;

            switch (status) {
                case 404:
                    return rejectWithValue("Запрос не найден (404)");
                case 500:
                    return rejectWithValue("Ошибка сервера (500)");
                default:
                    return rejectWithValue(`Ошибка HTTP: ${status} ${statusText}`);
            }
        }

        if (e instanceof Error) {
            return rejectWithValue(`Ошибка сети: ${e.message}`);
        }

        return rejectWithValue("Неизвестная ошибка");
    }
});

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },

        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },

        setCityFilter(state, action: PayloadAction<string>) {
            state.cityFilter = action.payload;
            state.page = 0;
        },

        addSkill(state, action: PayloadAction<string>) {
            if (!state.skills.includes(action.payload)) {
                state.skills.push(action.payload);
                state.page = 0;
            }
        },

        removeSkill(state, action: PayloadAction<string>) {
            state.skills = state.skills.filter((s) => s !== action.payload);
            state.page = 0;
        },
        setSkills(state, action: PayloadAction<string[]>) {
            state.skills = action.payload;
            state.page = 0; 
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchJobs.pending, (state) => {
            state.loading = true;
            state.error = null;

            if (state.query.trim() !== state.lastQuery.trim()) {
                state.jobs = [];
            }
        })

        .addCase(fetchJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.jobs = action.payload;
            state.lastQuery = state.query;
            state.page = 0;
        })

        .addCase(fetchJobs.rejected, (state, action) => {
            if (action.payload === "aborted") return;
            state.loading = false;
            if (action.payload === "same-query" || action.payload === "empty-query") return state;
            state.error = action.payload || "Ошибка";
            state.jobs = [];
        });
    },
});

export const { setQuery, setPage, setCityFilter, addSkill, removeSkill, setSkills } = jobsSlice.actions;
export default jobsSlice.reducer;

