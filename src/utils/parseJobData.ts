import type { typeJob } from "../types/typeJob";

export function parseJobData(resJobs: any[]): typeJob[] {
    return resJobs.map((job) => ({
        id: job.id ?? crypto.randomUUID(), 
        url: job.alternate_url ?? "", 
        name: job?.name ?? "Без названия",
        employer: { name: job?.employer?.name ?? "Не указано" },
        area: {
            id: job?.area?.id ?? null,
            name: job?.area?.name ?? "Не указано",
        },
        schedule: job?.schedule ? { name: job.schedule.name } : null,
        salary: job?.salary
            ? {
                from: job.salary.from ?? null,
                to: job.salary.to ?? null,
                currency: job.salary.currency ?? "RUR",
            }
            : null,
        experience: { name: job?.experience?.name ?? "Не указан" },
    }));
}
