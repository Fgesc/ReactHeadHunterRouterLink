import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../test/utils";
import { JobList } from "./JobList";
import * as redux from "../../hooks/useRedux";
import { setPage } from "../../reducers/JobsSlice";
import { jobsResponse } from "../../mocks/response";


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

describe("JobList Компонент", () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        mockDispatch.mockClear();
        vi.spyOn(redux, "useTypedDispatch").mockReturnValue(mockDispatch);
    });

    it("должен показывать лоадер при загрузке", () => {
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({
            loading: true,
            error: null,
            page: 0,
            jobs: [],
            itemsPerPage: 5,
            skills: [],
        });

        customRender(<JobList />);
        expect(screen.getByTestId("custom-loader")).toBeInTheDocument();
    });

    it("должен отображать список вакансий", () => {
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({
            loading: false,
            error: null,
            page: 0,
            jobs: jobsResponse.items,
            itemsPerPage: 10,
            skills: [],
        });

        customRender(<JobList />);
        const list = screen.getByTestId("jobs-list");
        expect(list).toBeInTheDocument();

        for (const job of jobsResponse.items.slice(0, 10)) {
            const jobCardTitle = screen.getByTestId(`job-title-${job.id}`);
            expect(jobCardTitle).toBeInTheDocument();
            expect(jobCardTitle).toHaveTextContent(job.name);

            const jobCard = screen.getByTestId(`job-item-${job.id}`);
            expect(jobCard).toBeInTheDocument();
        }
    });


    it("должен показывать сообщение об ошибке", () => {
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({
            loading: false,
            error: "Ошибка загрузки",
            page: 0,
            jobs: [],
            itemsPerPage: 10,
            skills: [],
        });

        customRender(<JobList />);
        const error = screen.getByTestId("jobs-error");
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent("Ошибка загрузки");
    });

    it("должен показывать сообщение при пустом результате фильтра, если данные пришли, но фильты остортировали все и нет подходящих вакансий", () => {
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({
            loading: false,
            error: null,
            page: 0,
            jobs: [],
            itemsPerPage: 10,
            skills: ["копать грядки", "поливать цветы"],
        });

        customRender(<JobList />);
        expect(screen.getByText("По выбранным фильтрам ничего не найдено")).toBeInTheDocument();
    });

    it("должен показывать сообщение об ошибке, если данные не загрузились", () => {
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({
            loading: false,
            error: "Ошибка сети: Сеть недоступна",
            page: 0,
            jobs: [], 
            itemsPerPage: 10,
            skills: [],
        });

        customRender(<JobList />);

        const errorMessage = screen.getByTestId("jobs-error");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent("Ошибка сети: Сеть недоступна");

        expect(screen.queryByTestId("custom-loader")).not.toBeInTheDocument();
        expect(screen.queryByText("По выбранным фильтрам ничего не найдено")).not.toBeInTheDocument();
    });

    it("должна работать пагинация и вызывать setPage", async () => {
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({
            loading: false,
            error: null,
            page: 0,
            jobs: jobsResponse.items,
            itemsPerPage: 10, 
            skills: [],
        });

        customRender(<JobList />);
        const nextPageBtn = screen.getByAltText("Следующая страница");
        await userEvent.click(nextPageBtn);

        expect(mockDispatch).toHaveBeenCalledWith(setPage(1));
    });
});
