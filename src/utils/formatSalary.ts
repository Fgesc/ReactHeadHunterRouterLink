import type { typeJob } from "../types/typeJob";

export const formatSalary = (salary: typeJob["salary"]): string | null => {
    if (!salary) return null;
    const { from, to, currency } = salary;

    if (from && to && from === to) return `${from} ${currency}`;
    if (from && to) return `от ${from} до ${to} ${currency}`;
    if (from) return `от ${from} ${currency}`;
    if (to) return `до ${to} ${currency}`;

    return null;
};