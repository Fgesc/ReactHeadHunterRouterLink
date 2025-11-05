import { describe, it, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { JobCard } from "./JobCard";
import { jobsResponse } from "../../mocks/response"; 
import { customRender } from "../../test/utils";

beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
});

describe("JobCard Компонент", () => {
    const mockJob = jobsResponse.items[0]; 

    it("должен рендерить карточку и название вакансии", () => {
        customRender(<JobCard job={mockJob} />);
        const card = screen.getByTestId(`job-item-${mockJob.id}`);
        expect(card).toBeInTheDocument();

        const title = screen.getByTestId(`job-title-${mockJob.id}`);
        expect(title).toHaveTextContent(mockJob.name);
    });

    it("должен рендерить зарплату и опыт", () => {
        customRender(<JobCard job={mockJob} />);
        
        if (mockJob.salary) {
            const salary = screen.getByTestId(`job-salary-${mockJob.id}`);
            expect(salary).toHaveTextContent(/\d+/);
        }

        if (mockJob.experience?.name) {
            const experience = screen.getByTestId(`job-experience-${mockJob.id}`);
            expect(experience).toHaveTextContent(mockJob.experience.name);
        }
    });

    it("должен рендерить компанию, график и регион", () => {
        customRender(<JobCard job={mockJob} />);

        const employer = screen.getByTestId(`job-employer-${mockJob.id}`);
        expect(employer).toHaveTextContent(mockJob.employer?.name || "Компания не указана");

        if (mockJob.schedule?.name) {
            const schedule = screen.getByTestId(`job-schedule-${mockJob.id}`);
            expect(schedule).toHaveTextContent(mockJob.schedule.name.toUpperCase());
        }

        const area = screen.getByTestId(`job-area-${mockJob.id}`);
        expect(area).toHaveTextContent(mockJob.area?.name || "Регион не указан");
    });

    it("должен рендерить кнопки с правильными ссылками", () => {
        customRender(<JobCard job={mockJob} />);
        const viewBtn = screen.getByTestId(`job-view-btn-${mockJob.id}`);
        expect(viewBtn).toBeInTheDocument();

        const applyBtn = screen.getByTestId(`job-apply-btn-${mockJob.id}`);
        expect(applyBtn).toHaveAttribute("href", mockJob.url);
    });
});

