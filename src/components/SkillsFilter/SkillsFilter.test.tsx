import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../test/utils";
import { SkillsFilter } from "./SkillsFilter";
import * as redux from "../../hooks/useRedux";
import { addSkill, removeSkill } from "../../reducers/JobsSlice";

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

describe("SkillsFilter Компонент", () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        mockDispatch.mockClear();
        vi.spyOn(redux, "useTypedDispatch").mockReturnValue(mockDispatch);
    });

    it("должен рендерить и отображать навыки из состояния", () => {
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({ skills: ["React", "TypeScript"] });

        customRender(<SkillsFilter/>);

        const filter = screen.getByTestId("skills-filter");
        expect(filter).toBeInTheDocument();

        expect(screen.getByTestId("pill-React")).toBeInTheDocument();
        expect(screen.getByTestId("pill-TypeScript")).toBeInTheDocument();
    });

    it("должен добавлять новый навык при клике на кнопку", async () => {
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({ skills: [] });

        customRender(<SkillsFilter/>);

        const input = screen.getByTestId("skill-input");
        const addButton = screen.getByTestId("add-skill-button");

        await userEvent.type(input, "Vitest");
        await userEvent.click(addButton);

        expect(mockDispatch).toHaveBeenCalledWith(addSkill("Vitest"));
    });

    it("должен удалять навык при клике на кнопку удаления", async () => {
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({ skills: ["React"] });

        customRender(<SkillsFilter/>);

        const pill = screen.getByTestId("pill-React");
        const removeButton = pill.querySelector("button"); 

        if (removeButton) {
            await userEvent.click(removeButton);
        }

        expect(mockDispatch).toHaveBeenCalledWith(removeSkill("React"));
    });
});
