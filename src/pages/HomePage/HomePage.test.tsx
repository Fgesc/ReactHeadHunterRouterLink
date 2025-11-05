import { describe, it, expect, beforeAll } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../test/utils";
import { HomePage } from "./HomePage";

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

describe("HomePage Компонент", () => {

    it("должен рендерить компонент ", async () => {
        customRender(<HomePage />);
        const title = await screen.findByText(/Список вакансий/i);
        expect(title).toBeInTheDocument();
    });

    it("должен рендерить поле поиска и кнопку и позволять вводить текст", async () => {
        customRender(<HomePage />);

        const input = screen.getByTestId("search-input");
        const button = screen.getByTestId("search-button");

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await userEvent.clear(input);
        await userEvent.type(input, "React");
        expect(input).toHaveValue("React");
    });

    it("должен рендерить контейнер компонента JobFilters который содержит фильтры городов и навыков", async () => {
        customRender(<HomePage />);

        const jobFiltersContainer = await screen.findByTestId("job-filters-container");
        expect(jobFiltersContainer).toBeInTheDocument();
    });

    it("должен позволять добавить навык и удалить его", async () => {
        customRender(<HomePage />);

        const input = await screen.findByTestId("skill-input");
        const addButton = screen.getByTestId("add-skill-button");

        await userEvent.type(input, "React");
        await userEvent.click(addButton);

        const addedPill = await screen.findByTestId("pill-React");
        expect(addedPill).toBeInTheDocument();

        const removeButton = addedPill.querySelector("button");
        expect(removeButton).toBeInTheDocument();

        await userEvent.click(removeButton!);

        await waitFor(() => {
            expect(screen.queryByTestId("pill-React")).not.toBeInTheDocument();
        });
    });
});
