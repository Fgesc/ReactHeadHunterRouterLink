import ky from "ky";
import { parseVacancyData } from "../utils/parseVacancyData";
import type { typeVacancy } from "../types/typeVacancy";
import { BASE_URL } from "../constants/constantsApi";

export const VacancyService = {
    async getJobById(id: string): Promise<typeVacancy | null> {
        const url = `${BASE_URL}/${id}`;
        const vacancyData: any = await ky.get(url).json();
        return parseVacancyData(vacancyData)
    },
};
