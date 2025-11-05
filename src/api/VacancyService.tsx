import ky from "ky";
import type { typeVacancy } from "../types/typeVacancy";
import { BASE_URL } from "../constants/constantsApi";

export const VacancyService = {
    async getJobById(id: string): Promise<typeVacancy | null> {
        const url = `${BASE_URL}/${id}`;
        const vacancyData: any = await ky.get(url).json();
        const vacancy: typeVacancy = {
            id: vacancyData.id ?? crypto.randomUUID(),
            url: vacancyData.alternate_url ?? "",
            name: vacancyData.name ?? "Без названия",
            employer: { name: vacancyData?.employer?.name ?? "Не указано" },
            area: {
                id: vacancyData?.area?.id ?? null,
                name: vacancyData?.area?.name ?? "Не указано",
            },
            schedule: vacancyData?.schedule ? { name: vacancyData.schedule.name } : null,
            salary: vacancyData?.salary
                ? {
                    from: vacancyData.salary.from ?? null,
                    to: vacancyData.salary.to ?? null,
                    currency: vacancyData.salary.currency ?? "RUR",
                }
                : null,
            experience: { name: vacancyData?.experience?.name ?? "Не указан" },
            snippet:
                vacancyData?.snippet?.responsibility ??
                vacancyData?.description ??
                "Описание отсутствует",
        };

        return vacancy;
    },
};
