import { useState } from "react";
import { Title, Group, TextInput, Button, Pill, Stack, useMantineTheme } from "@mantine/core";
import PlusIcon from "../../assets/plus.svg"
import { useTypedDispatch, useTypedSelector } from "../../hooks/useRedux";
import { addSkill, removeSkill } from "../../reducers/JobsSlice";

export const SkillsFilter = () => {
    const theme = useMantineTheme();
    const [inputValue, setInputValue] = useState("");
    const [hovered, setHovered] = useState(false);
    const dispatch = useTypedDispatch();
    const { skills } = useTypedSelector((state) => state.jobs);

    const handleAddSkill = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !skills.includes(trimmed)) {
            dispatch(addSkill(trimmed));
            setInputValue("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddSkill();
        }
    };

    return (
        <Stack
            data-testid="skills-filter"
            w={317}
            mih={206}
            p={24}
            gap={12}
            bg="white"
            style={{
                boxSizing: "border-box",
                borderRadius: "12px",
            }}
        >
            <Title order={3} size={14}>
                Ключевые навыки
            </Title>

            <Group gap={8}>
                <TextInput
                    data-testid="skill-input"
                    maxLength={14}
                    placeholder="Навык"
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    size="xs"
                    styles={{
                        input: {
                        width: "227px",
                        border: `1px solid ${theme.other.colors.preLight}`,
                        borderRadius: "8px",
                        },
                    }}
                />

                <Button
                    data-testid="add-skill-button"
                    w={34}
                    h={30}
                    p={4}
                    radius="8px"
                    onClick={handleAddSkill}
                    style={{
                        opacity: hovered ? 1 : 0.5,
                        transition: "opacity 0.2s",
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <img src={PlusIcon} width={15} height={15} alt="Плюсик" />
                </Button>
            </Group>

            <Group mt="sm" gap="xs" justify="flex-start">
                {skills.map((skill) => (
                    <Pill
                        data-testid={`pill-${skill}`}
                        key={skill}
                        withRemoveButton
                        onRemove={() => dispatch(removeSkill(skill))}
                        styles={{
                        root: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px",
                            paddingLeft: "12px",
                            paddingRight: "2px",
                            borderRadius: "99px",
                            backgroundColor: theme.other.colors.background,
                        },
                        label: {
                            fontSize: "12px",
                            fontWeight: 400,
                            color: theme.other.colors.black1,
                        },
                        remove: {
                            color: theme.other.colors.lightGray,
                            "&:hover": { color: theme.other.colors.black1 },
                        },
                        }}
                    >
                        {skill}
                    </Pill>
                ))}
            </Group>
        </Stack>
    );
};
