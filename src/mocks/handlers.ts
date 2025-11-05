import { http, HttpResponse } from 'msw';
import { jobsResponse } from './response';

const JOBS_API_URL = 'https://api.hh.ru/vacancies*';

export const handlers = [
    http.get(JOBS_API_URL , () => {
        return HttpResponse.json(jobsResponse);
    }),
];
