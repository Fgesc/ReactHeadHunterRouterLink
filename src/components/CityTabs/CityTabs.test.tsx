import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../test/utils";
import { CityTabs } from "./CityTabs";
import * as redux from "../../hooks/useRedux";
import { setCityFilter } from "../../reducers/JobsSlice";
import { CITIES_FOR_TABS } from "../../constants/constantsMain";

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


describe("CityTabs Компонент", () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        mockDispatch.mockClear();
        vi.spyOn(redux, "useTypedDispatch").mockReturnValue(mockDispatch);
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({ cityFilter: "1" });
    });

    it("должен рендерить табы, табы должны быть кликабельны", async () => {
        customRender(<CityTabs />);

        for (const city of CITIES_FOR_TABS) {
            const tab = screen.getByTestId(`city-tab-${city.filterValue}`);
            expect(tab).toBeInTheDocument();
            expect(tab).toHaveTextContent(city.label);

            await userEvent.click(tab);
            expect(mockDispatch).toHaveBeenCalledWith(setCityFilter(city.filterValue));
        }
    });
});
