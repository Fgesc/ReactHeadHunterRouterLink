import ky from "ky";
import type { ApiResponse, typeJob } from "../types/typeJob";
import { BASE_URL, API_INDUSTRY_IT, API_ROLE_FRONTEND, API_ITEMS_PER_PAGE } from "../constants/constantsApi";

const JobService = {
    async searchByQuery(
        query: string,
        page = 0,
        area: string | null = null,
        signal?: AbortSignal
    ): Promise<ApiResponse> {
        const url = new URL(BASE_URL);
        url.searchParams.set("text", query);
        url.searchParams.set("page", String(page));
        url.searchParams.set("industry", String(API_INDUSTRY_IT));
        url.searchParams.set("professional_role", String(API_ROLE_FRONTEND));
        url.searchParams.set("per_page", String(API_ITEMS_PER_PAGE));

        if (area && area !== "all") {
            url.searchParams.set("area", area);
        }

        const response: ApiResponse = await ky.get(url.toString(), { signal }).json<ApiResponse>();

        const safeItems: typeJob[] = response.items.map((job: any) => ({
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

        return {
            found: response.found,
            per_page: response.per_page,
            pages: response.pages,
            page: response.page,
            items: safeItems,
        };
    },
        
};

export default JobService;











