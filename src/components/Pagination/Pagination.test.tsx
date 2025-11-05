import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../test/utils";
import { Pagination } from "./Pagination";

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

describe("Pagination Компонент", () => {
    const mockOnPageChange = vi.fn();

    beforeEach(() => {
        mockOnPageChange.mockClear();
    });

    it("должен рендерить с правильным количеством страниц и активной страницей", () => {
        customRender(<Pagination page={2} totalPages={5} onPageChange={mockOnPageChange} />);

        const pagination = screen.getByTestId("pagination");
        expect(pagination).toBeInTheDocument();

        for (let i = 1; i <= 5; i++) {
            expect(screen.getByText(String(i))).toBeInTheDocument();
        }

        const activePage = screen.getByText("3"); 
        expect(activePage).toHaveStyle("background-color: rgb(54, 79, 199)");
    });

    it("должен вызывать onPageChange при клике на номера страниц", async () => {
        customRender(<Pagination page={0} totalPages={5} onPageChange={mockOnPageChange} />);

        const page3 = screen.getByText("3");
        await userEvent.click(page3);

        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it("должен вызывать onPageChange при клике на кнопки управления", async () => {
        customRender(<Pagination page={1} totalPages={5} onPageChange={mockOnPageChange} />);

        const nextBtn = screen.getByAltText("Следующая страница");
        const prevBtn = screen.getByAltText("Предыдущая страница");
        const firstBtn = screen.getByAltText("В начало");
        const lastBtn = screen.getByAltText("В конец");

        await userEvent.click(nextBtn);
        expect(mockOnPageChange).toHaveBeenCalledWith(2);

        await userEvent.click(prevBtn);
        expect(mockOnPageChange).toHaveBeenCalledWith(0);

        await userEvent.click(firstBtn);
        expect(mockOnPageChange).toHaveBeenCalledWith(0);

        await userEvent.click(lastBtn);
        expect(mockOnPageChange).toHaveBeenCalledWith(4); 
    });
});

