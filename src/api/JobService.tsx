import ky from "ky";
import type { ApiResponse } from "../types/typeJob";
import { BASE_URL, API_INDUSTRY_IT, API_ROLE_FRONTEND, API_ITEMS_PER_PAGE } from "../constants/constantsApi";
import { parseJobData } from "../utils/parseJobData";

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

        const safeItems = parseJobData(response.items);

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











