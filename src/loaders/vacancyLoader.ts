import type { LoaderFunctionArgs } from "react-router-dom";
import { VacancyService } from "../api/VacancyService";
import type { typeVacancy } from "../types/typeVacancy";

export type VacancyLoaderData = {
    vacancy: Promise<typeVacancy>;
};

export const vacancyLoader = ({ params }: LoaderFunctionArgs): VacancyLoaderData => {
    const id = params.id;
    if (!id) throw new Response("Not Found", { status: 404 });

    const vacancyPromise = VacancyService.getJobById(id).then((vacancy) => {
        if (!vacancy) {
            throw new Response("Not Found", { status: 404 });
        }
        return vacancy; 
    })
    
    return { vacancy: vacancyPromise };
};



