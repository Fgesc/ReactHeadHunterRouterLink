export type typeVacancy = {
    id: string; 
    url: string; 
    name: string;
    employer: {
        name: string;
    };
    area: {
        id?: string | null;
        name: string;
    };
    schedule: {
        name: string;
    } | null;
    salary: {
        from: number | null;
        to: number | null;
        currency: string;
    } | null; 
    experience: {
        name: string;
    };
    snippet?: string;
};
