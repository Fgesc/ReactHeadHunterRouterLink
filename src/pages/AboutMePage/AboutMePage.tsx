import { Stack, Title, Text, useMantineTheme, Center } from "@mantine/core";

export const AboutMePage = () => {
    const theme = useMantineTheme();
    return (
        <Center>
            <Stack gap={12} maw={658} p={24} bg={theme.other.colors.white} bdrs={12} mt={24}>
                <Title order={2} fw={700} fz={26} data-testid="aboutMeTitle">
                    Артем Нейжмак
                </Title>

                <Text fw={400} fz={16} data-testid="aboutMeText">
                    Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.
                </Text>
            </Stack>
        </Center>
    );
}

