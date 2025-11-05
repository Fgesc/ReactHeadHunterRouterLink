export type ApiResponse = {
    found: number;
    per_page: number;
    pages: number;
    page: number;
    items: typeJob[];
};

export type typeJob = {
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
};
