import type { typeJob } from "./typeJob";

export type JobsState = {
    jobs: typeJob[];
    query: string;
    loading: boolean;
    error: string | null;
    page: number;
    itemsPerPage: number;
    lastQuery: string;
    cityFilter: string;
    skills: string[];
};

export type FetchJobsArgs = {
    query: string;
    ignoreLastQueryCheck?: boolean;
};
