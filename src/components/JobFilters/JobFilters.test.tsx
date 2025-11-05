import { describe, it, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "../../test/utils";
import { JobFilters } from "./JobFilters";

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

describe("JobFilters Компонент", () => {

    it("должен отрендерить компонент ", async () => {
        customRender(<JobFilters />);
        const jobFiltersContainer = await screen.findByTestId("job-filters-container");
        expect(jobFiltersContainer).toBeInTheDocument();
    });

    it("должен отрендерить фильтр skills", async () => {
        customRender(<JobFilters />);
        const skillsFilter = await screen.findByTestId("skills-filter");
        expect(skillsFilter).toBeInTheDocument();
    });
    
});
