import { useMemo } from "react";
import { type typeJob } from "../types/typeJob";

export const useFilterJobs = (jobs: typeJob[], skills: string[]) => {
    return useMemo(() => {
        if (!skills.length) return jobs;
        return jobs.filter(job =>
            skills.some(skill => job.name.toLowerCase().includes(skill.toLowerCase()))
        );
    }, [jobs, skills]);
};
