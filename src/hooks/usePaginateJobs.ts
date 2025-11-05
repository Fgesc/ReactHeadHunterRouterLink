import { useMemo } from "react";
import type { typeJob } from "../types/typeJob";

export const usePaginateJobs = (jobs: typeJob[], page: number, itemsPerPage: number) => {
    return useMemo(() => {
        const totalPages = Math.ceil(jobs.length / itemsPerPage);
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        const visibleJobs = jobs.slice(start, end);
        
        return { visibleJobs, totalPages };
    }, [jobs, page, itemsPerPage]);
};