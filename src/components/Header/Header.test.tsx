import { describe, it, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { customRender } from "../../test/utils";
import { Header } from "./Header";

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

describe("Header Компонент", () => {
    it("должен рендерить все основные элементы", () => {
        customRender(<Header />);

        expect(screen.getByTestId("header")).toBeInTheDocument();

        expect(screen.getByTestId("logo-hh")).toBeInTheDocument();
        expect(screen.getByTestId("header-title")).toHaveTextContent(".FrontEnd");

        expect(screen.getByTestId("vacancies-text")).toHaveTextContent("Вакансии FE");

        expect(screen.getByTestId("human-icon")).toBeInTheDocument();
        expect(screen.getByTestId("about-text")).toHaveTextContent("Обо мне");
    });
});
